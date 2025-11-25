'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RestaurantItem } from '@/data/restaurantData';
import { Heart, Star, MapPoint, ClockCircle } from '@solar-icons/react';

interface RestaurantCardProps {
  item: RestaurantItem;
}

export function RestaurantCard({ item }: RestaurantCardProps) {
  const [isFavorite, setIsFavorite] = useState(true); // Asumimos true porque estamos en favoritos

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="relative w-full bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
      
      {/* Enlace a la página dinámica del restaurante */}
      <Link href={`/client/user/restaurant/${item.id}`} className="flex flex-col w-full h-full">
        
        {/* Banner Superior */}
        <div className="relative w-full h-32 bg-gray-100">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
          
          {/* Overlay Gradiente para texto */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Botón Favorito Flotante */}
          <div 
            onClick={toggleFavorite}
            className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-gray-400 hover:scale-110 transition-transform z-10 cursor-pointer shadow-sm"
          >
            <Heart 
                weight={isFavorite ? "Bold" : "Linear"} 
                className={`w-5 h-5 ${isFavorite ? "text-red-500" : "text-gray-400"}`}
            />
          </div>

          {/* Logo Flotante superpuesto */}
          <div className="absolute -bottom-4 left-4 w-12 h-12 rounded-full border-2 border-white bg-white shadow-md overflow-hidden z-10">
             <Image 
                src={item.logo}
                alt="Logo"
                fill
                className="object-contain p-1"
             />
          </div>
        </div>

        {/* Contenido */}
        <div className="pt-6 px-4 pb-4 flex-1 flex flex-col justify-between">
          
          <div className="flex justify-between items-start mb-2">
            <div>
                <h3 className="font-bold text-gray-900 text-lg leading-tight">
                {item.name}
                </h3>
                <p className="text-xs text-gray-500 font-medium mt-0.5">{item.category}</p>
            </div>
            
            {/* Rating Badge */}
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                <span className="text-xs font-bold text-gray-700">{item.rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
             <div className="flex items-center gap-1">
                <ClockCircle className="w-3.5 h-3.5 text-gray-400" />
                <span>{item.deliveryTime}</span>
             </div>
             <div className="flex items-center gap-1">
                <MapPoint className="w-3.5 h-3.5 text-gray-400" />
                <span className="truncate max-w-[120px]">Centro, Qro</span>
             </div>
          </div>

        </div>
      </Link>
    </div>
  );
}