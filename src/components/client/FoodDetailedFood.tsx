'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Importamos router para redirigir al eliminar
import { toast } from 'sonner'; 
import MapExplore from '@/components/client/MapExplore'; 
import { FoodItem } from '@/data/foodData';
import { 
  AltArrowLeft, 
  MapPoint, 
  Tag, 
  ClockCircle, 
  Calendar, 
  DollarMinimalistic, 
  User, 
  Global, 
  Letter, 
  Phone,
  Star,
  Bag,
  ChefHat,
  TrashBinMinimalistic // Icono para eliminar
} from '@solar-icons/react';

interface FoodDetailViewProps {
    data: FoodItem;
    // Nueva prop para definir el comportamiento del botón
    actionType?: 'reserve' | 'remove'; 
}

export default function FoodDetailView({ data, actionType = 'reserve' }: FoodDetailViewProps) {
    const router = useRouter();

    const handleAction = () => {
        if (actionType === 'reserve') {
            // Lógica de Reservar (Home)
            toast.success(`Platillo "${data.name}" reservado`, {
                description: "Tu pedido ha sido confirmado exitosamente.",
                duration: 3000,
                style: {
                    background: '#F0FDF4', 
                    border: '1px solid #4A7729',
                    color: '#15803d'
                }
            });
        } else {
            // Lógica de Eliminar (Carrito)
            toast.success("Comida eliminada", {
                description: `Has eliminado "${data.name}" de tu carrito.`,
                duration: 2000,
                style: {
                    background: '#FEF2F2', 
                    border: '1px solid #EF4444',
                    color: '#B91C1C'
                }
            });
            // Redirigimos al carrito después de "eliminar"
            router.push('/client/user/cart');
        }
    };

    const restaurantForMap = {
        ...data.restaurant,
        id: `rest-${data.id}`,
    };

    // Configuración dinámica del botón según el modo
    const isRemoveMode = actionType === 'remove';
    const buttonText = isRemoveMode ? "Eliminar del carrito" : "Reservar Ahora";
    const buttonColorClass = isRemoveMode 
        ? "bg-red-500 hover:bg-red-600 text-white" 
        : "bg-[#4A7729] hover:bg-[#3d6321] text-white";

    // Link de regreso dinámico
    const backLink = isRemoveMode ? "/client/user/cart" : "/client/user/home";

    return (
        <main className="min-h-screen bg-gray-50 pb-40 relative">
            
            {/* HEADER DE NAVEGACIÓN */}
            <div className="fixed top-0 left-0 w-full h-16 bg-white/80 backdrop-blur-md z-50 flex items-center px-4 border-b border-gray-100">
                <Link href={backLink}>
                    <button className="text-gray-700 hover:bg-gray-100 rounded-full p-2 transition-colors">
                        <AltArrowLeft size={24} />
                    </button>
                </Link>
                <span className="ml-2 font-bold text-gray-800 text-lg truncate">
                    {isRemoveMode ? "Editar Carrito" : "Detalle del pedido"}
                </span>
            </div>

            <div className="h-16" />

            <div className="max-w-2xl mx-auto px-4 pt-6">
                
                {/* 1. SECCIÓN COMIDA */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-8">
                    <div className="relative w-full h-56 rounded-xl overflow-hidden mb-4 bg-gray-200">
                        <Image 
                            src={data.image} 
                            alt={data.name} 
                            fill 
                            className="object-cover"
                        />
                        <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-[#0C3252] shadow-sm flex items-center gap-1">
                            <Star size={12} className="text-yellow-400 fill-yellow-400" />
                            {data.rating}.0
                        </div>
                    </div>

                    <div className="flex justify-between items-start mb-2">
                        <h1 className="text-2xl font-bold text-[#0C3252] leading-tight w-3/4">
                            {data.name}
                        </h1>
                        <span className="text-2xl font-bold text-[#4A7729]">
                            ${data.price}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                            <ClockCircle size={12} /> Recoger: {data.pickupTime}
                        </span>
                        <span className="bg-green-50 text-green-600 px-3 py-1 rounded-lg text-xs font-bold">
                            {data.portions} Porciones
                        </span>
                        <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                            <Bag size={12} /> {data.type}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-2">
                            <ChefHat className="text-gray-400" size={18} />
                            <div>
                                <p className="text-[10px] text-gray-400 uppercase font-bold">Cocinado</p>
                                <p className="text-sm font-medium text-gray-700">{data.cookedDate}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Tag className="text-gray-400" size={18} />
                            <div>
                                <p className="text-[10px] text-gray-400 uppercase font-bold">Categoría</p>
                                <p className="text-sm font-medium text-gray-700">{data.category}</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-gray-600 text-sm leading-relaxed">
                        <p>{data.description}</p>
                    </div>
                </div>

                <div className="relative flex py-2 items-center mb-8">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase tracking-wider font-semibold">Información del Restaurante</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* 2. SECCIÓN RESTAURANTE */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                    
                    <div className="flex flex-col items-center mb-6">
                        <div className="bg-orange-50 text-[#0C3252] font-bold px-6 py-2 rounded-full text-lg mb-6">
                            {data.restaurant.name}
                        </div>

                        <div className="grid grid-cols-3 gap-2 w-full h-24 mb-6">
                            {data.restaurant.gallery.map((img, idx) => (
                                <div key={idx} className="relative w-full h-full rounded-lg overflow-hidden bg-gray-100">
                                    <Image src={img} alt={`Galeria ${idx}`} fill className="object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* MAPA */}
                    <div className="w-full h-48 rounded-xl overflow-hidden mb-6 relative border border-gray-200">
                        <MapExplore 
                            restaurants={[restaurantForMap]} 
                            centerCoordinates={data.restaurant.coordinates} 
                        />
                        <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg border border-gray-200 shadow-sm text-xs flex items-center gap-2 z-10">
                            <MapPoint className="text-[#4A7729]" size={16} />
                            <span className="truncate font-medium text-gray-700">{data.restaurant.address}</span>
                        </div>
                    </div>

                    <div className="space-y-3 mb-6">
                        <InfoRow icon={MapPoint} label="Dirección" value={data.restaurant.address} />
                        <InfoRow icon={Tag} label="Categoría" value={data.restaurant.category} />
                        <InfoRow icon={ClockCircle} label="Horario" value={data.restaurant.hours} />
                        <InfoRow icon={Calendar} label="Días laborales" value={data.restaurant.days} />
                        <InfoRow icon={DollarMinimalistic} label="Costo promedio" value={data.restaurant.avgCost} />
                        <InfoRow icon={User} label="Dirigido por" value={data.restaurant.manager} />
                    </div>

                    <div className="mb-6">
                        <h4 className="font-bold text-[#0C3252] mb-2">Descripción</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {data.restaurant.description}
                        </p>
                    </div>

                    <div className="mb-6">
                        <h4 className="font-bold text-[#0C3252] mb-2">Redes Sociales</h4>
                        <a href="#" className="flex items-center gap-2 text-blue-600 text-sm hover:underline">
                            <Global size={16} />
                            {data.restaurant.website}
                        </a>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <h4 className="font-bold text-[#0C3252] mb-3 text-sm">Información de contacto</h4>
                        <div className="flex flex-col sm:flex-row justify-between gap-3 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <Letter size={16} className="text-gray-400" />
                                <span>{data.restaurant.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={16} className="text-gray-400" />
                                <span>{data.restaurant.phone}</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            {/* BOTTOM ACTION BAR */}
            <div className="fixed bottom-16 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40 flex items-center justify-between px-6 md:justify-center md:gap-8">
                <div className="flex flex-col md:hidden">
                    <span className="text-xs text-gray-500">Total a pagar</span>
                    <span className="font-bold text-xl text-[#0C3252]">${data.price}</span>
                </div>
                
                <button 
                    onClick={handleAction}
                    className={`${buttonColorClass} font-bold px-8 py-4 rounded-xl text-lg shadow-lg w-6/7 md:w-auto transition-transform active:scale-95 flex items-center justify-center gap-2`}
                >
                    {isRemoveMode && <TrashBinMinimalistic size={20} />}
                    {buttonText}
                </button>
            </div>

        </main>
    );
}

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