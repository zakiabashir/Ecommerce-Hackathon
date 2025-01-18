

export default {
  name: 'products',
  title: 'Products',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'number'
    },
    {
      name: 'productName',
      title: 'Product Name',
      type: 'string'
    },
    {
      name: 'productDescription',
      title: 'Product Description',
      type: 'text'
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string'
    },
    {
      name: 'prevPrice',
      title: 'Previous Price',
      type: 'string'
    },
    {
      name: 'stock',
      title: 'Stock',
      type: 'number'
    },
    {
      name: 'productImage',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'tag',
      title: 'Tag',
      type: 'string',
      options: {
        list: [
          { title: 'Featured Products', value: 'Featured Products' },
          { title: 'Trending Products', value: 'Trending Products' },
          { title: 'Latest Products', value: 'Latest Products' },
          { title: 'Top Categories', value: 'Top Categories' }
        ]
      }
    },
    {
      name: 'shipmentArray',
      title: 'Shipment Array',
      type: 'array',
      of: [{ type: 'shipment' }],
    }
  ]
};
