'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { MobileBottomBar } from '@/components/client/MObileBottomBar'; // Asegura la ruta correcta
import { usePathname } from 'next/navigation'; // Hook de cliente para obtener la ruta

export default function BottomBarStoreWrapper() {
    const { isAuthenticated } = useAuthStore();
    const pathname = usePathname();
    
    // Decidimos si mostrar la barra:
    // 1. Debe estar autenticado
    // 2. No debe estar en las rutas de inicio/registro
    const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup');

    if (!isAuthenticated || isAuthRoute) {
        return null;
    }

    return <MobileBottomBar />;
}