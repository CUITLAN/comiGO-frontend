'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { InfoCard } from '../settings/InfoCard';
import { 
  Shop,           
  PenNewSquare,   
  UserCircle      
} from '@solar-icons/react';

export default function ApplicantTabs() {
  const pathname = usePathname();

  const tabsConfig = [
    {
      value: 'branches',
      route: '/myrestaurant/home/profile/points', 
      icon: <Shop size={24} weight="Bold" />, 
      label: 'Sucursales y puntos',
    },
    {
      value: 'restaurant-data',
      route: '/myrestaurant/home/profile/restaurant',
      icon: <PenNewSquare size={24} weight="Bold" />, 
      label: 'Datos de Restaurante',
    },
    {
      value: 'access',
      route: '/myrestaurant/home/profile',
      icon: <UserCircle size={24} weight="Bold" />, 
      label: 'Datos de acceso',
    },
  ];

  return (
    <div className="w-full max-w-xs">
      {/* 1. Tarjeta de Información */}
      <div className="mb-10 px-2">
        <InfoCard
          avatar="/ComiGo-Logo.png" 
          name="Deloitte QRO"
          email="Mercaderia@gmail.com"
          cellphone="" 
        />
      </div>

      {/* 2. Menú de Navegación */}
      <div className="flex flex-col gap-3 px-2">
        {tabsConfig.map((tab) => {
          
          // --- CORRECCIÓN AQUÍ ---
          // Eliminamos la condición "|| tab.value === 'access'"
          // Ahora solo se activará si la ruta coincide exactamente.
          const isActive = pathname === tab.route; 

          return (
            <Link
              key={tab.value}
              href={tab.route}
              className={`
                flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                
                /* ESTADOS DE COLOR */
                ${isActive 
                  ? 'bg-[#F28C28] text-white shadow-sm' // ACTIVO: Naranja
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900' // INACTIVO: Gris
                }
              `}
            >
              {/* Icono */}
              <span className="shrink-0">
                {tab.icon}
              </span>
              
              {/* Texto */}
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}