'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Settings, UserCircle, Bag } from '@solar-icons/react'; 
import LogoutModal from '@/components/ui/modal/LogoutModal';
const carouselItems = [
  {
    image: "/Fonda1.png",
    text: "Gracias por salvar comida"
  },
  {
    image: "/Fonda4.png", 
    text: "Ayudas a tu cartera a descubrir nueva comida"
  },
  {
    image: "/Fonda3.png",
    text: "Apoyas a la comunidad y combates la crisis alimentaria"
  }
];

export default function ClientSettingsPage() {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    console.log("Cerrando sesión");
    setShowLogoutModal(false);
    router.push('/login'); 
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] pb-24">
      
      {/* HEADER */}
      <div className="sticky top-0 z-30 bg-[#EBEBEB] px-6 py-3 flex justify-between items-center shadow-sm">
        <h1 className="text-lg font-bold text-[#0C3252] tracking-wide uppercase">CONFIGURACION</h1>
        <div className="text-black">
            <Settings className="w-6 h-6" /> 
        </div>
      </div>

      <div className="p-4 space-y-8">
        
        <div className="relative w-full h-36 rounded-2xl overflow-hidden shadow-md group bg-gray-200">
            {carouselItems.map((item, index) => (
                <div 
                    key={index} 
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                >
                    <Image
                        src={item.image}
                        alt="Banner Configuración"
                        fill
                        className="object-cover"
                        priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-black/50" />
                    
                    <div className="absolute inset-0 flex flex-col justify-center px-6 text-center z-20">
                        <h2 className="text-white font-bold text-lg leading-snug drop-shadow-md">
                            {item.text}
                        </h2>
                    </div>
                </div>
            ))}

            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-30">
                {carouselItems.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                            currentSlide === index 
                                ? "bg-white w-3 opacity-100" 
                                : "bg-white/50 w-1.5 opacity-50 hover:bg-white/80"
                        }`}
                        aria-label={`Ir a diapositiva ${index + 1}`}
                    />
                ))}
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#529A60] z-40" />
        </div>

        <div className="space-y-4">
            
            <Link href="/client/orders" className="block"> 
                <div className="w-full bg-[#2D4F32] hover:bg-[#244029] text-white rounded-xl px-6 py-4 flex justify-between items-center shadow-md transition-colors cursor-pointer group">
                    <span className="font-bold text-lg">Mis pedidos</span>
                    <div className="bg-white/20 p-1.5 rounded-full group-hover:bg-white/30 transition-colors">
                        <Bag className="w-6 h-6 text-white" />
                    </div>
                </div>
            </Link>

            <Link href="/client/profile" className="block"> 
                <div className="w-full bg-[#2D4F32] hover:bg-[#244029] text-white rounded-xl px-6 py-4 flex justify-between items-center shadow-md transition-colors cursor-pointer group">
                    <span className="font-bold text-lg">Datos de acceso</span>
                    <div className="bg-white/20 p-1.5 rounded-full group-hover:bg-white/30 transition-colors">
                        <UserCircle className="w-6 h-6 text-white" />
                    </div>
                </div>
            </Link>

        </div>

        <div className="pt-10">
            <button 
                onClick={() => setShowLogoutModal(true)}
                className="w-full bg-[#529A60] hover:bg-[#468753] text-white rounded-xl px-6 py-4 flex justify-between items-center shadow-md transition-colors group"
            >
                <span className="font-bold text-lg">Cerrar Sesion</span>
                <div className="bg-white/20 p-1.5 rounded-full group-hover:bg-white/30 transition-colors">
                    <UserCircle className="w-6 h-6 text-white" /> 
                </div>
            </button>
        </div>

      </div>

      <LogoutModal 
        open={showLogoutModal} 
        onOpenChange={setShowLogoutModal}
        onConfirm={handleLogout}
      />

    </div>
  );
}