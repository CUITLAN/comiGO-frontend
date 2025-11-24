import { z } from 'zod';

export const clientRegisterSchema = z
  .object({
    fullName: z
      .string()
      .min(3, 'El nombre debe tener al menos 3 caracteres'),
    email: z
      .string()
      .min(1, 'El correo es requerido')
      .email('Ingresa un correo electrónico válido'),
    birthDate: z
      .string()
      .min(1, 'La fecha de nacimiento es requerida'),
    password: z
      .string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: z
      .string()
      .min(1, 'Confirma tu contraseña'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export type ClientRegisterFormType = z.infer<typeof clientRegisterSchema>;