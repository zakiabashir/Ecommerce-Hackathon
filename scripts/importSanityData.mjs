import axios from 'axios';
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Create Sanity client
const client = createClient({
  projectId: "ibcc1aeo", 
  dataset: "production", 
  token: "skXWzBLLtyktwYi5rSJ9cJhLaNQ5oo5o4mgjbmqC58A78zwGHrYrul1SzucNGvNwF8L8boNJDkglA8uG3HW2BKkiuRoKGJtPjNUvQNQ7frgqggCG0hX29l13WfdJzvAw8d8KV5tSYE1buJ0qaGsVNVAbsNOPVJkI008myKDKOQ6IcbsWsRw9"
  ,
  apiVersion: '2025-01-15',
  useCdn: false,
});

async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`Uploading image: ${imageUrl}`);
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data);
    const asset = await client.assets.upload('image', buffer, {
      filename: imageUrl.split('/').pop(),
    });
    console.log(`Image uploaded successfully: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error('Failed to upload image:', imageUrl, error);
    return null;
  }
}

async function importData() {
  try {
    console.log('Fetching products from API...');
    const response = await axios.get('https://mocki.io/v1/8df2c13f-3c35-4825-a95e-d67c46b66b8d'); // i made this request to mocki.io to get the data in json format for hackathon 
    const products = response.data;
    console.log(`Fetched ${products.length} products`);

    for (const product of products) {
      console.log(`Processing product: ${product.productName}`);
      let imageRef = null;
      if (product.productImage) {
        imageRef = await uploadImageToSanity(product.productImage);
      }

      const sanityProduct = {
        _type: 'products',
        id: product.id,
        productName: product.productName,
        productDescription: product.productDescription,
        price: product.price,
        prevPrice: product.prevPrice,
        stock: product.stock,
        productImage: imageRef ? {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageRef,
          },
        } : undefined,
        tag: product.tag,
        shipmentArray: product.shipmentArray.map(shipment => ({
          _type: 'shipment',
          trackingId: shipment.trackingId,
          deliveryStatus: shipment.deliveryStatus,
          estimatedDeliveryDate: shipment.estimatedDeliveryDate,
        })),
      };

      console.log('Uploading product to Sanity:', sanityProduct.productName);
      const result = await client.create(sanityProduct);
      console.log(`Product uploaded successfully: ${result._id}`);
    }

    console.log('Data import completed successfully!');
  } catch (error) {
    console.error('Error importing data:', error);
  }
}

importData();
