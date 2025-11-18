'use client';

import Image from 'next/image';
import { Check } from 'lucide-react'; // Importamos el ícono de check

export function TargetGroups() {
  return (
    <>
      {/* Contenedor principal de la sección */}
      <div
        className="flex flex-col items-center gap-12 px-6  pb-10 
                   lg:flex-row lg:px-48  lg:pb-5 lg:items-center" // <-- Añadimos lg:items-center
      >
        
        {/* Columna de Imagen (Izquierda en LG) */}
        <Image
          src="/LandingPage-2.png" 
          width={697} // Mantener el width
          height={397} // Mantener el height
          alt="Negocio vendiendo excedente de comida"
          className="flex-1 rounded-[32px] object-cover max-h-[397px] w-auto" // <-- CLASES MODIFICADAS
          // 1. Quité 'aspect-square'
          // 2. Añadí 'max-h-[397px]' para que no se extienda verticalmente más allá del texto
          // 3. Añadí 'w-auto' para que mantenga su proporción si el flex-1 la estira
        />

        {/* Columna de Texto (Derecha en LG) */}
        <div
          className="flex flex-1 flex-col gap-4 text-center lg:text-left"
        >
          {/* Título */}
          <h2 className="text-3xl font-bold text-[var(--color-titulos)]">
            Convertimos tu Excedente en dinero.
          </h2>

          {/* Párrafo */}
          <p className="text-xl text-zinc-600 leading-relaxed">
            comiGO es tu socio estratégico contra el desperdicio. Te ofrecemos una plataforma simple para vender esa comida de alta calidad que te sobró al final del día. En lugar de registrarlo como pérdida, lo conviertes en una venta.
          </p>

          {/* Checklist con Íconos */}
          {/* Añadimos 'lg:text-lg' para el tamaño del texto de la lista */}
          <ul className="mt-4 space-y-3">
            <li className="flex items-center gap-3 justify-center lg:justify-start lg:text-lg">
              <Check className="h-6 w-6 text-green-600" />
              <span className="text-zinc-700 font-medium">Publica</span>
            </li>
            <li className="flex items-center gap-3 justify-center lg:justify-start lg:text-lg">
              <Check className="h-6 w-6 text-green-600" />
              <span className="text-zinc-700 font-medium">Vende</span>
            </li>
            <li className="flex items-center gap-3 justify-center lg:justify-start lg:text-lg">
              <Check className="h-6 w-6 text-green-600" />
              <span className="text-zinc-700 font-medium">Gana</span>
            </li>
          </ul>
        </div>

      </div>
    </>
  );
}