'use client';

import React, { useEffect } from 'react';
import { Control, useWatch, UseFormSetValue, UseFormTrigger } from 'react-hook-form';
import { EmployerFormType } from '@/validations/employerSchema';
import { ImagePlus, X, Trash2 } from 'lucide-react';
import Image from 'next/image';
import FormInput from '../forms/FormInput';

interface AddImageStepProps {
  control: Control<EmployerFormType>;
  setValue: UseFormSetValue<EmployerFormType>;
  trigger: UseFormTrigger<EmployerFormType>;
}

export default function AddImageStep({ control, setValue, trigger }: AddImageStepProps) {
  // Observamos el array de imágenes en tiempo real
  const images = useWatch({
    control,
    name: 'restaurantImages',
    defaultValue: [null, null, null], // Iniciamos con 3 espacios vacíos
  });

  // Función para manejar la subida de archivos
  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const currentImages = [...(images || [null, null, null])];
      currentImages[index] = file;
      setValue('restaurantImages', currentImages, { shouldValidate: true });
    }
  };

  // Función para eliminar una imagen
  const removeImage = (index: number) => {
    const currentImages = [...(images || [null, null, null])];
    currentImages[index] = null;
    setValue('restaurantImages', currentImages, { shouldValidate: true });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">
            Compártenos algunas imágenes de tu restaurante
        </h3>
        <p className="text-sm text-zinc-500">
            Esto ayudará a que tu perfil destaque (Máximo 3 fotos).
        </p>
      </div>

      {/* GRILLA DE 3 TARJETAS DE CARGA */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[0, 1, 2].map((index) => {
          const currentFile = images?.[index];
          const previewUrl = currentFile ? URL.createObjectURL(currentFile) : null;

          return (
            <div key={index} className="relative group h-40 w-full">
              {currentFile && previewUrl ? (
                // --- ESTADO: CON IMAGEN (PREVIEW) ---
                <div className="relative w-full h-full rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                  <Image
                    src={previewUrl}
                    alt={`Preview ${index}`}
                    fill
                    className="object-cover"
                  />
                  {/* Botón para eliminar */}
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-red-500 hover:bg-red-50 transition-all shadow-md z-10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1 text-center">
                    <p className="text-[10px] text-white truncate px-2">{currentFile.name}</p>
                  </div>
                </div>
              ) : (
                // --- ESTADO: VACÍO (SUBIR) ---
                <>
                  <input
                    type="file"
                    id={`file-upload-${index}`}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(index, e)}
                  />
                  <label
                    htmlFor={`file-upload-${index}`}
                    className="flex flex-col items-center justify-center w-full h-full rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all duration-200 group-hover:shadow-md"
                  >
                    <div className="bg-white p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                        <ImagePlus className="w-6 h-6 text-zinc-400 group-hover:text-blue-500" />
                    </div>
                    <span className="text-xs text-zinc-500 text-center px-2 font-medium group-hover:text-blue-600">
                      Sube tu fotografía <br/> dando click aquí
                    </span>
                  </label>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* CAMPO DE DESCRIPCIÓN */}
      <div className="pt-2">
         <FormInput
            control={control}
            name="restaurantDescription"
            label="¿Cómo describirías tu restaurante?"
            description="Escribe una breve descripción, esta será visible para los clientes."
            type="text" // Podríamos cambiar FormInput para aceptar 'textarea' si tienes esa prop
            // Si FormInput no soporta textarea, usa type="text" o avísame para darte un componente Textarea
          />
      </div>

    </div>
  );
}