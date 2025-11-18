'use client';

import Image from 'next/image';
// 1. Cambiamos a Lucide React para eliminar el error de 'stroke-width'
import { 
  Send,          // Reemplaza a PlainSimple (Agilidad)
  Globe2,        // Reemplaza a Globus (Misión)
  MessageCircle, // Reemplaza a ChatRoundLine (Idioma)
  HeartHandshake,// Reemplaza a ChatRoundLike (Impacto Social - queda muy bien)
  MapPin         // Reemplaza a MapPoint (Socios Locales)
} from 'lucide-react';

const pillars = [
  {
    // Icono: Avión de papel
    icon: <Send size={32} className="text-green-600" />,
    title: "Agilidad:",
    description: "Sabemos que no tienes tiempo para sistemas complejos. Nuestra plataforma está diseñada para ser usada en segundos, adaptándose a tu cierre de día.",
  },
  {
    // Icono: Mundo
    icon: <Globe2 size={32} className="text-green-600" />,
    title: "Nuestra misión",
    description: "Creemos en un modelo donde todos ganan, tu negocio prospera, la comunidad se beneficia y el impacto ambiental se reduce.",
  },
  {
    // Icono: Chat
    icon: <MessageCircle size={32} className="text-green-600" />,
    title: "Hablamos tu Idioma",
    description: "Creamos una herramienta intuitiva que no requiere largas capacitaciones. Si sabes usar WhatsApp, sabes usar comiGO.",
  },
  {
    // Icono: Corazón/Manos (Impacto social)
    icon: <HeartHandshake size={32} className="text-green-600" />,
    title: "Impacto Social",
    description: "Prácticamente ganaremos todos, tu generaras ingresos a partir de mermas, los clientes reciben comida de calidad y el planeta recibe un respiro.",
  },
  {
    // Icono: Pin de mapa
    icon: <MapPin size={32} className="text-green-600" />,
    title: "Somos Socios Locales:",
    description: "No somos una corporación anónima. Estamos aquí, en Querétaro, listos para apoyar a los negocios locales a crecer.",
  },
];

export function ComigoPillars() {
  return (
    <section className="px-6 pt-10 pb-20 lg:px-48 lg:pt-20 lg:pb-20">
      <h2 className="text-4xl font-bold text-center mb-12 text-[var(--color-titulos)]">
        Los Pilares de comiGO
      </h2>

      <div className="flex flex-col lg:flex-row lg:gap-16 items-center lg:items-start max-w-7xl mx-auto">
        
        {/* Columna de los Pilares (Grid) */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 lg:gap-x-12 lg:gap-y-16 mt-8 lg:mt-0">
          {pillars.map((pillar, index) => (
            <div key={index} className="flex gap-4 items-start text-left max-w-sm mx-auto md:mx-0">
              <div className="flex-shrink-0 pt-1"> 
                {pillar.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--color-titulos)] mb-1">
                  {pillar.title}
                </h3>
                <p className="text-sm text-zinc-700 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Columna de la Imagen */}
        <div className="flex-1 flex justify-center lg:justify-end mt-12 lg:mt-0">
          <Image
            src="/Nosotros.png" 
            width={559}
            height={409}
            alt="Personas compartiendo alimentos"
            className="rounded-[32px] object-cover max-h-[450px] w-auto"
          />
        </div>
        
      </div>
    </section>
  );
}