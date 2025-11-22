'use client';

import React from 'react';
import { Control, useWatch, UseFormSetValue, UseFormTrigger } from 'react-hook-form';
import { FoodPublishFormType } from '../tables/schemas/foodPublishEschema';
import { ImagePlus, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface AddFoodImageProps {
  control: Control<FoodPublishFormType>;
  setValue: UseFormSetValue<FoodPublishFormType>;
  trigger: UseFormTrigger<FoodPublishFormType>;
}

export default function AddFoodImage({ control, setValue, trigger }: AddFoodImageProps) {
  // Observamos el campo único de la imagen
  const currentFile = useWatch({
    control,
    name: 'productImage',
  });

  // Función para subir archivo
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('productImage', file, { shouldValidate: true });
    }
  };

  // Función para eliminar archivo
  const removeImage = () => {
    setValue('productImage', null, { shouldValidate: true });
  };

  // Generar preview URL si existe el archivo
  const previewUrl = currentFile && typeof window !== 'undefined' 
    ? URL.createObjectURL(currentFile) 
    : null;

  return (
    <div className="w-full h-48 animate-in fade-in zoom-in duration-500">
      
      {currentFile && previewUrl ? (
        // --- ESTADO: CON IMAGEN (PREVIEW) ---
        <div className="relative w-full h-full rounded-xl overflow-hidden border border-gray-200 shadow-sm group">
          <Image
            src={previewUrl}
            alt="Preview del producto"
            fill
            className="object-cover"
          />
          
          {/* Overlay oscuro al hacer hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

          {/* Botón para eliminar */}
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-3 right-3 bg-white p-2 rounded-full text-red-500 hover:bg-red-50 hover:text-red-600 transition-all shadow-md z-10 transform hover:scale-110"
          >
            <Trash2 className="w-5 h-5" />
          </button>

          {/* Nombre del archivo */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-center backdrop-blur-sm">
            <p className="text-xs text-white truncate px-2 font-medium">
              {currentFile.name}
            </p>
          </div>
        </div>
      ) : (
        // --- ESTADO: VACÍO (SUBIR) ---
        <>
          <input
            type="file"
            id="food-image-upload"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <label
            htmlFor="food-image-upload"
            className="flex flex-col items-center justify-center w-full h-full rounded-xl border-2 border-dashed border-gray-300 bg-[#F9FAFB] hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all duration-300 group relative"
          >
            {/* Círculo de fondo del icono */}
            <div className="bg-white p-4 rounded-full shadow-sm mb-3 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                <ImagePlus className="w-8 h-8 text-gray-400 group-hover:text-[#4285F4]" />
            </div>
            
            <div className="text-center px-4 space-y-1">
                <span className="text-sm font-semibold text-gray-600 group-hover:text-[#4285F4] transition-colors">
                  Sube tu fotografía
                </span>
                <p className="text-xs text-gray-400 font-medium">
                  dando click aquí
                </p>
            </div>
          </label>
        </>
      )}
    </div>
  );
}