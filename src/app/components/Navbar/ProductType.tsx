// Centralized ProductType definition
export interface ProductType {
    _id: string;
    productName: string;
    productDescription?: string;
    price?: any;
    prevPrice?: string;
    stock?: number;
    productImage: any;
    tag?: string;
    shipmentArray?: {
      trackingId: string;
      deliveryStatus: string;
      estimatedDeliveryDate: string;
      id: string;
    }[];
  }
  