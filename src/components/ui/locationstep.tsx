'use client';

import React, { useState, useEffect } from 'react';
import { Control, UseFormSetValue, useWatch } from 'react-hook-form';
import { EmployerFormType } from '@/validations/employerSchema';
import FormInput from '../forms/FormInput';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Importante para los estilos del mapa

// Coordenadas iniciales (Centro de México o CDMX)
const INITIAL_VIEW_STATE = {
  latitude: 19.4326,
  longitude: -99.1332,
  zoom: 11
};

interface LocationStepProps {
  control: Control<EmployerFormType>;
  setValue: UseFormSetValue<EmployerFormType>;
  errors: any;
}

export default function LocationStep({ control, setValue, errors }: LocationStepProps) {
  // Leemos el valor actual de lat/lng por si el usuario regresa del paso 5
  const currentLocation = useWatch({
    control,
    name: 'restaurantLocation',
  });

  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

  // Si ya hay coordenadas guardadas (al volver atrás), centramos el mapa ahí
  useEffect(() => {
    if (currentLocation?.lat && currentLocation?.lng) {
      setViewState({
        latitude: currentLocation.lat,
        longitude: currentLocation.lng,
        zoom: 15
      });
    }
  }, []); // Solo al montar

  // Función cuando arrastran el Pin
  const onMarkerDragEnd = (event: any) => {
    const { lng, lat } = event.lngLat;
    
    // Guardamos en el formulario
    setValue('restaurantLocation', { lat, lng }, { shouldValidate: true });
    
    console.log("Nueva ubicación:", lat, lng);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Todo se ve delicioso</h3>
        <p className="text-sm text-gray-500">¿En dónde está ubicado tu restaurante?</p>
      </div>

      {/* 1. Input de Dirección (Texto) */}
      <FormInput
        control={control}
        name="restaurantAddress"
        label="Dirección del restaurante *"
        description="Escribe la calle, número y colonia."
        placeholder="Av. Reforma 222, Juárez..."
        type="text"
      />

      {/* 2. Mapa de Mapbox */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
           Marca la ubicación exacta en el mapa *
        </label>
        
        {/* Contenedor del mapa con bordes redondeados y altura fija */}
        <div className="h-[300px] w-full rounded-xl overflow-hidden border border-gray-200 shadow-inner relative">
           
           {/* Verificar que exista el token antes de cargar */}
           {!process.env.NEXT_PUBLIC_MAPBOX_TOKEN ? (
             <div className="flex items-center justify-center h-full bg-gray-100 text-red-500 text-xs p-4 text-center">
               Falta el NEXT_PUBLIC_MAPBOX_TOKEN en .env.local
             </div>
           ) : (
             <Map
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                mapStyle="mapbox://styles/mapbox/streets-v12" // Estilo de mapa callejero
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                cursor="pointer"
             >
                <NavigationControl position="top-right" />
                
                <Marker
                    latitude={viewState.latitude}
                    longitude={viewState.longitude}
                    anchor="bottom"
                    draggable
                    onDragEnd={onMarkerDragEnd}
                >
                    {/* Pin Personalizado (Icono de ComiGo o Pin Rojo) */}
                    <div className="text-4xl drop-shadow-lg cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
                        📍
                    </div>
                </Marker>
             </Map>
           )}
           
           {/* Instrucción flotante sobre el mapa */}
           <div className="absolute top-2 left-2 bg-white/90 px-3 py-1 rounded-md text-xs font-medium shadow-sm text-zinc-600 pointer-events-none">
              Arrastra el pin rojo
           </div>
        </div>
        
        {/* Mensaje de error si no seleccionan ubicación */}
        {errors.restaurantLocation && (
            <span className="text-xs text-red-500 block">
                {errors.restaurantLocation.lat?.message || "Debes seleccionar una ubicación en el mapa."}
            </span>
        )}
      </div>

    </div>
  );
}