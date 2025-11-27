import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'El correo electrónico es requerido' })
    .email({ message: 'Debe ser un correo electrónico válido' })
    .max(244, { message: 'El correo no puede exceder los 244 caracteres' })
    .refine((email) => email.trim() === email, {
      message: 'El correo no debe contener espacios al inicio o final',
    }),

  // FIX CRÍTICO: La propiedad 'password' se cambia a 'passsword' para que coincida 
  // con el error de tipeo en el backend y el login funcione.
  passsword: z
    .string()
    .min(1, { message: 'Ingrese la contraseña' })
    .max(50, { message: 'La contraseña no puede exceder los 50 caracteres' }),
});

// Nota: El tipo 'LoginFormType' aún usará 'passsword' hasta que el backend se corrija.
export type LoginFormType = z.infer<typeof loginSchema>;