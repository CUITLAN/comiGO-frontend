'use client';

import Image from 'next/image';
import Link from 'next/link'; 
import { ClientOrder } from '@/store/useMyOrdersStore';
import { User, ClockCircle, AltArrowRight } from '@solar-icons/react';

interface OrderCardProps {
  item: ClientOrder;
}

export function OrderCard({ item }: OrderCardProps) {
  
  // Lógica de estilos según estado
  let statusColor = 'text-orange-600 bg-orange-50 border-orange-100'; // Pendiente (Default)
  
  switch (item.status) {
      case 'Listo para recoger':
          statusColor = 'text-green-600 bg-green-50 border-green-100';
          break;
      case 'Entregado':
          statusColor = 'text-gray-600 bg-gray-100 border-gray-200';
          break;
      case 'Cancelado':
          statusColor = 'text-red-600 bg-red-50 border-red-100';
          break;
  }

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all group overflow-hidden">
      
      {/* Enlace al detalle del pedido */}
      <Link href={`/client/user/orders/${item.id}`} className="flex p-3 gap-3 w-full h-full">
        
        {/* Imagen */}
        <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-between py-0.5">
          
          <div>
            <div className="flex justify-between items-start">
                <h3 className="font-bold text-[#0C3252] text-base leading-tight line-clamp-1 w-full">
                {item.name}
                </h3>
                <AltArrowRight className="text-gray-300 w-5 h-5 group-hover:text-[#4A7729] transition-colors" />
            </div>
            
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                <User className="w-3 h-3" />
                <span className="truncate max-w-[140px]">{item.restaurant.name}</span>
            </div>
          </div>

          <div className="flex items-end justify-between mt-2">
            <span className={`text-[10px] font-bold px-2 py-1 rounded-md border ${statusColor}`}>
                {item.status}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-400">
                <ClockCircle className="w-3 h-3" />
                <span>{item.orderDate}</span>
            </div>
          </div>

        </div>
      </Link>
    </div>
  );
}