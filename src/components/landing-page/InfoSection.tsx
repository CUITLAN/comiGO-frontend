'use client';

import Image from 'next/image';
import { CheckCircle } from '@solar-icons/react'; // O el icono de check que prefieras

export function InfoSection() {
  return (
    <section className="py-12 px-6 space-y-12 max-w-3xl mx-auto">
      
      {/* Bloque 1: Desperdicio */}
      <div className="space-y-6 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0C3252] leading-snug">
          ¿Sabías que en México se desperdicia más del 34% de los alimentos?
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Cada día, toneladas de comida en perfecto estado (frutas, verduras, panadería y platillos preparados) son descartadas. Esto no solo es una pérdida de recursos, es un problema económico y ambiental que podemos solucionar juntos.
        </p>
      </div>

      {/* Imagen Intermedia */}
      <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg my-8">
        <Image
            src="/LandingPage-2.png" // Imagen de la persona recibiendo la bolsa
            alt="Entregando comida"
            fill
            className="object-cover"
        />
      </div>

      {/* Bloque 2: Salva Comida (Texto + Lista) */}
      <div className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0C3252] leading-snug">
          Salva rica comida a un buen precio
        </h2>
        
        <p className="text-gray-700 text-lg leading-relaxed">
          comiGO es tu socio estratégico contra el desperdicio. Te ofrecemos una plataforma simple para encontrar esa comida de alta calidad que sobró al final del día. En lugar de que se pierda, ¡tú la disfrutas a un precio increíble!
        </p>

        {/* Lista de beneficios */}
        <ul className="space-y-4 mt-4">
            <li className="flex items-center gap-3">
                <div className="bg-[#0C3252] rounded-full p-1">
                    <CheckCircle className="text-white w-5 h-5" />
                </div>
                <span className="text-gray-800 font-medium text-lg">Busca</span>
            </li>
            <li className="flex items-center gap-3">
                <div className="bg-[#0C3252] rounded-full p-1">
                    <CheckCircle className="text-white w-5 h-5" />
                </div>
                <span className="text-gray-800 font-medium text-lg">Reserva</span>
            </li>
            <li className="flex items-center gap-3">
                <div className="bg-[#0C3252] rounded-full p-1">
                    <CheckCircle className="text-white w-5 h-5" />
                </div>
                <span className="text-gray-800 font-medium text-lg">Disfruta</span>
            </li>
        </ul>
      </div>

    </section>
  );
}