export interface Sale {
  id: string;
  productName: string;
  saleDate: string; // Formato ISO 'YYYY-MM-DD'
  quantity: number;
  unit: 'Packete' | 'Platillo' | string;
  rating: number; // De 1 a 5
  price: number;
  branch: string;
  // Datos adicionales para el detalle del pedido (Drawer)
  customerName: string;
  customerEmail?: string; // Opcional
  paymentMethod?: string; // Opcional
}