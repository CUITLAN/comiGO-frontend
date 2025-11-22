import { z } from 'zod';

// ... constantes ...
const DEFAULT_ERROR_MESSAGE = 'Este es un campo requerido.';
const PHONE_NUMBER_REGEX = /^\d+$/;
const imageSchema = z.custom<File>((val) => typeof window !== 'undefined' && val instanceof File, "Debe ser un archivo válido");

export const employerSchema = z
  .object({
    // PASO 1: Restaurante
    restaurantName: z.string().min(1, DEFAULT_ERROR_MESSAGE),
    restaurantType: z.string().min(1, 'Selecciona el tipo.'),
    numBranches: z.coerce.number().min(1, 'Mínimo 1'),
    openingTime: z.string().min(1, 'Requerido'),
    closingTime: z.string().min(1, 'Requerido'),
    socialMedia: z.string().optional(),
    restaurantPhone: z.object({
      code: z.string().min(1, 'Requerido'),
      number: z.string().regex(PHONE_NUMBER_REGEX, 'Solo números').min(10, 'Mínimo 10 dígitos'),
    }),

    // PASO 2: Responsable (SIN TELÉFONO)
    employerName: z.string().min(1, DEFAULT_ERROR_MESSAGE),
    employerLastName: z.string().min(1, DEFAULT_ERROR_MESSAGE),
    positionWithinTheCompany: z.string().min(1, DEFAULT_ERROR_MESSAGE),
    employerEmail: z.string().email('Correo inválido.'),
    // --- ELIMINAMOS employerMobilePhone y employerLandlinePhone DE AQUÍ ---

    accountPassword: z.string().min(8, 'Mínimo 8 caracteres'),
    accountPasswordConfirm: z.string().min(1, 'Confirma la contraseña.'),

    // PASO 3, 4... (Igual que antes)
    restaurantDescription: z.string().min(10).max(500),
    restaurantImages: z.array(z.union([imageSchema, z.null()])).optional(),
    restaurantAddress: z.string().min(5, "La dirección es requerida."),
    restaurantLocation: z.object({
        lat: z.number(),
        lng: z.number(),
    }),
  })
  .refine((data) => data.accountPassword === data.accountPasswordConfirm, {
    message: 'Las contraseñas no coinciden.',
    path: ['accountPasswordConfirm'],
  });

export type EmployerFormType = z.infer<typeof employerSchema>;