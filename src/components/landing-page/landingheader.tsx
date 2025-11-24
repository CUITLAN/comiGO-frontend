'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function LandingHeader() {
  return (
    <header className="w-full bg-white px-4 py-2 flex items-center justify-between sticky top-0 z-50 shadow-sm border-b border-gray-100 h-14">
      
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
        <Image 
            src="/ComiGo.png" 
            alt="ComiGo" 
            width={32} // Reduje un poco el logo para balancear
            height={32} 
            className="object-contain"
        />
        <span className="text-[#0C3252] text-lg font-bold tracking-tight">ComiGO</span>
      </Link>

      {/* Botón Iniciar Sesión (Compacto) */}
      <Link href="/login">
        <Button 
            // Ajustes clave: h-9 (altura 36px), text-sm, px-4
            className="bg-[#4A7729] hover:bg-[#3d6321] text-white font-semibold rounded-md text-sm h-9 px-4 transition-all shadow-sm"
        >
            Iniciar sesión
        </Button>
      </Link>

    </header>
  );
}