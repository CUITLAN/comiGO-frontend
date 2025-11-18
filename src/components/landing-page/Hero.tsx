// En: @/components/landing-page/Hero.tsx

import Link from 'next/link';
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section 
      // --- CAMBIO AQUÍ ---
      // 1. Quitamos 'px-24'
      // 2. Añadimos 'justify-center' para centrar el bloque de contenido
      // 3. Añadimos 'px-8' como un padding de seguridad para móviles
      className="relative h-[552px] w-full flex items-center justify-center py-8 px-8"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.24), rgba(0, 0, 0, 0.24)), url('/Hero-Landing-2.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Este 'div' ahora estará centrado en la página */}
      <div className="relative z-10 max-w-3xl text-white">
        
        {/* Esto seguirá estando a la izquierda (¡correcto!) */}
        <h1 className="text-5xl font-bold mb-4 leading-tight text-left">
          La comida deliciosa <br /> no debería terminar en la basura.
        </h1>
        
        {/* Esto seguirá estando a la izquierda (¡correcto!) */}
        <p className="text-lg mb-8 text-left">
          Rescata comida, reduce el desperdicio y ahorra dinero en comiGO.
        </p>

        {/* Y esto ahora se centrará dentro del bloque centrado (¡correcto!) */}
        <div className="w-full text-center">
          <Link href="/registro">
            <Button 
              variant="primary" 
              className="px-8 py-3 text-lg" 
              style={{ 
                backgroundColor: 'rgba(63, 140, 236, 0.31)', 
                borderColor: 'white', 
                borderWidth: '2px', 
                borderRadius: '8px', 
              }}
            >
              Regístrame
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}