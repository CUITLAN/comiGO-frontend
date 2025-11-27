import { create } from 'zustand';

// Interfaz para la UI
export interface Sale {
  id: string;
  productName: string;
  date: string;
  price: number;
  status: string;
  paymentMethod?: string;
  customerName?: string;
}

// DTO del Backend
interface OrderDto {
  id: string;
  totalPrice: string | number; 
  status: string; 
  createdAt: string;
  product?: { name: string };
  user?: { fullName: string }; 
  paymentMethod?: string;
}

interface SalesState {
  sales: Sale[];
  isLoading: boolean;
  error: string | null;
  fetchSalesByBranch: (branchId: string, token: string) => Promise<void>;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const useSalesStore = create<SalesState>((set) => ({
  sales: [],
  isLoading: false,
  error: null,

  fetchSalesByBranch: async (branchId: string, token: string) => {
    set({ isLoading: true, error: null });
    
    if (!branchId || !token) {
        set({ isLoading: false, error: 'Faltan datos de sesión' });
        return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/orders/branch/${branchId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Error al cargar ventas');

      const data: OrderDto[] = await response.json();

      const mappedSales: Sale[] = data.map(order => ({
        id: order.id,
        // Usamos Optional Chaining por si el producto fue borrado
        productName: order.product?.name || 'Producto Eliminado', 
        date: order.createdAt,
        
        // Convertimos el precio a número
        price: Number(order.totalPrice), 
        
        // 👇 MAPEO DE ESTADOS MEJORADO
        status: order.status === 'completed' ? 'Completado' 
              : order.status === 'pending' ? 'Pendiente'
              : order.status === 'cancelled' ? 'Cancelado'
              : (order.status || 'Desconocido'),
              
        customerName: order.user?.fullName || 'Cliente Anónimo',
        paymentMethod: order.paymentMethod || 'Efectivo'
      }));

      set({ sales: mappedSales, isLoading: false });

    } catch (error) {
      console.error(error);
      set({ sales: [], isLoading: false, error: 'No se pudieron cargar las ventas' });
    }
  },
}));