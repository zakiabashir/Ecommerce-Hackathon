interface ImageField {
    name: string;
    title: string;
    type: string;
    options?: { hotspot: boolean };
}

interface OtherColorImageField {
    name: string;
    title: string;
    type: string;
    fields: {
        name: string;
        title: string;
        type: string;
        options?: { hotspot: boolean };
    }[];
}

interface ImagesField {
    name: string;
    title: string;
    type: string;
    fields: (ImageField | OtherColorImageField)[];
}

interface Field {
    name: string;
    title: string;
    type: string;
    validation?: (Rule: any) => any;
    options?: {
        hotspot?: boolean;
        list?: { title: string; value: string }[];
        source?: string;
        maxLength?: number;
    };
    fields?: Field[];
    of?: { type: string; fields?: Field[] }[];
}

interface ProductSchema {
    name: string;
    title: string;
    type: string;
    fields: Field[];
}

const productSchema: ProductSchema = {
    name: 'latestProduct',
    title: 'Latest Product',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required(),
        },
        {
            name: 'miniTitle',
            title: 'Mini Title',
            type: 'string',
        },
        {
            name: 'code',
            title: 'Product Code',
            type: 'string',
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: Rule => Rule.required(),
        },
        {
            name: 'discountedPrice',
            title: 'Discounted Price',
            type: 'number',
        },
        {
            name: 'images',
            title: 'Images',
            type: 'object',
            fields: [
                {
                    name: 'default',
                    title: 'Default Image',
                    type: 'image',
                    options: { hotspot: true },
                },
                {
                    name: 'otherColors',
                    title: 'Other Color Images',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                {
                                    name: 'color',
                                    title: 'Color',
                                    type: 'string',
                      },
                                {
                                    name: 'image',
                                    title: 'Image',
                                    type: 'image',
                                    options: { hotspot: true },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: 'colors',
            title: 'Available Colors',
            type: 'array',
            of: [{ type: 'string' }],
        },
        {
            name: 'filter',
            title: 'Filter Category',
            type: 'string',
            options: {
              list: [
                { title: 'New Arrival', value: 'New Arrival' },
                { title: 'Best Seller', value: 'Best Seller' },
                { title: 'Featured', value: 'Featured' },
                { title: 'Special Offer', value: 'Special Offer' },
              ],
            },
          }
,          
{
    name: "slug",
    title: "Slug",
    type: "slug",
    options: {
      source: "title",
      maxLength: 200,
    },
  }
,  
        {
            name: 'inventory',
            title: 'Inventory',
            type: 'number',
            validation: Rule => Rule.min(0),
        },
    ],
};

export default productSchema;
  