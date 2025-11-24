'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FoodItem } from '@/data/foodData';
import { Heart, Star, User } from '@solar-icons/react';

interface FoodCardProps {
  item: FoodItem;
}

export function FoodCard({ item }: FoodCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Aquí iría la lógica para guardar en backend/contexto
    console.log(`${item.name} es favorito: ${!isFavorite}`);
  };

  return (
    <div className="w-full bg-white border border-gray-300 rounded-xl p-3 flex gap-3 shadow-sm hover:shadow-md transition-shadow">
      
      {/* Imagen del Producto */}
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
            <p className="text-xs text-gray-500 mt-1">
              Cocinado: {item.cookedDate}
            </p>
          </div>
          
          {/* Botón Favorito */}
          <button 
            onClick={toggleFavorite}
            className="text-gray-400 hover:scale-110 transition-transform"
          >
            <Heart 
                weight={isFavorite ? "Bold" : "Linear"} 
                className={`w-6 h-6 ${isFavorite ? "text-red-500" : "text-black"}`}
            />
          </button>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 my-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                    key={star} 
                    className={`w-3 h-3 ${star <= item.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                />
            ))}
        </div>

        {/* Footer: Restaurante y Precio */}
        <div className="flex justify-between items-end mt-auto">
            <div className="flex items-center gap-1 text-xs text-gray-500">
                <User className="w-3 h-3" />
                <span className="truncate max-w-[100px]">{item.restaurantName}</span>
            </div>
            
            <span className="font-bold text-lg text-black">
                ${item.price}
            </span>
        </div>

      </div>
    </div>
  );
}