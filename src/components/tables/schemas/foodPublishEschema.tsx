import { z } from 'zod';

// Configuración de validación de archivos (opcional, para referencia)
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const foodPublishSchema = z.object({
  foodType: z.enum(["Packete", "Platillo"]),
  productName: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  category: z.string().min(1, "Selecciona una categoría"),
  branchId: z.string().min(1, "Selecciona una sucursal"),
  portions: z.coerce.number().min(1, "Debe haber al menos 1 porción"),
  description: z.string().min(10, "La descripción es muy corta"),
  price: z.coerce.number().min(0, "El precio no puede ser negativo"),
  
  // Fechas
  elaborationDate: z.string().min(1, "Fecha requerida"),
  deadlineDate: z.string().min(1, "Fecha límite requerida"),
  
  // Horarios
  pickupTimeType: z.string().optional(), // Lo dejamos opcional ya que lo quitamos visualmente
  pickupStartTime: z.string().min(1, "Hora de inicio requerida"),
  pickupEndTime: z.string().min(1, "Hora de fin requerida"),
  
  finalOffer: z.boolean().default(false),

  // --- CORRECCIÓN PRINCIPAL AQUÍ ---
  // Permitimos: File (nueva subida), String (url existente), null o undefined
  productImage: z.union([
    z.custom<File>((v) => v instanceof File, { message: "Debe ser un archivo válido" }),
    z.string(), 
  ]).nullable().optional(),
});

// Exportamos el tipo inferido para usarlo en el formulario
export type FoodPublishFormType = z.infer<typeof foodPublishSchema>;