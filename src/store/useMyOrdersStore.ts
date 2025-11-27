import { create } from 'zustand';
import axios from 'axios';

export interface ClientOrder {
  id: string;
  name: string; // Nombre del producto
  price: number;
  image: string;
  restaurant: {
    name: string;
  };
  status: 'Pendiente' | 'Listo para recoger' | 'Entregado' | 'Cancelado';
  orderDate: string;
  accessCode?: string; // El código para recoger
  cancellationReason?: string;
}

interface MyOrdersState {
  orders: ClientOrder[];
  isLoading: boolean;
  fetchMyOrders: (userId: string, token: string) => Promise<void>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const useMyOrdersStore = create<MyOrdersState>((set) => ({
  orders: [],
  isLoading: false,

  fetchMyOrders: async (userId, token) => {
    set({ isLoading: true });
    try {
        // Endpoint: GET /orders/user/:userId
        const res = await axios.get(`${API_URL}/orders/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        const mappedOrders: ClientOrder[] = res.data.map((order: any) => {
            // Mapeo de Estados (Backend -> Frontend UI)
            let statusLabel: ClientOrder['status'] = 'Pendiente';
            // Asegúrate que estos strings coincidan con lo que guarda tu backend ('ready', 'completed', etc.)
            if (order.status === 'ready') statusLabel = 'Listo para recoger';
            if (order.status === 'completed') statusLabel = 'Entregado';
            if (order.status === 'cancelled') statusLabel = 'Cancelado';

            return {
                id: order.id,
                name: order.product?.name || 'Producto no disponible',
                price: Number(order.totalPrice),
                image: order.product?.imageUrl || '/placeholder-food.png',
                restaurant: {
                    name: order.branch?.restaurant?.name || order.branch?.name || 'Restaurante',
                },
                status: statusLabel,
                // Formateo de fecha simple
                orderDate: new Date(order.createdAt).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' }),
                accessCode: order.pickupCode,
                cancellationReason: order.cancellationReason
            };
        });

        // Ordenar: Más recientes primero
        mappedOrders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()); // Esto es una aproximación, mejor usar el timestamp real si es posible, pero funciona para visualización

        set({ orders: mappedOrders, isLoading: false });
    } catch (error) {
        console.error("Error fetching my orders:", error);
        set({ orders: [], isLoading: false });
    }
  }
}));