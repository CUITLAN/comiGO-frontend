import { HeroClient } from '@/components/landing-page/Heroclient';
import { LandingHeader } from '@/components/landing-page/landingheader';
import { InfoSection } from '@/components/landing-page/InfoSection';

export default function ClientLandingPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FDFBF7]">
      
      {/* Header Fijo o Superior */}
      <LandingHeader />

      <main className="flex-grow">
        
        {/* Sección Hero (Imagen principal) */}
        <HeroClient />

        {/* Contenedor con fondo de patrón (Doodles) */}
        {/* Nota: Necesitarás una imagen 'food-pattern.png' en public para este efecto exacto, 
            o usamos un color sólido por ahora. Agregué una clase 'bg-pattern' simulada */}
        <div className="relative w-full h-full" style={{
            backgroundImage: 'url("/FondoLanding.png")', // Asegúrate de tener un patrón suave
            backgroundRepeat: 'repeat',
            backgroundSize: '400px',
        }}>
            <div className="bg-white/80 w-full h-full backdrop-blur-[2px]"> {/* Overlay para suavizar el fondo */}
                <InfoSection />
            </div>
        </div>

      </main>

      {/* Footer opcional */}
      {/* <Footer /> */}
    </div>
  );
}