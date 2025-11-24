'use client';

import React, { useState, useEffect } from 'react';
import { Control, UseFormSetValue, useWatch } from 'react-hook-form';
import FormInput from '@/components/forms/FormInput';
import mapboxgl from 'mapbox-gl';
import Map, { Marker, NavigationControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

// Configuración del Worker (Blob Strategy)
if (typeof window !== 'undefined') {
  const loadMapboxWorker = async () => {
    try {
      const response = await fetch('https://api.mapbox.com/mapbox-gl-js/v3.16.0/mapbox-gl-csp-worker.js');
      const workerScript = await response.text();
      const blob = new Blob([workerScript], { type: 'application/javascript' });
      (mapboxgl as any).workerUrl = URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error cargando Mapbox worker", error);
    }
  };
  loadMapboxWorker();
}

interface MapSectionProps {
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  isEditing: boolean; // Para bloquear el mapa si no se está editando
}

export default function MapSection({ control, setValue, isEditing }: MapSectionProps) {
  const restaurantLocation = useWatch({ control, name: 'location' });
  const addressText = useWatch({ control, name: 'address' });

  const [viewState, setViewState] = useState({
    latitude: 20.5888,
    longitude: -100.3899,
    zoom: 13
  });

  // Centrar mapa al cargar si hay datos
  useEffect(() => {
    if (restaurantLocation?.lat && restaurantLocation?.lng) {
      setViewState({
        latitude: restaurantLocation.lat,
        longitude: restaurantLocation.lng,
        zoom: 15
      });
    }
  }, []);

  // Geocoding al escribir dirección
  useEffect(() => {
    if (!isEditing || !addressText || addressText.length < 5) return;

    const timeoutId = setTimeout(async () => {
      try {
        const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
        if (!token) return;
        const query = encodeURIComponent(addressText);
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${token}&country=mx&limit=1`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.features?.length > 0) {
          const [lng, lat] = data.features[0].center;
          setViewState((prev) => ({ ...prev, latitude: lat, longitude: lng, zoom: 16 }));
          setValue('location', { lat, lng }, { shouldValidate: true });
        }
      } catch (error) {
        console.error(error);
      }
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [addressText, isEditing, setValue]);

  return (
    <div className="space-y-4">
      {/* Mapa */}
      <div className="h-[250px] w-full rounded-xl overflow-hidden border border-gray-200 shadow-inner relative">
        {!process.env.NEXT_PUBLIC_MAPBOX_TOKEN ? (
             <div className="flex items-center justify-center h-full bg-gray-100 text-xs p-4 text-center">
               Falta Token Mapbox
             </div>
        ) : (
            <Map
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            cursor={isEditing ? "pointer" : "default"}
            mapLib={mapboxgl}
            style={{ width: '100%', height: '100%' }}
            >
            {isEditing && <NavigationControl position="top-right" />}
            
            <Marker
                latitude={viewState.latitude}
                longitude={viewState.longitude}
                anchor="bottom"
                draggable={isEditing} // Solo arrastrable si se edita
                onDragEnd={(e) => {
                    setValue('location', { lat: e.lngLat.lat, lng: e.lngLat.lng });
                }}
            >
                <div className="text-4xl drop-shadow-lg -mt-4">📍</div>
            </Marker>
            </Map>
        )}
      </div>

      {/* Input Dirección */}
      <div>
        <label className="text-sm font-medium text-gray-700">
            En donde esta ubicado tu restaurante? <span className="text-red-500">*</span>
        </label>
        <FormInput
            control={control}
            name="address"
            placeholder="Calle, número, colonia..."
            type="text"
            disabled={!isEditing} // Input deshabilitado si no se edita
            className={!isEditing ? "bg-gray-50 text-gray-500" : ""}
        />
        <p className="text-xs text-gray-400 mt-1">
            Escribe la dirección o mueve el pin en el mapa.
        </p>
      </div>
    </div>
  );
}