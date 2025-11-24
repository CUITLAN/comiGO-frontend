'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroClient() {
  return (
    <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      
      {/* Imagen de Fondo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Hero-Landing-2.png" // Asegúrate de tener esta imagen (la de los tacos/comida)
          alt="Comida deliciosa"
          fill
          className="object-cover brightness-[0.85]" // Oscurecemos un poco para leer el texto
          priority
        />
      </div>

      {/* Contenido Centrado */}
      <div className="relative z-10 text-center px-6 max-w-lg flex flex-col items-center gap-6">
        
        <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight drop-shadow-md">
          La comida deliciosa <br />
          no debería terminar en la <br />
          basura.
        </h1>

        <Link href="/signup/client">
            <Button 
                variant="primary"
                className="border-2 border-white text-white bg-transparent hover:bg-white/20 text-lg px-8 py-6 rounded-xl font-bold backdrop-blur-sm"
            >
                Registrame
            </Button>
        </Link>

      </div>
    </section>
  );
}