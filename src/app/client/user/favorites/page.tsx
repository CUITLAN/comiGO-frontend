'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bag, ChefHat, Shop, Magnifer } from '@solar-icons/react';
import { FoodCard } from '@/components/client/FoodCard';
import { useClientFeedStore } from '@/store/useClientFeedStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useCartStore } from '@/store/useCartStore';

type FilterType = 'food' | 'restaurant';

export default function FavoritesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('food');
  
  // 1. Stores de Datos
  const { products, fetchAllProducts, isLoading } = useClientFeedStore();
  const { favoriteIds } = useFavoritesStore();
  const totalCartItems = useCartStore((state) => state.getTotalItems());

  // Cargar datos si no existen (por si entra directo a favoritos)
  useEffect(() => {
    if (products.length === 0) {
        fetchAllProducts();
    }
  }, [products.length, fetchAllProducts]);

  // 2. Filtrar Comida Favorita
  const favoriteFoodItems = useMemo(() => {
    return products.filter(item => favoriteIds.includes(item.id));
  }, [products, favoriteIds]);

  // 3. Derivar Restaurantes Favoritos (Basado en la comida favorita)
  // Truco: Si te gusta la comida, te mostramos el restaurante aquí
  const favoriteRestaurants = useMemo(() => {
    const uniqueRestaurants = new Map();
    favoriteFoodItems.forEach(item => {
        if (!uniqueRestaurants.has(item.restaurant.id)) {
            uniqueRestaurants.set(item.restaurant.id, item.restaurant);
        }
    });
    return Array.from(uniqueRestaurants.values());
  }, [favoriteFoodItems]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] pb-24">
      
      {/* HEADER */}
      <div className="sticky top-0 z-30 bg-[#EBEBEB] px-6 py-3 flex justify-between items-center shadow-sm">
        <h1 className="text-lg font-bold text-[#0C3252] tracking-wide uppercase">Tus Favoritos</h1>
        
        <Link href="/client/cart" className="relative text-black hover:text-[#529A60] transition-colors">
            <Bag className="w-6 h-6" />
            {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-in zoom-in">
                    {totalCartItems}
                </span>
            )}
        </Link>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Banner Motivacional */}
        <div className="relative w-full h-32 rounded-2xl overflow-hidden shadow-md group">
            <Image
                src="/Fonda2.png" // Asegúrate que esta imagen exista en public
                alt="Banner Favoritos"
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center px-6 text-center">
                <h2 className="text-white font-bold text-lg leading-snug drop-shadow-md">
                    Tu colección personal de sabores sustentables 🌱
                </h2>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#529A60]" />
        </div>

        {/* Filtros (Tabs) */}
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
                        Comida ({favoriteFoodItems.length})
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
                        Restaurantes ({favoriteRestaurants.length})
                    </span>
                </button>

            </div>
        </div>

        {/* Lista de Resultados */}
        <div className="space-y-4 min-h-[300px]">
            {isLoading ? (
                 <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#529A60]"></div>
                 </div>
            ) : activeFilter === 'food' ? (
                // LISTA DE COMIDA
                favoriteFoodItems.length > 0 ? (
                    favoriteFoodItems.map((item) => (
                        <FoodCard key={item.id} item={item} />
                    ))
                ) : (
                    <EmptyState message="Aún no tienes platillos favoritos." />
                )
            ) : (
                // LISTA DE RESTAURANTES (Derivada)
                favoriteRestaurants.length > 0 ? (
                    favoriteRestaurants.map((rest) => (
                        <div key={rest.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden flex-shrink-0 relative">
                                {rest.logo ? (
                                    <Image src={rest.logo} alt={rest.name} fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-orange-100 text-orange-500">
                                        <Shop size={24} />
                                    </div>
                                )}
                            </div>
                            <div>
                                <h4 className="font-bold text-[#0C3252]">{rest.name}</h4>
                                <p className="text-xs text-gray-500">Restaurante destacado</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <EmptyState message="Aún no sigues a ningún restaurante." />
                )
            )}
            
            {!isLoading && (favoriteFoodItems.length > 0 || favoriteRestaurants.length > 0) && (
                <div className="pt-8 text-center pb-10">
                    <p className="text-xs text-gray-400">
                        Estos son todos tus {activeFilter === 'food' ? 'platillos' : 'restaurantes'} favoritos por ahora.
                    </p>
                </div>
            )}
        </div>

      </div>
    </div>
  );
}

// Componente auxiliar para estado vacío
function EmptyState({ message }: { message: string }) {
    return (
        <div className="text-center py-12 text-gray-400 flex flex-col items-center">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                <Magnifer className="w-8 h-8 opacity-50" />
            </div>
            <p className="font-medium">{message}</p>
            <Link href="/client/home" className="text-[#529A60] text-sm mt-4 font-bold hover:underline">
                Explorar menú
            </Link>
        </div>
    );
}