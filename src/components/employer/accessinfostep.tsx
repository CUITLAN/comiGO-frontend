'use client';

import React, { useState } from 'react';
import { Control } from 'react-hook-form';
import { EmployerFormType } from '@/validations/employerSchema';
import FormInput from '@/components/forms/FormInput';
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

      <FormInput
        control={control}
        label="¿Cuál es el nombre del encargado del negocio? *"
        name="employerName"
        type="text"
        description="Esto ayudará a dar más confianza."
        maxChars={100}
      />
      
      <FormInput
        control={control}
        label="Apellido del encargado *"
        name="employerLastName"
        type="text"
        description="Tu apellido o apellidos."
        maxChars={100}
      />

      <FormInput
        control={control}
        label="Tu puesto dentro de la empresa *"
        name="positionWithinTheCompany"
        type="text"
        description="Ej. Dueño, Gerente, Administrador."
        maxChars={100}
      />

      <FormInput
        control={control}
        label="Correo electrónico *"
        name="employerEmail"
        type="email"
        description="Usa un correo al que tengas acceso."
        maxChars={100}
      />

      {/* --- AQUÍ BORRAMOS EL COMPONENTE FormPhone --- */}

      <FormInput
        control={control}
        label="Contraseña *"
        name="accountPassword"
        type={showPassword ? 'text' : 'password'}
        description="Crea una contraseña segura."
        
        
      />

      <FormInput
        control={control}
        label="Confirma tu contraseña *"
        name="accountPasswordConfirm"
        type={showConfirmPassword ? 'text' : 'password'}
        description="Repítela para asegurar tu acceso."
        
      />
    </div>
  );
}