'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
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
  Global, // Icono correcto
  Letter, 
  Phone,
  Star,
  Bag,
  ChefHat,
  TrashBinMinimalistic,
  KeySquare,
  DangerCircle,
  CheckCircle
} from '@solar-icons/react';

interface FoodDetailViewProps {
    data: FoodItem;
    actionType?: 'reserve' | 'remove' | 'order'; 
    // Props específicas para el modo 'order'
    orderStatus?: 'Pendiente' | 'Listo para recoger' | 'Entregado' | 'Cancelado';
    accessCode?: string;
    cancellationReason?: string;
}

export default function FoodDetailView({ 
    data, 
    actionType = 'reserve', 
    orderStatus,
    accessCode,
    cancellationReason
}: FoodDetailViewProps) {
    const router = useRouter();
    const [userRating, setUserRating] = useState(0); 

    const handleAction = () => {
        if (actionType === 'reserve') {
            toast.success(`Platillo "${data.name}" reservado`, {
                description: "Tu pedido ha sido confirmado exitosamente.",
                duration: 3000,
                style: { background: '#F0FDF4', border: '1px solid #4A7729', color: '#15803d' }
            });
        } else if (actionType === 'remove') {
            toast.success("Comida eliminada", {
                description: `Has eliminado "${data.name}" de tu carrito.`,
                duration: 2000,
                style: { background: '#FEF2F2', border: '1px solid #EF4444', color: '#B91C1C' }
            });
            router.push('/client/user/cart');
        }
    };

    const handleRate = (rating: number) => {
        setUserRating(rating);
        toast.success("Calificación guardada", {
            description: `Has calificado con ${rating} estrellas. ¡Gracias!`,
            duration: 3000,
            style: { background: '#FEFCE8', border: '1px solid #EAB308', color: '#854D0E' }
        });
    };

    const restaurantForMap = {
        ...data.restaurant,
        id: `rest-${data.id}`,
    };

    // Configuración dinámica
    const isOrderMode = actionType === 'order';
    const isRemoveMode = actionType === 'remove';
    
    let backLink = "/client/user/home";
    if (isRemoveMode) backLink = "/client/user/cart";
    if (isOrderMode) backLink = "/client/user/orders";

    let headerTitle = "Detalle del pedido";
    if (isRemoveMode) headerTitle = "Editar Carrito";
    if (isOrderMode) headerTitle = "Tu Pedido";

    // --- RENDERIZADO CONDICIONAL DEL FOOTER ---
    const renderFooterContent = () => {
        if (isOrderMode && orderStatus) {
            switch (orderStatus) {
                case 'Listo para recoger':
                    return (
                        <div className="w-full max-w-md bg-[#EAF2FF] border-2 border-[#008BD8] rounded-xl p-4 flex flex-col items-center justify-center shadow-sm animate-in fade-in slide-in-from-bottom-4">
                            <p className="text-xs text-[#008BD8] font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                                <KeySquare size={14} /> Tu Código de Acceso
                            </p>
                            <p className="text-4xl font-black text-[#0C3252] tracking-[0.2em]">
                                {accessCode}
                            </p>
                            <p className="text-[10px] text-gray-500 mt-2 text-center">
                                Muestra este código al llegar al restaurante
                            </p>
                        </div>
                    );
                
                case 'Cancelado':
                    return (
                        <div className="w-full max-w-md bg-[#FEF2F2] border-2 border-red-200 rounded-xl p-4 flex items-start gap-3 shadow-sm">
                            <div className="bg-red-100 p-2 rounded-full text-red-500 shrink-0">
                                <DangerCircle size={24} />
                            </div>
                            <div>
                                <p className="text-red-800 font-bold text-sm uppercase mb-1">Pedido Cancelado</p>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {cancellationReason || "El restaurante no pudo procesar tu pedido."}
                                </p>
                            </div>
                        </div>
                    );

                case 'Entregado':
                    return (
                        <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center shadow-sm">
                            <p className="text-sm font-bold text-[#0C3252] mb-3 flex items-center gap-2">
                                <CheckCircle className="text-[#4A7729]" />
                                ¿Qué tal estuvo tu comida?
                            </p>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button 
                                        key={star}
                                        onClick={() => handleRate(star)}
                                        className="transition-transform hover:scale-110 focus:outline-none"
                                    >
                                        <Star 
                                            size={32} 
                                            weight={star <= userRating ? "Bold" : "Linear"}
                                            className={star <= userRating ? "text-yellow-400" : "text-gray-300"}
                                        />
                                    </button>
                                ))}
                            </div>
                            <p className="text-[10px] text-gray-400 mt-2">Toca una estrella para calificar</p>
                        </div>
                    );

                case 'Pendiente':
                default:
                    return (
                        <div className="w-full max-w-md bg-orange-50 border-2 border-orange-200 rounded-xl p-4 flex items-center justify-center gap-3 shadow-sm">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-500"></div>
                            <p className="text-sm font-bold text-orange-700">
                                Tu pedido se está preparando...
                            </p>
                        </div>
                    );
            }
        }

        // CASO 2: MODO RESERVAR / ELIMINAR
        const buttonText = isRemoveMode ? "Eliminar del carrito" : "Reservar Ahora";
        const buttonColorClass = isRemoveMode 
            ? "bg-red-500 hover:bg-red-600 text-white" 
            : "bg-[#4A7729] hover:bg-[#3d6321] text-white";

        return (
            <div className="w-full flex justify-between items-center">
                <div className="flex flex-col md:hidden">
                    <span className="text-xs text-gray-500">Total a pagar</span>
                    <span className="font-bold text-xl text-[#0C3252]">${data.price}</span>
                </div>
                
                <button 
                    onClick={handleAction}
                    className={`${buttonColorClass} font-bold px-8 py-4 rounded-xl text-lg shadow-lg w-1/2 md:w-auto transition-transform active:scale-95 flex items-center justify-center gap-2`}
                >
                    {isRemoveMode && <TrashBinMinimalistic size={20} />}
                    {buttonText}
                </button>
            </div>
        );
    };

    return (
        <main className="min-h-screen bg-gray-50 pb-64 relative"> 
            
            {/* HEADER */}
            <div className="fixed top-0 left-0 w-full h-16 bg-white/80 backdrop-blur-md z-50 flex items-center px-4 border-b border-gray-100">
                <Link 
                    href={backLink}
                    className="text-gray-700 hover:bg-gray-100 rounded-full p-2 transition-colors flex items-center justify-center"
                >
                    <AltArrowLeft size={24} />
                </Link>
                <span className="ml-2 font-bold text-gray-800 text-lg truncate">
                    {headerTitle}
                </span>
            </div>

            <div className="h-16" />

            <div className="max-w-2xl mx-auto px-4 pt-6">
                
                {/* SECCIÓN COMIDA */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-8">
                    <div className="relative w-full h-56 rounded-xl overflow-hidden mb-4 bg-gray-200">
                        <Image src={data.image} alt={data.name} fill className="object-cover" />
                        <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-[#0C3252] shadow-sm flex items-center gap-1">
                            <Star size={12} className="text-yellow-400 fill-yellow-400" />
                            {data.rating}.0
                        </div>
                    </div>

                    <div className="flex justify-between items-start mb-2">
                        <h1 className="text-2xl font-bold text-[#0C3252] leading-tight w-3/4">{data.name}</h1>
                        <span className="text-2xl font-bold text-[#4A7729]">${data.price}</span>
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

                    <div className="text-gray-600 text-sm leading-relaxed">
                        <p>{data.description}</p>
                    </div>
                </div>

                {/* SECCIÓN RESTAURANTE */}
                <div className="relative flex py-2 items-center mb-8">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase tracking-wider font-semibold">Información del Restaurante</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                    <div className="flex flex-col items-center mb-6">
                        <div className="bg-orange-50 text-[#0C3252] font-bold px-6 py-2 rounded-full text-lg mb-6">
                            {data.restaurant.name}
                        </div>
                        
                        {/* Galería de imágenes del restaurante */}
                        <div className="grid grid-cols-3 gap-2 w-full h-24 mb-6">
                            {data.restaurant.gallery.map((img, idx) => (
                                <div key={idx} className="relative w-full h-full rounded-lg overflow-hidden bg-gray-100">
                                    <Image src={img} alt={`Galeria ${idx}`} fill className="object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

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
                        <InfoRow icon={Tag} label="Categoría" value={data.restaurant.category} />
                        <InfoRow icon={ClockCircle} label="Horario" value={data.restaurant.hours} />
                        <InfoRow icon={Calendar} label="Días" value={data.restaurant.days} />
                        <InfoRow icon={DollarMinimalistic} label="Costo" value={data.restaurant.avgCost} />
                        <InfoRow icon={User} label="Gerente" value={data.restaurant.manager} />
                    </div>

                    {/* Redes Sociales - FIX: Usamos Globe en lugar de Global */}
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

            {/* --- BOTTOM BAR (Dinámico según estado) --- */}
            <div className="fixed bottom-16 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40 flex items-center justify-center md:gap-8 min-h-[100px]">
                {renderFooterContent()}
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