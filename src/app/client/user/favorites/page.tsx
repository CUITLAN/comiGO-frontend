'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Bag, ChefHat, Shop } from '@solar-icons/react'; // Iconos para los filtros
import { dummyFoodData } from '@/data/foodData'; // Reutilizamos datos de comida
import { dummyRestaurantData } from '@/data/restaurantData'; // Nuevos datos de restaurante
import { FoodCard } from '@/components/client/FoodCard';
import { RestaurantCard } from '@/components/client/RestaurantCard';

type FilterType = 'food' | 'restaurant';

export default function FavoritesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('food');

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] pb-24">
      
      <div className="sticky top-0 z-30 bg-[#EBEBEB] px-6 py-3 flex justify-between items-center shadow-sm">
        <h1 className="text-lg font-bold text-[#0C3252] tracking-wide uppercase">Tus Favoritos</h1>
        <button className="text-black hover:text-[#529A60]">
            <Bag className="w-6 h-6" />
        </button>
      </div>

      <div className="p-4 space-y-6">
        
        <div className="relative w-full h-32 rounded-2xl overflow-hidden shadow-md group">
            <Image
                src="/Fonda2.png"
                alt="Banner"
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center px-6 text-center">
                <h2 className="text-white font-bold text-lg leading-snug drop-shadow-md">
                    Realmente estas ayudando a 3 areas a la vez
                </h2>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#529A60]" />
        </div>

        <div className="space-y-2">
            <h3 className="font-bold text-gray-800 text-sm">Tipo de favoritos</h3>
            <div className="flex gap-4">
                
                <button
                    onClick={() => setActiveFilter('food')}
                    className={`
                        flex-1 flex flex-col items-center justify-center gap-2 py-4 rounded-xl border-2 transition-all duration-200
                        ${activeFilter === 'food' 
                            ? 'bg-white border-[#529A60] shadow-md' 
                            : 'bg-gray-100 border-transparent hover:bg-gray-200'
                        }
                    `}
                >
                    <div className={`p-2 rounded-full ${activeFilter === 'food' ? 'bg-[#529A60] text-white' : 'bg-gray-300 text-gray-500'}`}>
                        <ChefHat className="w-6 h-6" />
                    </div>
                    <span className={`text-sm font-bold ${activeFilter === 'food' ? 'text-[#529A60]' : 'text-gray-500'}`}>
                        Comida
                    </span>
                </button>

                <button
                    onClick={() => setActiveFilter('restaurant')}
                    className={`
                        flex-1 flex flex-col items-center justify-center gap-2 py-4 rounded-xl border-2 transition-all duration-200
                        ${activeFilter === 'restaurant' 
                            ? 'bg-white border-[#529A60] shadow-md' 
                            : 'bg-gray-100 border-transparent hover:bg-gray-200'
                        }
                    `}
                >
                    <div className={`p-2 rounded-full ${activeFilter === 'restaurant' ? 'bg-[#529A60] text-white' : 'bg-gray-300 text-gray-500'}`}>
                        <Shop className="w-6 h-6" />
                    </div>
                    <span className={`text-sm font-bold ${activeFilter === 'restaurant' ? 'text-[#529A60]' : 'text-gray-500'}`}>
                        Restaurante
                    </span>
                </button>

            </div>
        </div>

        <div className="space-y-4 min-h-[300px]">
            {activeFilter === 'food' ? (
                dummyFoodData.slice(0, 2).map((item) => (
                    <FoodCard key={item.id} item={item} />
                ))
            ) : (
                dummyRestaurantData.map((item) => (
                    <RestaurantCard key={item.id} item={item} />
                ))
            )}
            
            <div className="pt-8 text-center">
                <p className="text-xs text-gray-400">
                    Estos son todos tus {activeFilter === 'food' ? 'platillos' : 'restaurantes'} favoritos por ahora.
                </p>
            </div>
        </div>

      </div>
    </div>
  );
}