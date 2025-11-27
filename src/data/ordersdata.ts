import { FoodItem, dummyFoodData } from "@/data/foodData";

// ==========================================
// 1. SECCIÓN RESTAURANTE (Admin Dashboard)
// ==========================================
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
    clientName: 'Juan Pérez', 
    type: 'Platillo',
    deliveryDate: '2024-11-20',
    productName: 'Hamburguesa Clásica',
    branch: 'Sucursal Centro'
  },
  {
    id: '2',
    clientName: 'Ana López',
    type: 'Platillo',
    deliveryDate: '2024-11-20',
    productName: 'Papas a la francesa',
    branch: 'Sucursal Norte'
  },
  {
    id: '3',
    clientName: 'Carlos Ruiz',
    type: 'Packete',
    deliveryDate: '2024-11-21',
    productName: 'Paquete Desayuno',
    branch: 'Sucursal Centro'
  }
];

// ==========================================
// 2. SECCIÓN CLIENTE (App Móvil)
// ==========================================

export interface OrderItem extends FoodItem {
  orderId: string;
  status: 'Pendiente' | 'Listo para recoger' | 'Entregado' | 'Cancelado';
  accessCode: string; 
  orderDate: string;
  cancellationReason?: string; // Razón si fue cancelado
}

export const myOrdersData: OrderItem[] = [
  {
    // CASO 1: LISTO PARA RECOGER (Debe mostrar código 84921)
    ...(dummyFoodData.find(item => item.id === '1') as FoodItem), 
    orderId: 'ORD-001',
    status: 'Listo para recoger',
    accessCode: '84921',
    orderDate: 'Hoy, 10:30 AM'
  },
  {
    // CASO 2: PENDIENTE (Mensaje de espera)
    ...(dummyFoodData.find(item => item.id === '4') as FoodItem), 
    orderId: 'ORD-002',
    status: 'Pendiente',
    accessCode: '33102', 
    orderDate: 'Hoy, 11:00 AM'
  },
  {
    // CASO 3: ENTREGADO (Permite Calificar)
    ...(dummyFoodData.find(item => item.id === '2') as FoodItem), 
    orderId: 'ORD-003',
    status: 'Entregado',
    accessCode: '11223', 
    orderDate: 'Ayer, 09:00 AM'
  },
  {
    // CASO 4: CANCELADO (Muestra Motivo)
    ...(dummyFoodData.find(item => item.id === '3') as FoodItem), 
    orderId: 'ORD-004',
    status: 'Cancelado',
    accessCode: '-',
    orderDate: 'Ayer, 08:00 PM',
    cancellationReason: 'Lo sentimos, nos quedamos sin ingredientes principales para completar tu orden.'
  }
];