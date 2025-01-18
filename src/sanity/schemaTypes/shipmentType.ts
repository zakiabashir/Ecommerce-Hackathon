export default {
    name: 'shipment',
    title: 'Shipment',
    type: 'object',
    fields: [
      {
        name: 'trackingId',
        title: 'Tracking ID',
        type: 'string',
      },
      {
        name: 'deliveryStatus',
        title: 'Delivery Status',
        type: 'string',
      },
      {
        name: 'estimatedDeliveryDate',
        title: 'Estimated Delivery Date',
        type: 'string',
      },
    ],
  };
  