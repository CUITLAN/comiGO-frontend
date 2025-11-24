'use client';

import { usePathname } from 'next/navigation';
import { SidebarNavButton } from './SidebarNavButton';
import { 
  Shop,             // Menu
  AddSquare,        // Publicar
  Wallet,           // Cuentas
  User,             // Perfil
  ChefHat,          // Ventas
} from '@solar-icons/react';


export default function EmployerSideBar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/myrestaurant/home/publications', label: 'Menu', icon: Shop },
    { href: '/myrestaurant/home/post', label: 'Publicar', icon: AddSquare },
    { href: '/myrestaurant/home/account', label: 'Cuentas', icon: Wallet },
    { href: '/myrestaurant/home/profile', label: 'Perfil', icon: User },
    { href: '/myrestaurant/home/sales', label: 'Ventas', icon: ChefHat }, 
  ];

  return (
    // Sidebar Container
    <nav className="group/sidebar bg-white h-screen w-16 hover:w-64 transition-all duration-300 ease-in-out flex flex-col justify-start py-6 shadow-[4px_0_24px_0px_rgba(0,0,0,0.05)] z-50 border-r border-gray-100">
      
      {/* HEADER: "ComiGO" */}
      <div className="h-16 flex items-center justify-center mb-4 overflow-hidden relative">
         {/* Texto Completo (Visible al expandir) */}
         <h1 className="text-[#0C3252] font-bold text-2xl transition-all duration-300 opacity-0 group-hover/sidebar:opacity-100 absolute left-6 whitespace-nowrap">
            ComiGO
         </h1>
         
         {/* Logo/Texto Colapsado (Visible al contraer) */}
         <h1 className="text-[#0C3252] font-bold text-xl group-hover/sidebar:opacity-0 transition-opacity duration-300 absolute">
            CG
         </h1>
      </div>

      {/* ITEMS DE NAVEGACIÓN */}
      <div className="flex flex-col gap-1 px-0 items-center group-hover/sidebar:items-stretch">
        {navLinks.map(({ href, label, icon }) => {
            // CORRECCIÓN: Usamos .startsWith(href)
            // Esto asegura que si estás en '/myrestaurant/home/profile/restaurant',
            // el botón de 'Perfil' (que es '/myrestaurant/home/profile') se mantenga activo.
            const isActive = pathname?.startsWith(href);

            return (
              <SidebarNavButton 
                key={href} 
                href={href} 
                label={label} 
                icon={icon} 
                active={isActive} 
              />
            );
        })}
      </div>
    </nav>
  );
}