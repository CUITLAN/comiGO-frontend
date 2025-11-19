import { z } from 'zod';

// Constantes de validación
const DEFAULT_ERROR_MESSAGE = 'Este es un campo requerido.';
const PHONE_NUMBER_REGEX = /^\d+$/;

// Schema para validar archivos (imágenes) solo en el lado del cliente
const imageSchema = z.custom<File>((val) => {
  return typeof window !== 'undefined' && val instanceof File;
}, "Debe ser un archivo de imagen válido");

export const employerSchema = z
  .object({
    // =======================================
    // PASO 1: DETALLES DEL RESTAURANTE
    // =======================================
    restaurantName: z.string().min(1, DEFAULT_ERROR_MESSAGE),
    
    restaurantType: z.string().min(1, 'Selecciona el tipo de restaurante.'),
    
    numBranches: z.coerce.number({ invalid_type_error: 'Debe ser un número.' })
      .int()
      .min(1, 'Debe haber al menos 1 sucursal.'),
      
    openingTime: z.string().min(1, 'Hora de apertura requerida'),
    closingTime: z.string().min(1, 'Hora de cierre requerida'),
    
    socialMedia: z.string().optional(),

    restaurantPhone: z.object({
      code: z.string().min(1, 'Requerido'),
      number: z.string().regex(PHONE_NUMBER_REGEX, 'Solo números').min(10, 'Mínimo 10 dígitos'),
    }),

    // =======================================
    // PASO 2: INFORMACIÓN DE ACCESO (RESPONSABLE)
    // =======================================
    employerName: z.string().min(1, DEFAULT_ERROR_MESSAGE),
    employerLastName: z.string().min(1, DEFAULT_ERROR_MESSAGE),
    positionWithinTheCompany: z.string().min(1, DEFAULT_ERROR_MESSAGE),
    
    employerEmail: z.string().email('Correo electrónico inválido.'),

    employerMobilePhone: z.object({
      code: z.string().min(1, 'Requerido'),
      number: z.string().regex(PHONE_NUMBER_REGEX, 'Solo números').min(10, 'Mínimo 10 dígitos'),
    }),

    // Teléfono fijo opcional
    employerLandlinePhone: z.object({
      code: z.string().optional(),
      number: z.string().optional(),
    }).optional(), 

    accountPassword: z
      .string()
      .min(8, 'Mínimo 8 caracteres.')
      .regex(/[A-Z]/, "Requiere una mayúscula")
      .regex(/[a-z]/, "Requiere una minúscula")
      .regex(/[0-9]/, "Requiere un número"),
      
    accountPasswordConfirm: z.string().min(1, 'Confirma la contraseña.'),

    // =======================================
    // PASO 3: DESCRIPCIÓN E IMÁGENES
    // =======================================
    restaurantDescription: z.string()
      .min(10, 'La descripción es muy corta (mínimo 10 caracteres).')
      .max(500, 'La descripción es muy larga (máximo 500 caracteres).'),
    
    // Array de 3 posiciones que permite File o null
    restaurantImages: z.array(z.union([imageSchema, z.null()])).optional(),

    // =======================================
    // PASO 4: UBICACIÓN (MAPA)
    // =======================================
    restaurantAddress: z.string().min(5, "La dirección es requerida."),
    
    // Objeto para latitud y longitud
    restaurantLocation: z.object({
        lat: z.number({ required_error: "Mueve el pin en el mapa." }),
        lng: z.number({ required_error: "Mueve el pin en el mapa." }),
    }),
  })
  .refine((data) => data.accountPassword === data.accountPasswordConfirm, {
    message: 'Las contraseñas no coinciden.',
    path: ['accountPasswordConfirm'],
  });

// Exportamos el tipo inferido
export type EmployerFormType = z.infer<typeof employerSchema>;