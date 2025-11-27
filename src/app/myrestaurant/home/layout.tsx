'use client';

import EmployerSideBar from '@/components/sidebar/EmployerSideBar';
import Header from '@/components/ui/header';
import React from 'react';
import { Toaster } from 'sonner';
import AuthGuard from '@/components/auth/AuthGuard'; // Importar el Guardián

export default function LayoutEmployerView({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // Aplicamos el AuthGuard para proteger toda la sección /myrestaurant/home
    <AuthGuard allowedRoles={['restaurant_admin']}>
        <div className="min-h-screen bg-gray-50 relative">
        
            <Toaster 
                position="top-center" 
                richColors 
                toastOptions={{
                    style: { zIndex: 99999 } 
                }}
                style={{ zIndex: 99999 }} 
            />

            {/* Fixed Header */}
            <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b bg-white shadow-sm">
                <Header showProfileButton={false}/>
            </header>

            {/* Main layout with padding for fixed header */}
            <main className="flex pt-16">
                {/* Sticky Sidebar */}
                <div className="shrink-0 sticky top-16 h-[calc(100vh-4rem)]">
                    <EmployerSideBar />
                </div>

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto py-10 px-6">
                    {children}
                </div>
            </main>
        </div>
    </AuthGuard>
  );
}