'use client';

import Image from 'next/image';
import { FoodItem } from '@/data/foodData';
import { Star, User, TrashBinMinimalistic } from '@solar-icons/react';

interface CartFoodCardProps {
  item: FoodItem;
  onRemove: (id: string) => void;
}

export function CartFoodCard({ item, onRemove }: CartFoodCardProps) {
  return (
    <div className="w-full bg-white border border-gray-300 rounded-xl p-3 flex gap-3 shadow-sm">
      
      {/* Imagen del Producto */}
      <div className="relative w-28 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Información */}
      <div className="flex-1 flex flex-col justify-between">
        
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-gray-900 text-base leading-tight line-clamp-1">
              {item.name}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Cocinadado: {item.cookedDate}
            </p>
          </div>
          
          {/* Botón Eliminar (Trash) */}
          <button 
            onClick={() => onRemove(item.id)}
            className="text-red-500 hover:bg-red-50 p-1 rounded-md transition-colors"
          >
            <TrashBinMinimalistic className="w-5 h-5" />
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
        <div className="flex justify-between items-end">
            <div className="flex items-center gap-1 text-xs text-gray-500">
                <User className="w-3 h-3" />
                <span className="truncate max-w-[100px]">Ofrecido por: {item.restaurantName}</span>
            </div>
            
            <span className="font-bold text-lg text-black">
                ${item.price}
            </span>
        </div>

      </div>
    </div>
  );
}