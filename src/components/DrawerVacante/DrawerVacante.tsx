'use client';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Bag,            
  Tag,            
  ClockCircle,    
  DollarMinimalistic, 
  MapPoint,       
  Layers,         
  Sale,           
  InfoSquare,
  Calendar
} from '@solar-icons/react';
import { Vacancy } from '@/interfaces/vacancy';
import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import Image from 'next/image';

const stateLabel: Record<string, string> = {
  Activo: 'Aprobado / Activo',
  EnRevisión: 'En Revisión',
  Cerrado: 'Cerrado',
  Rechazado: 'Rechazado',
  Agotada: 'Agotada',
};

const stateVariant = (state: string) => {
  switch (state) {
    case 'Activo': return 'success';
    case 'EnRevisión': return 'warning';
    case 'Rechazado': return 'danger';
    case 'Agotada': return 'secondary';
    default: return 'outline';
  }
};

const formatDate = (d?: string | Date) => {
  if (!d) return '—';
  const date = new Date(d);
  return date.toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const formatMoney = (amount: number) => 
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);

function InfoRow({
  icon: Icon,
  label,
  value,
  highlight = false
}: {
  icon: React.ElementType;
  label: string;
  value?: string | number | null;
  highlight?: boolean;
}) {
  if (value === undefined || value === null || value === '') return null;
  return (
    <div className={`flex items-center gap-3 p-2 rounded-lg ${highlight ? 'bg-green-50 border border-green-100' : 'bg-transparent'}`}>
      <div className={`p-2 rounded-full ${highlight ? 'bg-white text-[#4A7729]' : 'bg-gray-100 text-gray-500'}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
        <p className={`text-sm font-semibold ${highlight ? 'text-[#4A7729] text-base' : 'text-gray-700'}`}>
            {value}
        </p>
      </div>
    </div>
  );
}

type DrawerVacanteProps = {
  vacante: Vacancy;
};

export default function DrawerVacante({ vacante }: DrawerVacanteProps) {
  const {
    productName,
    foodType,
    category,
    branch,
    portions,
    description,
    price,
    elaborationDate,
    pickupStartTime,
    pickupEndTime,
    deadlineDate,
    finalOffer,
    state,
    createdAt,
    productImage
  } = vacante;

  return (
    <DrawerContent className="flex !w-[500px] !max-w-full flex-col gap-0 h-full max-h-screen rounded-l-2xl rounded-r-none focus:outline-none ml-auto z-[100]">
      
      {/* --- HEADER --- */}
      <DrawerHeader className="border-b border-gray-100 px-8 py-6 bg-white">
        <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between">
                <Badge variant={stateVariant(state)} className="mb-2 w-fit">
                    {stateLabel[state] || state}
                </Badge>
                <span className="text-xs text-gray-400">
                    Publicado: {formatDate(createdAt)}
                </span>
            </div>
            
            <DrawerTitle className="text-2xl leading-tight font-bold text-[#0C3252]">
            {productName}
            </DrawerTitle>
            
            <DrawerDescription className="text-sm text-gray-500 flex items-center gap-1">
                <MapPoint size={14} />
                {branch}
            </DrawerDescription>
        </div>
      </DrawerHeader>

      {/* --- BODY --- */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-[#FAFAFA]">
        
        {/* Imagen */}
        <div className="w-full h-48 rounded-xl overflow-hidden bg-gray-200 border border-gray-200 relative shadow-sm">
            {productImage ? (
                <Image src={productImage} alt={productName} fill className="object-cover" />
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <Bag size={48} className="opacity-20 mb-2" />
                    <span className="text-xs uppercase font-bold opacity-40">Sin imagen</span>
                </div>
            )}
            
            {/* Badge de Oferta Final */}
            {finalOffer && (
                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <Sale size={12} /> Oferta Final
                </div>
            )}
        </div>

        {/* Información Principal (Grid) */}
        <section className="grid grid-cols-2 gap-4">
            <InfoRow 
                icon={DollarMinimalistic} 
                label="Precio" 
                value={formatMoney(price)} 
                highlight={true}
            />
            <InfoRow 
                icon={Layers} 
                label="Porciones" 
                value={portions} 
            />
            <InfoRow 
                icon={Bag} 
                label="Tipo" 
                value={foodType} 
            />
            <InfoRow 
                icon={Tag} 
                label="Categoría" 
                value={category} 
            />
        </section>

        <Separator className="bg-gray-200" />

        {/* Fechas y Horarios */}
        <section className="space-y-4">
            <h4 className="text-sm font-bold text-[#0C3252] uppercase flex items-center gap-2">
                <ClockCircle size={16} className="text-[#4A7729]" />
                Tiempos de Recogida y Fechas
            </h4>
            
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                    <span className="text-sm text-gray-600">Horario de recogida</span>
                    <span className="font-bold text-[#0C3252] bg-blue-50 px-2 py-1 rounded text-sm">
                        {pickupStartTime} - {pickupEndTime}
                    </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                    <span className="text-sm text-gray-600">Fecha Límite</span>
                    <span className="text-sm font-medium text-gray-800">{formatDate(deadlineDate)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Elaboración</span>
                    <span className="text-sm font-medium text-gray-800">{formatDate(elaborationDate)}</span>
                </div>
            </div>
        </section>

        {/* Descripción */}
        <section className="space-y-2">
             <h4 className="text-sm font-bold text-[#0C3252] uppercase flex items-center gap-2">
                <InfoSquare size={16} className="text-[#4A7729]" />
                Descripción
            </h4>
            <div className="bg-white p-4 rounded-xl border border-gray-100 text-gray-600 text-sm leading-relaxed">
                {description || "No hay descripción disponible."}
            </div>
        </section>

      </div>
    </DrawerContent>
  );
}