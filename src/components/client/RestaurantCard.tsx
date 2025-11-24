'use client';

import { useState } from 'react';
import Image from 'next/image';
import { RestaurantItem } from '@/data/restaurantData';
import { Heart, Star, MapPoint, Shop } from '@solar-icons/react';

interface RestaurantCardProps {
  item: RestaurantItem;
}

export function RestaurantCard({ item }: RestaurantCardProps) {
  const [isFavorite, setIsFavorite] = useState(true); // Asumimos true porque está en favoritos

  return (
    <div className="w-full bg-white border border-gray-300 rounded-xl p-3 flex gap-3 shadow-sm hover:shadow-md transition-shadow">
      
      {/* Imagen del Restaurante */}
      <div className="relative w-28 h-28 shrink-0 rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Información */}
      <div className="flex-1 flex flex-col justify-between py-1">
        
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-1">
              {item.name}
            </h3>
            <div className="flex items-center gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                        key={star} 
                        className={`w-3 h-3 ${star <= item.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                    />
                ))}
            </div>
          </div>
          
          {/* Botón Favorito (Tienda) */}
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className="text-gray-400 hover:scale-110 transition-transform"
          >
            <Heart 
                weight={isFavorite ? "Bold" : "Linear"} 
                className={`w-6 h-6 ${isFavorite ? "text-red-500" : "text-black"}`}
            />
          </button>
        </div>

        {/* Footer: Dirección y Categoría */}
        <div className="mt-auto space-y-1">
            <div className="flex items-center gap-2 text-xs text-gray-500">
                <Shop className="w-4 h-4 text-[#0C3252]" /> {/* Icono de tienda para distinguir */}
                <span className="font-medium text-[#0C3252]">{item.category}</span>
            </div>
            
            <div className="flex items-start gap-1 text-xs text-gray-500">
                <MapPoint className="w-3 h-3 mt-0.5 shrink-0" />
                <span className="line-clamp-1">Dirección: {item.address}</span>
            </div>
        </div>

      </div>
    </div>
  );
}