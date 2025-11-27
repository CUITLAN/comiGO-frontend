'use client';

import { useState, useEffect } from 'react';
import { Bag, Magnifer } from '@solar-icons/react';
import MapExplore from '@/components/client/MapExplore';
// CAMBIO: Usamos los datos centralizados
import { dummyRestaurantData } from '@/data/restaurantData'; 

export default function ClientMapPage() {
  const [search, setSearch] = useState('');
  const [searchedLocation, setSearchedLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!search || search.length < 5) return;

    const timeoutId = setTimeout(async () => {
      setIsSearching(true);
      try {
        const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
        if (!token) return;

        const query = encodeURIComponent(search);
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${token}&country=mx&limit=1`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.features && data.features.length > 0) {
          const [lng, lat] = data.features[0].center;
          setSearchedLocation({ lat, lng });
        }
      } catch (error) {
        console.error("Error buscando dirección:", error);
      } finally {
        setIsSearching(false);
      }
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [search]);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-[#FDFBF7]"> 
      
      {/* HEADER */}
      <div className="bg-[#EBEBEB] px-6 py-3 flex justify-between items-center shadow-sm shrink-0">
        <h1 className="text-lg font-bold text-[#0C3252] tracking-wide uppercase">MAPA</h1>
        <div className="text-black">
            <Bag className="w-6 h-6" />
        </div>
      </div>

      {/* BUSCADOR */}
      <div className="px-4 pt-4 pb-2 shrink-0 space-y-2">
        <div className="relative">
            <input 
                type="text" 
                placeholder="Escribe tu dirección..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#F5F5F5] border border-gray-200 text-gray-700 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#529A60]/20 transition-all placeholder:text-gray-400 text-sm"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                {isSearching ? (
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-[#529A60] rounded-full animate-spin"></div>
                ) : (
                    <Magnifer className="text-black w-5 h-5" />
                )}
            </div>
        </div>
        
        <p className="text-[10px] text-gray-400 px-1">
            Explora los restaurantes cercanos escribiendo tu ubicación.
        </p>
      </div>

      {/* CONTENEDOR MAPA */}
      <div className="flex-1 px-4 pb-20 w-full"> 
        <MapExplore 
            // Usamos la data centralizada (es compatible con MapRestaurant)
            restaurants={dummyRestaurantData} 
            centerCoordinates={searchedLocation} 
            // CAMBIO IMPORTANTE: Habilitamos la navegación al detalle desde el mapa
            baseDetailPath="/client/user/map"
        />
      </div>

    </div>
  );
}