import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';

// Definimos el producto tal como lo necesita el carrito
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  restaurantName: string;
  quantity: number;
  branchId: string; // Importante para saber de dónde es
}

interface CartState {
  items: CartItem[];
  
  // Acciones
  addItem: (product: Omit<CartItem, 'quantity'>) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  
  // Getters computados
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === product.id);

        if (existingItem) {
          // Si ya existe, aumentamos cantidad
          set({
            items: currentItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
          toast.success("Cantidad actualizada en el carrito");
        } else {
          // Si es nuevo, lo agregamos
          set({ items: [...currentItems, { ...product, quantity: 1 }] });
          toast.success("Producto agregado al carrito");
        }
      },

      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
        toast.info("Producto eliminado");
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
    }),
    {
      name: 'comigo-cart-storage', // Nombre en localStorage
    }
  )
);