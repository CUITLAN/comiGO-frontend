'use client';

import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { EmployerFormType } from '@/validations/employerSchema';
import FormInput from '@/components/forms/FormInput';
import FormPhone from '@/components/forms/FormPhone';
import { Clock } from 'lucide-react'; 

// Opciones predefinidas para el Dropdown
const restaurantTypes = [
  { value: '', label: 'Selecciona una opción' },
  { value: 'fast-food', label: 'Comida Rápida' },
  { value: 'mexican', label: 'Antojitos Mexicanos / Taquería' },
  { value: 'gourmet', label: 'Restaurante Gourmet' },
  { value: 'cafe', label: 'Cafetería / Panadería' },
  { value: 'dark-kitchen', label: 'Dark Kitchen (Solo envíos)' },
  { value: 'buffet', label: 'Buffet' },
  { value: 'vegan', label: 'Vegetariano / Vegano' },
];

interface RestaurantDetailsStepProps {
  control: Control<EmployerFormType>;
  errors: any; 
}

export default function RestaurantDetailsStep({ control, errors }: RestaurantDetailsStepProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. Nombre del Negocio */}
      <FormInput
        control={control}
        label="Nombre de tu negocio"
        name="restaurantName"
        type="text"
        description="Ingresa el nombre comercial visible para los clientes."
        maxChars={100}
      />

      {/* 2. Tipo de Restaurante */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
            Tipo de restaurante <span className="text-red-500">*</span>
        </label>
        <div className="relative">
            <Controller
                control={control}
                name="restaurantType"
                render={({ field }) => (
                    <select
                        {...field}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#4A7729] focus:ring-2 focus:ring-[#4A7729]/20 transition-all h-10 appearance-none"
                    >
                        {restaurantTypes.map((type) => (
                            <option key={type.value} value={type.value} disabled={type.value === ''}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                )}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                ▼
            </div>
        </div>
        {errors.restaurantType && (
            <span className="text-xs text-red-500">{errors.restaurantType.message}</span>
        )}
      </div>

      {/* 3. Número de Sucursales */}
      <FormInput
        control={control}
        label="¿Cuántas sucursales tiene?"
        name="numBranches"
        type="number"
        description="Si es única, escribe 1."
        maxChars={3}
      />

      {/* 4. Horario de Atención */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
            Horario de atención regular <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-500 mb-2">Selecciona tu hora de apertura y cierre.</p>
        
        <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
                <Controller
                    control={control}
                    name="openingTime"
                    render={({ field }) => (
                        <div className="relative">
                            <input
                                type="time"
                                {...field}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#4A7729] focus:ring-2 focus:ring-[#4A7729]/20 outline-none"
                            />
                            <Clock className="absolute right-8 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none hidden sm:block" />
                        </div>
                    )}
                />
                <span className="text-xs text-gray-400 ml-1">Apertura</span>
            </div>
            

            <span className="text-gray-400 font-bold">-</span>

            {/* Cierre */}
            <div className="flex-1 relative">
                 <Controller
                    control={control}
                    name="closingTime"
                    render={({ field }) => (
                        <div className="relative">
                            <input
                                type="time"
                                {...field}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#4A7729] focus:ring-2 focus:ring-[#4A7729]/20 outline-none"
                            />
                              <Clock className="absolute right-8 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none hidden sm:block" />
                        </div>
                    )}
                />
                <span className="text-xs text-gray-400 ml-1">Cierre</span>
            </div>
        </div>
        {(errors.openingTime || errors.closingTime) && (
             <span className="text-xs text-red-500">Debes definir ambos horarios.</span>
        )}
      </div>

      <FormInput
        control={control}
        label="¿Cuentas con alguna red social? (Link)"
        name="socialMedia"
        type="text"
        description="Facebook, Instagram o página web."
        maxChars={244}
      />

      <FormPhone 
        control={control} 
        name="restaurantPhone.number"
        label="Teléfono del restaurante"
        description="Para pedidos o contacto directo."
      />

    </div>
  );
}