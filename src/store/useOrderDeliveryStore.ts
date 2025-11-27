import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'sonner';

// Interfaz adaptada a la tabla deliveryColumns
export interface DeliveryOrder {
  id: string;
  clientName: string;
  type: string;     // 'Platillo' | 'Paquete'
  deliveryDate: string;
  productName: string;
  status: string;   // 'pending' | 'ready'
  pickupCode: string; // (Opcional: para debug, aunque idealmente el front no debería verlo hasta validar)
}

interface OrderDeliveryState {
  orders: DeliveryOrder[];
  isLoading: boolean;
  
  // Acciones
  fetchPendingOrders: (branchId: string, token: string) => Promise<void>;
  markReady: (orderId: string, token: string) => Promise<void>;
  deliverOrder: (orderId: string, code: string, token: string) => Promise<boolean>;
  cancelOrder: (orderId: string, reason: string, token: string) => Promise<boolean>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const useOrderDeliveryStore = create<OrderDeliveryState>((set, get) => ({
  orders: [],
  isLoading: false,

  fetchPendingOrders: async (branchId, token) => {
    set({ isLoading: true });
    try {
      const res = await axios.get(`${API_URL}/orders/branch/${branchId}/pending`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const mappedOrders: DeliveryOrder[] = res.data.map((o: any) => ({
        id: o.id,
        clientName: o.user?.fullName || 'Cliente Anónimo',
        type: o.product?.type || 'General',
        deliveryDate: o.createdAt, // O pickupDate si lo tienes
        productName: o.product?.name || 'Producto desconocido',
        status: o.status,
        pickupCode: o.pickupCode
      }));

      set({ orders: mappedOrders, isLoading: false });
    } catch (error) {
      console.error(error);
      set({ orders: [], isLoading: false });
    }
  },

  markReady: async (orderId, token) => {
    try {
      await axios.patch(`${API_URL}/orders/${orderId}/ready`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Actualizamos estado local
      set(state => ({
        orders: state.orders.map(o => o.id === orderId ? { ...o, status: 'ready' } : o)
      }));
      toast.success('Pedido marcado como listo');
    } catch (error) {
      toast.error('Error al actualizar estado');
    }
  },

  deliverOrder: async (orderId, code, token) => {
    try {
      await axios.patch(`${API_URL}/orders/${orderId}/deliver`, { pickupCode: code }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Eliminamos de la lista porque ya se completó
      set(state => ({
        orders: state.orders.filter(o => o.id !== orderId)
      }));
      toast.success('Pedido entregado y completado');
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Código incorrecto o error de servidor');
      return false;
    }
  },

  cancelOrder: async (orderId, reason, token) => {
    try {
      await axios.patch(`${API_URL}/orders/${orderId}/cancel`, { reason }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Eliminamos de la lista
      set(state => ({
        orders: state.orders.filter(o => o.id !== orderId)
      }));
      toast.success('Pedido cancelado correctamente');
      return true;
    } catch (error: any) {
        // Validamos si es por longitud
        const msg = error.response?.data?.message;
        if (Array.isArray(msg)) {
            toast.error(msg[0]); // Mensaje del class-validator
        } else {
            toast.error(msg || 'Error al cancelar');
        }
      return false;
    }
  }
}));