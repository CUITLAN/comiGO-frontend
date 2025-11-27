import { z } from 'zod';

// Configuración opcional de validación de archivos
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
  pickupTimeType: z.string().optional(),
  pickupStartTime: z.string().min(1, "Hora de inicio requerida"),
  pickupEndTime: z.string().min(1, "Hora de fin requerida"),

  finalOffer: z.boolean().default(false),

  // ---------------------------
  // 
  // ---------------------------
  productImage: z
    .union([
      z.custom<File>(
        (v) => v instanceof File && v.size <= MAX_FILE_SIZE && ACCEPTED_IMAGE_TYPES.includes(v.type),
        {
          message: "Debe ser una imagen válida (jpg, png, webp) y menor a 5MB",
        }
      ),
      z.string().url("URL inválida de imagen"),
    ])
    .nullable()
    .optional(),
});

// Exportamos el tipo inferido para usarlo en el formulario
export type FoodPublishFormType = z.infer<typeof foodPublishSchema>;
