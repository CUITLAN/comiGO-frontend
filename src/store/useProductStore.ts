import { create } from 'zustand';
import { Vacancy } from '@/interfaces/vacancy'; 

// --- 1. DTO: Lo que realmente devuelve tu API (basado en Bruno) ---
interface ProductDto {
  id: string;
  name: string;
  description: string;
  type: string;     // Ej: "Platillo" o "Paquete"
  category: string;
  price: string;    // ⚠️ La API devuelve "250.00" (string)
  originalPrice: string | null;
  portionsAvailable: number;
  imageUrl: string | null;
  
  // Datos de la Sucursal
  branch: {
    id: string;
    name: string;
    address?: string;
  };

  // Fechas y Booleanos
  elaborationDate: string;
  deadlineDate: string;
  pickupStartTime: string;
  pickupEndTime: string;
  hasFinalOffer: boolean;
  status: string;   // Ej: "active"
  createdAt: string;
  updatedAt: string;
}

// --- 2. Estado del Store ---
interface ProductState {
  products: Vacancy[];
  isLoading: boolean;
  error: string | null;
  fetchProductsByBranch: (branchId: string, token: string) => Promise<void>;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'; 

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProductsByBranch: async (branchId: string, token: string) => {
    set({ isLoading: true, error: null });
    
    // Validaciones básicas
    if (!branchId || !token) {
      set({ 
        error: 'No se encontraron credenciales o ID de sucursal.', 
        isLoading: false 
      });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/products/branch/${branchId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            // 'Cache-Control': 'no-cache' // Descomenta si necesitas datos siempre frescos
        }
      });

      if (!response.ok) {
        throw new Error('Error al conectar con el servidor.');
      }
      
      const data: ProductDto[] = await response.json();
      
      // --- 3. MAPEO Y CORRECCIÓN DE TIPOS ---
      const mappedProducts: Vacancy[] = data.map(item => ({
        id: item.id,
        
        // Mapeo básico
        productName: item.name,           
        portions: item.portionsAvailable, 
        category: item.category || 'General',
        branch: item.branch.name,
        description: item.description || '',
        productImage: item.imageUrl || '', 
        createdAt: item.createdAt,

        // 🟢 SOLUCIÓN ERROR 1: FoodType
        // Forzamos a que TS acepte el string que viene del back como un tipo válido de UI
        foodType: item.type as Vacancy['foodType'],              
        
        // 🟢 SOLUCIÓN ERROR 2: State
        // Convertimos "active" -> "Activo" y forzamos el tipo
        state: (item.status === 'active' ? 'Activo' : 'Cerrado') as Vacancy['state'], 

        // 🟢 SOLUCIÓN: Precio de String a Number
        price: parseFloat(item.price), 
        
        // Fechas y otros
        pickupStartTime: item.pickupStartTime,
        pickupEndTime: item.pickupEndTime,
        deadlineDate: item.deadlineDate,
        elaborationDate: item.elaborationDate,
        finalOffer: item.hasFinalOffer || false, 
      }));
      
      set({ products: mappedProducts, isLoading: false });
      
    } catch (error) {
      console.error("Error en useProductStore:", error);
      set({ 
        error: 'No se pudieron cargar las publicaciones.', 
        isLoading: false,
        products: []
      });
    }
  },
}));