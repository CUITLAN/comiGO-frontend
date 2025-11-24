'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import mapboxgl from 'mapbox-gl'; 
import Map, { Marker, NavigationControl, Popup, MapRef } from 'react-map-gl/mapbox';

// Importamos estilos
import 'mapbox-gl/dist/mapbox-gl.css';

import { MapRestaurant } from '@/data/mapData';
import { MapPoint } from '@solar-icons/react';

// Worker Fix
if (typeof window !== 'undefined') {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
}

interface MapExploreProps {
  restaurants: MapRestaurant[];
  centerCoordinates?: { lat: number; lng: number } | null; 
}

const INITIAL_VIEW_STATE = {
  latitude: 19.4326, 
  longitude: -99.1332,
  zoom: 13
};

export default function MapExplore({ restaurants, centerCoordinates }: MapExploreProps) {
  const [popupInfo, setPopupInfo] = useState<MapRestaurant | null>(null);
  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    if (centerCoordinates && mapRef.current) {
      mapRef.current.flyTo({
        center: [centerCoordinates.lng, centerCoordinates.lat],
        zoom: 15,
        duration: 2000
      });
    }
  }, [centerCoordinates]);

  return (
    <div className="w-full h-full rounded-xl overflow-hidden shadow-inner border border-gray-200 relative bg-gray-50">
        
      {!process.env.NEXT_PUBLIC_MAPBOX_TOKEN ? (
         <div className="flex items-center justify-center h-full text-gray-500">
           Falta Token
         </div>
      ) : (
         <Map
            ref={mapRef}
            initialViewState={INITIAL_VIEW_STATE}
            
            // --- CAMBIO AQUÍ ---
            // 'streets-v12' es el estilo estándar a color.
            // Si este falla, prueba 'streets-v11'.
            mapStyle="mapbox://styles/mapbox/streets-v12"
            
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            mapLib={mapboxgl}
            style={{ width: '100%', height: '100%' }}
            attributionControl={true}
         >
            <NavigationControl position="top-right" />

            {restaurants.map((restaurant) => (
                <Marker
                    key={restaurant.id}
                    latitude={restaurant.coordinates.lat}
                    longitude={restaurant.coordinates.lng}
                    anchor="bottom"
                    onClick={(e) => {
                        e.originalEvent.stopPropagation();
                        setPopupInfo(restaurant);
                    }}
                >
                    <div className="relative flex flex-col items-center cursor-pointer group hover:z-50">
                        <div className="w-12 h-12 bg-black rounded-full border-2 border-white shadow-lg flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform z-20 relative">
                            <Image 
                                src={restaurant.logo} 
                                alt={restaurant.name} 
                                width={40} 
                                height={40} 
                                className="object-cover w-full h-full opacity-90"
                            />
                        </div>
                        <div className="w-4 h-4 bg-black rotate-45 -mt-2 mb-2 border-r-2 border-b-2 border-white z-10"></div>
                    </div>
                </Marker>
            ))}

            {popupInfo && (
                <Popup
                    anchor="top"
                    latitude={popupInfo.coordinates.lat}
                    longitude={popupInfo.coordinates.lng}
                    onClose={() => setPopupInfo(null)}
                    closeButton={false}
                    className="z-50"
                    maxWidth="200px"
                >
                    <div className="p-2">
                        <h3 className="font-bold text-[#0C3252] text-sm">{popupInfo.name}</h3>
                        <p className="text-xs text-gray-500 mb-1">{popupInfo.category}</p>
                        <button className="flex items-center gap-1 text-[#4A7729] text-xs font-bold hover:underline">
                            <MapPoint className="w-3 h-3" />
                            Ver detalles
                        </button>
                    </div>
                </Popup>
            )}

            {centerCoordinates && (
                <Marker latitude={centerCoordinates.lat} longitude={centerCoordinates.lng} anchor="bottom">
                     <div className="text-4xl drop-shadow-md animate-bounce filter hue-rotate-90">📍</div>
                </Marker>
            )}

         </Map>
      )}
    </div>
  );
}