'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AuthGuardProps {
    children: React.ReactNode;
    allowedRoles?: string[];
}

export default function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
    const { isAuthenticated, user, accessToken, logout } = useAuthStore();
    const router = useRouter();
    const isLoading = false; 

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            console.log('.');
            router.replace('/login');
        } 
        
        if (isAuthenticated && allowedRoles && user && !allowedRoles.includes(user.role)) {   
             router.replace('/'); 
        }
    }, [isAuthenticated, isLoading, user, allowedRoles, router]);

    if (isLoading || (isAuthenticated && !user)) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Cargando sesión...
            </div>
        );
    }
    
    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}