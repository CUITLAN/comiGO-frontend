'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { EmployerFormType } from '@/validations/employerSchema';
import { MapPin, Tag, Clock, User, DollarSign, Star, Globe, Mail, Phone, Calendar } from 'lucide-react';
import Image from 'next/image';

export default function RestaurantVisual() {
  // Usamos el contexto para leer los datos de TODOS los pasos anteriores
  const { watch } = useFormContext<EmployerFormType>();
  const data = watch();

  // Función auxiliar para generar URLs temporales de las imágenes subidas (Files)
  const getPreviewUrl = (file: File | null) => {
    if (file && typeof window !== 'undefined') {
      return URL.createObjectURL(file);
    }
    return null; // O una imagen placeholder por defecto
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="text-center mb-2">
        <h3 className="text-xl font-bold text-gray-800">Una pequeña visualización</h3>
        <p className="text-sm text-gray-500">Así se verá tu restaurante</p>
      </div>

      {/* --- TARJETA PRINCIPAL --- */}
      <div className="w-full border border-gray-200 rounded-xl bg-white p-6 shadow-sm relative">
        
        {/* Título con estilo "Pill" beige */}
        <div className="flex justify-center mb-6">
            <div className="bg-[#FFF8F0] border border-[#F5E6D3] px-8 py-2 rounded-full">
                <h2 className="text-xl font-bold text-gray-900 text-center">
                    {data.restaurantName || "Nombre del Restaurante"}
                </h2>
            </div>
        </div>

        {/* Galería de Imágenes (3 slots) */}
        <div className="grid grid-cols-3 gap-2 mb-6 h-28 sm:h-32">
            {(data.restaurantImages || [null, null, null]).map((file, index) => {
                const preview = getPreviewUrl(file as File);
                return (
                    <div key={index} className="relative w-full h-full rounded-lg overflow-hidden bg-gray-100 border border-gray-100">
                        {preview ? (
                            <Image 
                                src={preview} 
                                alt={`Foto ${index + 1}`} 
                                fill 
                                className="object-cover" 
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-300 text-xs text-center p-1">
                                Sin imagen
                            </div>
                        )}
                    </div>
                );
            })}
        </div>

        {/* Metadatos (Iconos y Texto) */}
        <div className="space-y-2 text-sm text-gray-600 mb-6">
            {/* Dirección */}
            <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-gray-400 shrink-0" />
                <span><span className="font-semibold text-gray-700">Dirección:</span> {data.restaurantAddress || "Sin dirección"}</span>
            </div>
            
            {/* Categoría */}
            <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-gray-400 shrink-0" />
                <span><span className="font-semibold text-gray-700">Categoría:</span> {data.restaurantType || "No especificada"}</span>
            </div>

            {/* Horario */}
            <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                <span><span className="font-semibold text-gray-700">Horario:</span> {data.openingTime} - {data.closingTime}</span>
            </div>
            
            {/* Días Laborales (Hardcodeado o Placeholder porque no estaba en el schema, puedes agregarlo si quieres) */}
            <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                <span><span className="font-semibold text-gray-700">Días laborales:</span> Lunes - Domingo</span>
            </div>

            {/* Costo Promedio (Placeholder - No estaba en el schema) */}
             <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-400 shrink-0" />
                <span><span className="font-semibold text-gray-700">Costo promedio:</span> $100 - $200 MXN</span>
            </div>

            {/* Dirigido por */}
            <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400 shrink-0" />
                <span><span className="font-semibold text-gray-700">Dirigido por:</span> {data.employerName} {data.employerLastName}</span>
            </div>

            {/* Estrellas (Estáticas para preview) */}
            <div className="flex items-center gap-1 mt-1">
                {[1,2,3,4].map(i => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                <Star className="w-3 h-3 text-gray-300" />
            </div>
        </div>

        <hr className="border-gray-100 my-4" />

        {/* Descripción */}
        <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-1">Descripción</h4>
            <p className="text-xs text-gray-500 leading-relaxed text-justify">
                {data.restaurantDescription || "Aquí aparecerá la descripción de tu restaurante para que los clientes puedan conocer más sobre tu propuesta gastronómica."}
            </p>
        </div>

        {/* Redes Sociales */}
        <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-2">Redes Sociales</h4>
            {data.socialMedia ? (
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Globe className="w-4 h-4" />
                    <a href={data.socialMedia} target="_blank" className="hover:underline text-blue-600 truncate max-w-[200px]">
                        {data.socialMedia}
                    </a>
                </div>
            ) : (
                <p className="text-xs text-gray-400 italic">No agregaste redes sociales</p>
            )}
        </div>

        {/* Caja de Contacto (Bottom Box) */}
        <div className="bg-gray-50 rounded-lg border border-gray-100 p-4">
            <h4 className="font-semibold text-gray-800 mb-3 text-sm">Información de contacto</h4>
            <div className="flex flex-col sm:flex-row justify-between gap-3 text-xs text-gray-600">
                 <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{data.employerEmail}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{data.restaurantPhone?.code} {data.restaurantPhone?.number}</span>
                 </div>
            </div>
        </div>

      </div>
    </div>
  );
}