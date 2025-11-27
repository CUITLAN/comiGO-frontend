'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { FoodCard } from './FoodCard';
import MapExplore from '@/components/client/MapExplore'; 
import { RestaurantItem } from '@/data/restaurantData';
import { FoodItem } from '@/data/foodData';
import { 
  AltArrowLeft, 
  Star, 
  MapPoint, 
  ClockCircle, 
  InfoSquare,
  Letter,
  Phone,
  Global,
  Tag,
  Calendar,
  DollarMinimalistic,
  User,
  Heart 
} from '@solar-icons/react';

interface RestaurantDetailViewProps {
    restaurant: RestaurantItem;
    menu: FoodItem[];
    backLink?: string;
}

export default function RestaurantDetailView({ restaurant, menu, backLink = "/client/user/favorites" }: RestaurantDetailViewProps) {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        if (!isFavorite) {
            toast.success("Agregado a favoritos", {
                description: `${restaurant.name} se ha guardado en tu lista.`,
                duration: 3000,
                style: {
                    background: '#FDF2F8', 
                    border: '1px solid #EC4899',
                    color: '#BE185D'
                }
            });
        }
    };

    return (
        <main className="min-h-screen bg-[#FDFBF7] pb-24 relative">
            
            {/* --- HEADER con Imagen de Fondo --- */}
            <div className="relative w-full h-48 bg-gray-800">
                <Image 
                    src={restaurant.image}
                    alt={restaurant.name}
                    fill
                    className="object-cover opacity-60"
                />
                
                {/* Botón Atrás Dinámico */}
                <Link 
                    href={backLink} 
                    className="absolute top-4 left-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/30 transition-colors z-10"
                >
                    <AltArrowLeft size={24} />
                </Link>

                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#FDFBF7] to-transparent" />
            </div>

            {/* --- CONTENIDO PRINCIPAL --- */}
            <div className="px-6 -mt-12 relative z-10 mb-8">
                
                {/* 1. LOGO, RATING Y FAVORITO */}
                <div className="flex justify-between items-end mb-4">
                    <div className="w-20 h-20 bg-white rounded-full border-4 border-[#FDFBF7] shadow-md relative overflow-hidden">
                        <Image 
                            src={restaurant.logo}
                            alt="Logo"
                            fill
                            className="object-contain p-1"
                        />
                    </div>
                    
                    <div className="flex items-center gap-3 mb-2">
                        {/* Botón Corazón */}
                        <button 
                            onClick={toggleFavorite}
                            className="bg-white p-2 rounded-full shadow-sm border border-gray-100 hover:scale-110 transition-transform"
                        >
                            <Heart 
                                weight={isFavorite ? "Bold" : "Linear"} 
                                className={`w-6 h-6 ${isFavorite ? "text-red-500" : "text-gray-400"}`}
                            />
                        </button>

                        <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl shadow-sm border border-gray-100">
                            <Star className="text-yellow-400 fill-yellow-400" size={18} />
                            <span className="font-bold text-gray-800">{restaurant.rating}</span>
                        </div>
                    </div>
                </div>

                {/* 2. TITULO Y CATEGORÍA */}
                <h1 className="text-2xl font-bold text-[#0C3252] mb-1">{restaurant.name}</h1>
                <p className="text-gray-500 text-sm mb-6">
                    {restaurant.category} • {restaurant.minOrder > 0 ? `Min. $${restaurant.minOrder}` : 'Sin mínimo'}
                </p>

                {/* 3. GALERÍA DE FOTOS */}
                <div className="grid grid-cols-3 gap-2 w-full h-24 mb-6">
                    {restaurant.gallery.map((img, idx) => (
                        <div key={idx} className="relative w-full h-full rounded-lg overflow-hidden bg-gray-100">
                            <Image src={img} alt={`Galeria ${idx}`} fill className="object-cover" />
                        </div>
                    ))}
                </div>

                {/* 4. MAPA DE UBICACIÓN */}
                <div className="w-full h-48 rounded-xl overflow-hidden mb-6 relative border border-gray-200 shadow-sm">
                    {/* Usamos tu componente nativo MapExplore */}
                    <MapExplore 
                        // @ts-ignore: Compatibilidad de tipos menor
                        restaurants={[restaurant]} 
                        centerCoordinates={restaurant.coordinates} 
                    />
                    {/* Overlay de dirección */}
                    <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg border border-gray-200 shadow-sm text-xs flex items-center gap-2 z-10">
                        <MapPoint className="text-[#4A7729]" size={16} />
                        <span className="truncate font-medium text-gray-700">{restaurant.address}</span>
                    </div>
                </div>

                {/* 5. LISTA DE DETALLES */}
                <div className="space-y-3 mb-8 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <InfoRow icon={MapPoint} label="Dirección" value={restaurant.address} />
                    <InfoRow icon={Tag} label="Categoría" value={restaurant.category} />
                    <InfoRow icon={ClockCircle} label="Horario" value={restaurant.hours} />
                    <InfoRow icon={Calendar} label="Días laborales" value={restaurant.days} />
                    <InfoRow icon={DollarMinimalistic} label="Costo promedio" value={restaurant.avgCost} />
                    <InfoRow icon={User} label="Dirigido por" value={restaurant.manager} />
                </div>

                {/* 6. DESCRIPCIÓN */}
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <InfoSquare className="text-[#0C3252]" size={16} />
                        <h3 className="font-bold text-[#0C3252] text-sm">Sobre nosotros</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        {restaurant.description}
                    </p>
                </div>

                {/* 7. REDES SOCIALES */}
                <div className="mb-6 px-2">
                    <h4 className="font-bold text-[#0C3252] mb-2 text-sm">Redes Sociales</h4>
                    <a href="#" className="flex items-center gap-2 text-blue-600 text-sm hover:underline">
                        <Global size={16} />
                        {restaurant.website}
                    </a>
                </div>

                {/* 8. INFORMACIÓN DE CONTACTO */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-10">
                    <h4 className="font-bold text-[#0C3252] mb-3 text-sm">Información de contacto</h4>
                    <div className="flex flex-col gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <Letter size={16} className="text-gray-400" />
                            <span>{restaurant.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone size={16} className="text-gray-400" />
                            <span>{restaurant.phone}</span>
                        </div>
                    </div>
                </div>

                {/* DIVIDER */}
                <div className="relative flex py-2 items-center mb-8">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase tracking-wider font-semibold">Menú Disponible</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* 9. MENÚ / PUBLICACIONES */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-[#0C3252]">Platillos Activos</h2>
                        <span className="bg-[#4A7729] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                            {menu.length}
                        </span>
                    </div>

                    {menu.length > 0 ? (
                        <div className="space-y-4">
                            {menu.map((item) => (
                                <FoodCard key={item.id} item={item} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-400 bg-white rounded-xl border border-dashed border-gray-300">
                            <p>Este restaurante no tiene publicaciones activas hoy 😔</p>
                        </div>
                    )}
                </div>
            </div>

        </main>
    );
}

// Componente auxiliar para las filas de info
function InfoRow({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="flex items-start gap-3">
            <Icon className="text-gray-400 mt-0.5 shrink-0" size={18} />
            <div className="text-sm">
                <span className="font-bold text-gray-700 mr-1">{label}:</span>
                <span className="text-gray-600">{value}</span>
            </div>
        </div>
    );
}