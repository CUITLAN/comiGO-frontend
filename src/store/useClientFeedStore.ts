import { create } from 'zustand';
import axios from 'axios';

// Interfaz adaptada a lo que devuelve tu API (basado en lo que vimos antes)
export interface ClientProduct {
  id: string;
  name: string;
  description: string;
  price: number; // Numérico
  image: string; // URL mapeada
  category: string;
  restaurant: {
    id: string;
    name: string;
    logo?: string;
  };
  branchId: string; // ID de la sucursal para la orden
  cookedDate: string; // formatted date
  rating: number; // Hardcodeado o calculado
}

interface FeedState {
  products: ClientProduct[];
  isLoading: boolean;
  fetchAllProducts: () => Promise<void>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const useClientFeedStore = create<FeedState>((set) => ({
  products: [],
  isLoading: false,

  fetchAllProducts: async () => {
    set({ isLoading: true });
    try {
      // Asumimos que GET /products devuelve todo. 
      // Idealmente deberías tener un endpoint público o filtrado por "activos".
      const res = await axios.get(`${API_URL}/products`);
      
      const mappedProducts: ClientProduct[] = res.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: Number(item.price),
        image: item.imageUrl || '/placeholder-food.png', // Fallback image
        category: item.category || 'General',
        restaurant: {
            id: item.branch?.restaurant?.id || 'unknown',
            name: item.branch?.restaurant?.name || item.branch?.name || 'Restaurante Local',
            logo: item.branch?.restaurant?.logoUrl
        },
        branchId: item.branch?.id,
        cookedDate: item.elaborationDate ? new Date(item.elaborationDate).toLocaleDateString() : 'Hoy',
        rating: 4.5 // Mock por ahora ya que la API no devuelve rating aún
      }));

      set({ products: mappedProducts, isLoading: false });
    } catch (error) {
      console.error("Error cargando feed:", error);
      set({ products: [] }); // En caso de error, lista vacía
    } finally {
        set({ isLoading: false });
    }
  },
}));