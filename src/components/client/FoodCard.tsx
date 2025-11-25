
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'; 
import { FoodItem } from '@/data/foodData';
import { Heart, Star, User, Bag } from '@solar-icons/react'; 
import { toast } from 'sonner'; 

interface FoodCardProps {
  item: FoodItem;
}

export function FoodCard({ item }: FoodCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleReserve = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    
    toast.success(`Platillo "${item.name}" reservado`, {
        description: "Se ha añadido a tu pedido exitosamente.",
        duration: 2000,
    });
  };

  return (
    <div className="relative w-full bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
      
      {/* Enlace a la página dinámica de detalle */}
      <Link href={`/client/user/home/${item.id}`} className="flex p-3 gap-3 w-full h-full">
        
        {/* Imagen del Producto */}
        <div className="relative w-28 h-28 shrink-0 rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
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
            <div 
              onClick={toggleFavorite}
              className="text-gray-400 hover:scale-110 transition-transform z-10 cursor-pointer p-1"
            >
              <Heart 
                  weight={isFavorite ? "Bold" : "Linear"} 
                  className={`w-6 h-6 ${isFavorite ? "text-red-500" : "text-black"}`}
              />
            </div>
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

          {/* Footer: Restaurante, Precio y Botón Reservar */}
          <div className="flex justify-between items-end mt-auto">
              <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                  <User className="w-3 h-3" />
                  {/* ACTUALIZADO: Accedemos a item.restaurant.name */}
                  <span className="truncate max-w-[100px]">{item.restaurant.name}</span>
              </div>
              
              <div className="flex items-center gap-3">
                  <span className="font-bold text-lg text-black">
                      ${item.price}
                  </span>
                  
                  <button
                    onClick={handleReserve}
                    className="bg-[#4A7729] text-white p-2 rounded-full shadow-sm hover:bg-[#3d6321] transition-transform hover:scale-105 active:scale-95 z-10"
                    title="Reservar ahora"
                  >
                    <Bag size={16} weight="Bold" />
                  </button>
              </div>
          </div>

        </div>
      </Link>
    </div>
  );
}