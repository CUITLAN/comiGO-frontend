'use client';

import Image from 'next/image';
import Link from 'next/link'; 
import { FoodItem } from '@/data/foodData';
import { Star, User, TrashBinMinimalistic } from '@solar-icons/react';
import { toast } from 'sonner'; 

interface CartFoodCardProps {
  item: FoodItem;
  onRemove: (id: string) => void;
}

export function CartFoodCard({ item, onRemove }: CartFoodCardProps) {
  
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    onRemove(item.id);
    
    toast.success("Comida eliminada", {
        description: `Has eliminado "${item.name}" de tu carrito.`,
        duration: 2000,
        style: {
            background: '#FEF2F2', 
            border: '1px solid #EF4444',
            color: '#B91C1C'
        }
    });
  };

  const restaurantName = item.restaurant?.name || "Restaurante";

  return (
    <div className="relative w-full bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
      
      {/* CAMBIO: Apuntamos a la ruta del carrito */}
      <Link href={`/client/user/cart/${item.id}`} className="flex p-3 gap-3 w-full h-full">
        
        <div className="relative w-28 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-gray-900 text-base leading-tight line-clamp-1">
                {item.name}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Cocinado: {item.cookedDate}
              </p>
            </div>
            
            <button 
              onClick={handleDelete}
              className="text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-colors z-10"
              title="Eliminar del carrito"
            >
              <TrashBinMinimalistic className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-1 my-1">
              {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                      key={star} 
                      className={`w-3 h-3 ${star <= item.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                  />
              ))}
          </div>

          <div className="flex justify-between items-end">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                  <User className="w-3 h-3" />
                  <span className="truncate max-w-[100px]">Ofrecido por: {restaurantName}</span>
              </div>
              
              <span className="font-bold text-lg text-black">
                  ${item.price}
              </span>
          </div>

        </div>
      </Link>
    </div>
  );
}