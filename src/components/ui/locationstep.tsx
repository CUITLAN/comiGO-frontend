'use client';

import React, { useState, useEffect } from 'react';
import { Control, UseFormSetValue, useWatch } from 'react-hook-form';
import { EmployerFormType } from '@/validations/employerSchema';
import FormInput from '../forms/FormInput';

import mapboxgl from 'mapbox-gl';
import Map, { Marker, NavigationControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

// Estrategia del Blob para el Worker (Seguridad)
if (typeof window !== 'undefined') {
  const loadMapboxWorker = async () => {
    try {
      const response = await fetch('https://api.mapbox.com/mapbox-gl-js/v3.16.0/mapbox-gl-csp-worker.js');
      const workerScript = await response.text();
      const blob = new Blob([workerScript], { type: 'application/javascript' });
      (mapboxgl as any).workerUrl = URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error cargando el worker de Mapbox:", error);
    }
  };
  loadMapboxWorker();
}

const INITIAL_VIEW_STATE = {
  latitude: 20.5888,
  longitude: -100.3899,
  zoom: 13
};

interface LocationStepProps {
  control: Control<EmployerFormType>;
  setValue: UseFormSetValue<EmployerFormType>;
  errors: any;
}

export default function LocationStep({ control, setValue, errors }: LocationStepProps) {
  // 1. Vigilamos tanto la ubicación (coords) como la dirección escrita (texto)
  const restaurantLocation = useWatch({ control, name: 'restaurantLocation' });
  const addressText = useWatch({ control, name: 'restaurantAddress' });

  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  const [isSearching, setIsSearching] = useState(false); // Para mostrar un indicador si quieres

  // Efecto inicial: Si ya hay coordenadas guardadas, centrar ahí
  useEffect(() => {
    if (restaurantLocation?.lat && restaurantLocation?.lng) {
      setViewState({
        latitude: restaurantLocation.lat,
        longitude: restaurantLocation.lng,
        zoom: 15
      });
    }
  }, []); 

  // --- LÓGICA DE GEOCODING (Mover mapa al escribir) ---
  useEffect(() => {
    // Si el texto es muy corto, no buscamos
    if (!addressText || addressText.length < 5) return;

    // Creamos un "debounce" para no buscar en cada tecla, sino esperar 1.5 seg
    const timeoutId = setTimeout(async () => {
      setIsSearching(true);
      try {
        const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
        if (!token) return;

        // Codificamos la dirección para URL
        const query = encodeURIComponent(addressText);
        
        // Limitamos la búsqueda a México (country=mx) para mayor precisión
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${token}&country=mx&limit=1`;

        const res = await fetch(url);
        const data = await res.json();

        // Si encontramos un resultado...
        if (data.features && data.features.length > 0) {
          const [lng, lat] = data.features[0].center;

          // 1. Movemos la cámara del mapa
          setViewState((prev) => ({
            ...prev,
            latitude: lat,
            longitude: lng,
            zoom: 16, // Zoom más cercano al encontrar dirección
            transitionDuration: 1000 // Animación suave
          }));

          // 2. Movemos el pin rojo (actualizamos el formulario)
          setValue('restaurantLocation', { lat, lng }, { shouldValidate: true });
          console.log("Dirección encontrada:", lat, lng);
        }
      } catch (error) {
        console.error("Error buscando dirección:", error);
      } finally {
        setIsSearching(false);
      }
    }, 1500); // Espera 1.5 segundos después de que el usuario deja de escribir

    return () => clearTimeout(timeoutId); // Limpia el timer si el usuario sigue escribiendo
  }, [addressText, setValue]);


  const onMarkerDragEnd = (event: any) => {
    const { lng, lat } = event.lngLat;
    setValue('restaurantLocation', { lat, lng }, { shouldValidate: true });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Todo se ve delicioso</h3>
        <p className="text-sm text-gray-500">¿En dónde está ubicado tu restaurante?</p>
      </div>

      <div className="relative">
        <FormInput
          control={control}
          name="restaurantAddress"
          label="Dirección del restaurante *"
          description="Escribe la calle, número y colonia (El mapa se actualizará automáticamente)."
          placeholder="Ej: Av. de los Arcos 123, Querétaro..."
          type="text"
        />
        {/* Pequeño indicador de "Buscando..." opcional */}
        {isSearching && (
            <span className="absolute right-3 top-[38px] text-xs text-blue-500 animate-pulse font-medium">
                Buscando en el mapa...
            </span>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
           Confirma la ubicación exacta en el mapa *
        </label>
        
        <div className="h-[300px] w-full rounded-xl overflow-hidden border border-gray-200 shadow-inner relative">
           
           {!process.env.NEXT_PUBLIC_MAPBOX_TOKEN ? (
             <div className="flex items-center justify-center h-full bg-gray-100 text-red-500 text-xs p-4 text-center">
               Falta el token NEXT_PUBLIC_MAPBOX_TOKEN
             </div>
           ) : (
             <Map
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                cursor="pointer"
                mapLib={mapboxgl}
                style={{ width: '100%', height: '100%' }} 
             >
                <NavigationControl position="top-right" />
                
                <Marker
                    latitude={viewState.latitude}
                    longitude={viewState.longitude}
                    anchor="bottom"
                    draggable
                    onDragEnd={onMarkerDragEnd}
                >
                    <div className="text-4xl drop-shadow-lg cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
                        📍
                    </div>
                </Marker>
             </Map>
           )}
           
           <div className="absolute top-2 left-2 bg-white/90 px-3 py-1 rounded-md text-xs font-medium shadow-sm text-zinc-600 pointer-events-none">
              Arrastra el pin si la ubicación no es exacta
           </div>
        </div>
        
        {errors.restaurantLocation && (
            <span className="text-xs text-red-500 block">
                {errors.restaurantLocation.lat?.message || "Debes seleccionar una ubicación en el mapa."}
            </span>
        )}
      </div>
    </div>
  );
}