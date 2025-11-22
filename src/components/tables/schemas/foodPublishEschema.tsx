import { z } from 'zod';

// Validador de imágenes
const imageSchema = z.custom<File>((val) => typeof window !== 'undefined' && val instanceof File, "Debe ser un archivo válido");

export const foodPublishSchema = z.object({
  // --- INFORMACIÓN GENERAL ---
  foodType: z.enum(['Packete', 'Platillo'], { required_error: "Selecciona si es paquete o platillo" }),
  
  productName: z.string().min(3, "El nombre es muy corto").max(100),
  
  category: z.string().min(1, "Selecciona una categoría"),
  
  branchId: z.string().min(1, "Selecciona una sucursal"), // Asumo que el usuario selecciona una sucursal registrada
  
  portions: z.coerce.number().min(1, "Mínimo 1 porción"),
  
  description: z.string().optional(),
  
  price: z.coerce.number().min(0, "El precio no puede ser negativo"),
  
  elaborationDate: z.string().min(1, "Fecha requerida"), // O date() si usas DatePicker real

  // --- HORARIO Y FECHA LÍMITE ---
  pickupTimeType: z.string().min(1, "Selecciona tipo de horario"), // Ej: "Mañana", "Tarde"
  
  deadlineDate: z.string().min(1, "Fecha límite requerida"),
  
  pickupStartTime: z.string().min(1, "Hora inicio requerida"),
  pickupEndTime: z.string().min(1, "Hora fin requerida"),
  
  finalOffer: z.boolean().optional(), // Checkbox de "Oferta final"

  // --- IMAGEN ---
  productImage: z.union([imageSchema, z.null()]).optional(),
});

export type FoodPublishFormType = z.infer<typeof foodPublishSchema>;