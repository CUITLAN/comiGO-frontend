import { z } from 'zod';

export const profileSchema = z.object({
  fullName: z.string().min(3, "El nombre es muy corto"),
  email: z.string().email("Correo inválido"),
  
  // Validación estricta: Mínimo 10, Máximo 10 y solo números.
  phone: z.string()
    .min(10, "El teléfono debe tener 10 dígitos")
    .max(10, "El teléfono no puede tener más de 10 dígitos")
    .regex(/^\d+$/, "Solo se permiten números")
    .optional()
    .or(z.literal('')),
    
  password: z.string().min(6, "Mínimo 6 caracteres").optional().or(z.literal('')),
  confirmPassword: z.string().optional().or(z.literal('')),
}).refine((data) => {
  if (data.password && data.password !== data.confirmPassword) {
    return false;
  }
  return true;
}, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export type ProfileFormType = z.infer<typeof profileSchema>;