// En: @/components/landing-page/Hero.tsx

import Link from 'next/link';
import { Button } from "@/components/ui/button";

export function Hero2() {
  return (
    <section 
      // --- CAMBIO AQUÍ ---
      // 1. Quitamos 'px-24'
      // 2. Añadimos 'justify-center' para centrar el bloque de contenido
      // 3. Añadimos 'px-8' como un padding de seguridad para móviles
      className="relative h-[552px] w-full flex items-center justify-self-end-safe py-8 px-8"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.24), rgba(0, 0, 0, 0.24)), url('/NosotrosTop.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Este 'div' ahora estará centrado en la página */}
      <div className="relative z-10 max-w-3xl text-white pl-10">
        
        {/* Esto seguirá estando a la izquierda (¡correcto!) */}
        <h1 className="text-5xl font-bold mb-4 leading-tight text-left">
          Una Solución Real <br/> para un Problema Real.
        </h1>
        
        {/* Esto seguirá estando a la izquierda (¡correcto!) */}
        <p className="text-lg mb-8 text-left">
          No somos una app extranjera intentando entrar a México. Somos una solución nacida en México, para México.
        </p>

       
        

      </div>
    </section>
  );
}