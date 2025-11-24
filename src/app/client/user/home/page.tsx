'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Magnifer, Bag } from '@solar-icons/react';
import { dummyFoodData } from '@/data/foodData';
import { FoodCard } from '@/components/client/FoodCard';
import { CategoryList } from '@/components/client/CategoryList';

export default function ClientHomePage() {
  // 1. ESTADO PARA FILTROS
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 2. LÓGICA DE FILTRADO
  const filteredFood = useMemo(() => {
    return dummyFoodData.filter((item) => {
      // Filtro por texto (nombre o restaurante)
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.restaurantName.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filtro por categoría
      const matchesCategory = selectedCategory 
        ? item.category === selectedCategory 
        : true;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] pb-24">
      
      {/* HEADER */}
      <div className="sticky top-0 z-30 bg-[#EBEBEB] px-6 py-3 flex justify-between items-center shadow-sm">
        <h1 className="text-lg font-bold text-[#0C3252] tracking-wide">INICIO</h1>
        <button className="text-black hover:text-[#529A60]">
            <Bag className="w-6 h-6" />
        </button>
      </div>

      <div className="p-4 space-y-6">
        
        {/* BANNER HERO */}
        <div className="relative w-full h-40 rounded-2xl overflow-hidden shadow-md group">
            <Image
                src="/Login.png"
                alt="Banner"
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center px-6">
                <h2 className="text-white font-bold text-xl max-w-[200px] leading-snug drop-shadow-md relative z-10">
                    Descubre comida mientras salvas al planeta
                </h2>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#529A60] z-20" />
        </div>

        {/* BARRA DE BÚSQUEDA */}
        <div className="relative">
            <input 
                type="text" 
                placeholder="Buscar restaurante o comida"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F5F5F5] border border-gray-200 text-gray-700 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#529A60]/20 transition-all placeholder:text-gray-400"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                <Magnifer className="text-black w-5 h-5" />
            </div>
        </div>

        {/* --- AQUÍ ESTABA EL ERROR --- */}
        {/* Debes pasarle las props 'selectedCategory' y 'onSelectCategory' */}
        <CategoryList 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
        />

        {/* FEED DE COMIDA */}
        <div className="space-y-4">
            {filteredFood.length > 0 ? (
                filteredFood.map((item) => (
                    <FoodCard key={item.id} item={item} />
                ))
            ) : (
                <div className="text-center py-10 text-gray-400">
                    <p>No encontramos resultados para tu búsqueda 😔</p>
                    <button 
                        onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}
                        className="text-[#529A60] text-sm mt-2 hover:underline"
                    >
                        Limpiar filtros
                    </button>
                </div>
            )}
        </div>

      </div>
    </div>
  );
}