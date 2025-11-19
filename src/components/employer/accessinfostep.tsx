'use client';

import React, { useState } from 'react';
import { Control } from 'react-hook-form';
import { EmployerFormType } from '@/validations/employerSchema';
import FormInput from '@/components/forms/FormInput';
import FormPhone from '@/components/forms/FormPhone'; // Necesitamos importar esto
import { Eye, EyeOff } from 'lucide-react'; 

interface AccessInfoStepProps {
  control: Control<EmployerFormType>;
}

export default function AccessInfoStep({ control }: AccessInfoStepProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 text-center">
        <h3 className="text-xl font-bold text-gray-800">Información de Acceso</h3>
        <p className="text-sm text-gray-500 mt-1">
          Completa tus datos para crear tu cuenta.
        </p>
      </div>

      {/* 1. Nombre */}
      <FormInput
        control={control}
        label="¿Cuál es el nombre del encargado del negocio? *"
        name="employerName"
        type="text"
        description="Esto ayudará a dar más confianza."
        maxChars={100}
      />
      
      {/* 2. Apellido */}
      <FormInput
        control={control}
        label="Apellido del encargado *"
        name="employerLastName"
        type="text"
        description="Tu apellido o apellidos."
        maxChars={100}
      />

      {/* 3. Puesto */}
      <FormInput
        control={control}
        label="Tu puesto dentro de la empresa *"
        name="positionWithinTheCompany"
        type="text"
        description="Ej. Dueño, Gerente, Administrador."
        maxChars={100}
      />

      {/* 4. Email */}
      <FormInput
        control={control}
        label="Correo electrónico *"
        name="employerEmail"
        type="email"
        description="Usa un correo al que tengas acceso."
        maxChars={100}
      />

      {/* --- AQUÍ FALTABA EL TELÉFONO --- */}
      {/* Sin esto, la validación falla porque es un campo requerido en el Schema */}
      

      {/* 5. Contraseña */}
      <FormInput
        control={control}
        label="Contraseña *"
        name="accountPassword"
        type="password"
        description="Crea una contraseña segura (Min 8 caracteres, mayúscula, número)."
        
      />

      {/* 6. Confirmar Contraseña */}
      <FormInput
        control={control}
        label="Confirma tu contraseña *"
        name="accountPasswordConfirm"
        type="password"
        description="Repítela para asegurar tu acceso."
        
      />
    </div>
  );
}