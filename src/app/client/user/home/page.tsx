'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Magnifer, Bag } from '@solar-icons/react';
import { FoodCard } from '@/components/client/FoodCard';
import { CategoryList } from '@/components/client/CategoryList';
import { useClientFeedStore } from '@/store/useClientFeedStore';
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';

export default function ClientHomePage() {
  // Estados Locales de UI
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 1. Store del Feed (Datos Reales)
  const { products, isLoading, fetchAllProducts } = useClientFeedStore();
  
  // 2. Store del Carrito (Para el badge en el header)
  const totalItems = useCartStore((state) => state.getTotalItems());

  // Cargar productos al montar
  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  // Lógica de Filtrado
  const filteredFood = useMemo(() => {
    return products.filter((item) => {
      const restaurantName = item.restaurant?.name || '';
      
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurantName.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory 
        ? item.category === selectedCategory 
        : true;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, products]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] pb-24">
      
      {/* HEADER FIJO */}
      <div className="sticky top-0 z-30 bg-[#EBEBEB] px-6 py-3 flex justify-between items-center shadow-sm">
        <h1 className="text-lg font-bold text-[#0C3252] tracking-wide">INICIO</h1>
        
        {/* Botón Carrito con Badge */}
        <Link href="/client/home/cart" className="relative text-black hover:text-[#529A60] transition-colors">
            <Bag className="w-6 h-6" />
            {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-in zoom-in">
                    {totalItems}
                </span>
            )}
        </Link>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Banner Promocional */}
        <div className="relative w-full h-40 rounded-2xl overflow-hidden shadow-md group">
            <Image
                src="/Login.png" // Asegúrate de tener esta imagen en public
                alt="Banner promocional" 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center px-6">
                <h2 className="text-white font-bold text-xl max-w-[220px] leading-snug drop-shadow-md relative z-10">
                    Descubre comida deliciosa mientras salvas al planeta 🌎
                </h2>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#529A60] z-20" />
        </div>

        {/* Barra de Búsqueda */}
        <div className="relative">
            <input 
                type="text" 
                placeholder="¿Qué se te antoja hoy?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 text-gray-700 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#529A60]/30 focus:border-[#529A60] transition-all placeholder:text-gray-400 shadow-sm"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none text-gray-400">
                <Magnifer className="w-5 h-5" />
            </div>
        </div>

        {/* Categorías (Componente existente) */}
        <CategoryList 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
        />

        {/* Lista de Productos */}
        <div className="space-y-4 min-h-[300px]">
            {isLoading ? (
                // SKELETON LOADING
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="w-full h-32 bg-gray-200 rounded-xl animate-pulse" />
                    ))}
                </div>
            ) : filteredFood.length > 0 ? (
                filteredFood.map((item) => (
                    <FoodCard key={item.id} item={item} />
                ))
            ) : (
                // EMPTY STATE
                <div className="text-center py-12 text-gray-400">
                    <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Magnifer className="w-8 h-8 opacity-50" />
                    </div>
                    <p className="font-medium">No encontramos resultados 😔</p>
                    <p className="text-sm mt-1 mb-4">Intenta con otra categoría o búsqueda.</p>
                    <button 
                        onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}
                        className="text-[#529A60] text-sm font-bold hover:underline"
                    >
                        Ver todo el menú
                    </button>
                </div>
            )}
        </div>

      </div>
    </div>
  );
}