'use client';

import Image from 'next/image';
import Link from 'next/link'; 
import { Heart, Star, User, Bag } from '@solar-icons/react'; 
import { useCartStore } from '@/store/useCartStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { ClientProduct } from '@/store/useClientFeedStore';

interface FoodCardProps {
  item: ClientProduct;
}

export function FoodCard({ item }: FoodCardProps) {
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const favorite = isFavorite(item.id);
  const { addItem } = useCartStore();

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    toggleFavorite(item.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        restaurantName: item.restaurant.name,
        branchId: item.branchId
    });
  };

  return (
    <div className="relative w-full bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all group overflow-hidden">
      
      {/* CORRECCIÓN: Ruta ajustada a /client/home/[id] */}
      <Link href={`/client/user/home/${item.id}`} className="flex flex-row p-3 gap-3 w-full h-full">
        
        <div className="relative w-28 h-28 shrink-0 rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between py-0.5">
          <div className="flex justify-between items-start gap-2">
            <div className="min-w-0">
              <h3 className="font-bold text-[#0C3252] text-lg leading-tight truncate">
                {item.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
                Elaborado: {item.cookedDate}
              </p>
            </div>
            
            <button 
              onClick={handleToggleFavorite}
              className="text-gray-400 hover:scale-110 transition-transform cursor-pointer p-1 focus:outline-none"
            >
              <Heart 
                  weight={favorite ? "Bold" : "Linear"} 
                  className={`w-6 h-6 transition-colors ${favorite ? "text-red-500" : "text-gray-300 hover:text-red-400"}`}
              />
            </button>
          </div>

          <div className="flex items-center gap-2 my-1">
              <div className="flex items-center gap-0.5">
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-medium text-gray-700">{item.rating}</span>
              </div>
              <span className="text-gray-300 text-xs">•</span>
              <span className="text-xs text-gray-500 truncate">{item.category}</span>
          </div>

          <div className="flex justify-between items-end mt-auto pt-2">
              <div className="flex items-center gap-1 text-xs text-gray-500 mb-1 max-w-[50%]">
                  <User className="w-3 h-3 shrink-0" />
                  <span className="truncate">{item.restaurant.name}</span>
              </div>
              
              <div className="flex items-center gap-3">
                  <div className="text-right">
                      <span className="block font-bold text-lg text-[#0C3252] leading-none">
                          ${item.price}
                      </span>
                  </div>
                  
                  <button
                    onClick={handleAddToCart}
                    className="bg-[#4A7729] text-white w-8 h-8 flex items-center justify-center rounded-full shadow-md hover:bg-[#3d6321] transition-transform hover:scale-110 active:scale-95 z-10"
                    title="Agregar al carrito"
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