'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function SuccessStep() {
  const router = useRouter();
  const initialSeconds = 7;
  const [secondsLeft, setSecondsLeft] = React.useState<number>(initialSeconds);

  React.useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  React.useEffect(() => {
    if (secondsLeft <= 0) {
      router.push('/'); // Redirigimos al login
    }
  }, [secondsLeft, router]);

  return (
    <div className='h-full w-full max-w-2xl space-y-8 rounded-md border border-gray-300 bg-white px-12 py-10 shadow-sm text-center animate-in zoom-in duration-500'>
      <div className="flex flex-col items-center gap-6">
        <img src="/recovery.png" alt="Éxito" className="scale-100" />
        
        <h1 className="text-2xl font-bold text-[#4A7729]">
            ¡Tu cuenta está lista para usarse!
        </h1>
        
        <div className="space-y-2">
            <p className="text-gray-600">Tu contraseña ha sido actualizada correctamente.</p>
            <p className="text-gray-500">Serás redirigido al inicio de sesión en <span className="font-bold text-black">{secondsLeft}</span> segundos.</p>
        </div>
        
        <img src="/reload.gif" className="h-16 w-16 mt-4" alt="Cargando..." />
      </div>
    </div>
  );
}