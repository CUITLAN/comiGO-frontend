'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Heart, 
  CartLargeMinimalistic, // O usa 'Cart' si prefieres
  MapPoint, 
  Settings 
} from '@solar-icons/react';

export function MobileBottomBar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/client/user/home', icon: Home, label: 'Inicio' },
    { href: '/client/user/favorites', icon: Heart, label: 'Favoritos' },
    { href: '/client/user/cart', icon: CartLargeMinimalistic, label: 'Carrito' },
    { href: '/client/user/map', icon: MapPoint, label: 'Explorar' },
    { href: '/client/user/settings', icon: Settings, label: 'Ajustes' },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="grid h-full max-w-md grid-cols-5 mx-auto font-medium">
        
        {navLinks.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group transition-colors"
            >
              {/* Contenedor del Icono */}
              <div 
                className={`
                    p-2 rounded-lg transition-all duration-200
                    ${isActive 
                        ? 'bg-[#529A60] text-white shadow-sm' // Activo: Fondo verde, Icono blanco
                        : 'text-gray-500 group-hover:text-[#529A60]' // Inactivo: Gris -> Verde al hover
                    }
                `}
              >
                <Icon 
                    // Solar Icons soportan 'weight'. Usamos 'Bold' si está activo, 'Linear' si no.
                    weight={isActive ? "Bold" : "Linear"} 
                    className="w-6 h-6" // Tamaño del icono
                />
              </div>
              
              {/* Etiqueta opcional (oculta en tu imagen, pero útil para accesibilidad) */}
              <span className="sr-only">{label}</span> 
            </Link>
          );
        })}

      </div>
    </div>
  );
}