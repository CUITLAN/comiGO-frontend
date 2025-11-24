import { ProductCategory } from "./ProductCategory";

// Conservamos los estados de aprobación del admin + Agotada para lógica de venta
export type VacancyState = 'Activo' | 'EnRevisión' | 'Cerrado' | 'Rechazado' | 'Agotada';

export interface Vacancy {
  // Identificadores
  id: number | string;
  accountId?: string;
  companyId?: string; // Podría ser el ID del restaurante
  linkerId?: string;

  // Campos de Sistema y Aprobación (CONSERVADOS)
  state: VacancyState;
  createdAt: string;    // Fecha de creación
  requestedAt?: string; // Fecha de solicitud de revisión
  applications?: number; // Ventas/Reservas realizadas
  LogoUrl?: string | URL; // Logo del restaurante para la tabla

  // --- CAMPOS DE COMIDA (Del Formulario) ---
  productName: string;            // name
  foodType: 'Packete' | 'Platillo'; // Reemplaza a workShift/modality visualmente
  category: ProductCategory | string;
  branch: string;                 // location
  portions: number;               // numberOpening
  description: string;
  price: number;
  
  // Fechas y Horarios
  elaborationDate: string;        // ISO Date
  pickupStartTime: string;        // HH:mm
  pickupEndTime: string;          // HH:mm
  deadlineDate: string;           // ISO Date
  finalOffer: boolean;

  // Imagen
  productImage?: string | null;
}