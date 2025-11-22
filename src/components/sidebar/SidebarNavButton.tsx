'use client';

import Link from 'next/link';

interface SidebarNavButtonProps {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
}

export function SidebarNavButton({ href, label, icon: Icon, active }: SidebarNavButtonProps) {
  return (
    <Link 
      href={href}
      className={`
        group/button flex items-center h-12 rounded-md transition-all duration-200 mb-1 w-full
        
        /* --- ESTADOS --- */
        ${active 
          ? 'bg-[#529A60] text-white font-bold shadow-sm' // Activo: Verde, Blanco, Bold
          : 'bg-transparent text-gray-600 hover:bg-[#529A60] hover:text-white hover:font-bold' // Inactive: Transparente -> Verde al Hover
        }
      `}
    >
      {/* Contenedor del Icono */}
      <div className="shrink-0 flex items-center justify-center w-16 h-12">
        <Icon 
            className={`
                w-6 h-6 transition-colors duration-200
                /* LÓGICA DEL COLOR DEL ICONO: */
                /* 1. Si está activo: Blanco */
                /* 2. Si NO está activo: Verde (#529A60) */
                /* 3. Al hacer HOVER sobre el botón (group-hover): Se vuelve Blanco */
                ${active 
                    ? 'text-white' 
                    : 'text-[#529A60] group-hover/button:text-white'
                }
            `} 
        />
      </div>

      {/* Etiqueta (Label) */}
      <span className={`
        text-sm transition-all duration-200 whitespace-nowrap overflow-hidden
        /* Visibilidad controlada por el sidebar padre */
        opacity-0 group-hover/sidebar:opacity-100 
        w-0 group-hover/sidebar:w-auto
        
        /* Hereda el peso de la fuente (medium por defecto, bold en hover/active gracias al padre) */
        font-inherit
      `}>
        {label}
      </span>
    </Link>
  );
}