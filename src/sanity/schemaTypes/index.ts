import { type SchemaTypeDefinition } from 'sanity'
import products from './products'
import shipment from './shipmentType';
// import featuredProduct from './allProducts'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [products , shipment],
}