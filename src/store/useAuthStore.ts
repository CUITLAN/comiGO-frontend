import { create } from 'zustand';

// Interfaz para los datos del usuario que recibimos del API
interface UserData {
  id: string;
  email: string;
  fullName: string;
  role: string;
  authProvider: string;
}

// Interfaz del estado de autenticación (datos + acciones)
interface AuthState {
  accessToken: string | null;
  user: UserData | null;
  isAuthenticated: boolean;
  
  // Acciones
  login: (token: string, userData: UserData) => void;
  logout: () => void;
}

// Nombre de la clave para almacenamiento persistente (opcional)
const STORAGE_KEY = 'auth-storage';

// FIX: Inicializamos el estado y las acciones directamente en create
export const useAuthStore = create<AuthState>((set) => ({
  // --- PROPIEDADES DE ESTADO INICIAL ---
  accessToken: null,
  user: null,
  isAuthenticated: false,

  // --- MÉTODOS / ACCIONES ---
  // Método para iniciar sesión (guarda el token y los datos)
  login: (token, userData) => {
    set({
      accessToken: token,
      user: userData,
      isAuthenticated: true,
    });
    
    // NOTA: Aquí agregarías la lógica para guardar en localStorage/sessionStorage si fuera necesario.
  },

  // Método para cerrar sesión
  logout: () => {
    set({
      accessToken: null,
      user: null,
      isAuthenticated: false,
    });
    // NOTA: Aquí limpiarías localStorage/sessionStorage.
  },
}));