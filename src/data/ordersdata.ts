export interface Order {
  id: string;
  clientName: string;
  type: 'Platillo' | 'Packete';
  deliveryDate: string;
  productName: string;
  branch: string;
}

export const DataOrders: Order[] = [
  {
    id: '1',
    clientName: 'Hamburguesa', // En tu imagen el cliente parece ser el producto, ajusta según tu lógica real
    type: 'Platillo',
    deliveryDate: '2024-11-20',
    productName: 'Carnes y frias',
    branch: 'Sucursal Centro'
  },
  {
    id: '2',
    clientName: 'Papas a la francesa',
    type: 'Platillo',
    deliveryDate: '2024-11-20',
    productName: 'Aceite',
    branch: 'Sucursal Norte'
  },
  // Agrega más datos si deseas
];