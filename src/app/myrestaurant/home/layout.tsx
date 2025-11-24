'use client';

import EmployerSideBar from '@/components/sidebar/EmployerSideBar';
import Header from '@/components/ui/header';
import React from 'react';
import { Toaster } from 'sonner';

export default function LayoutEmployerView({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* IMPORTANTE: 
        1. Colocamos el Toaster aquí para que sea global.
        2. Usamos style={{ zIndex: 99999 }} en el contenedor del Toaster 
           para obligarlo a estar por encima de cualquier Modal (Dialog) o Header.
      */}
      <Toaster 
        position="top-center" 
        richColors 
        toastOptions={{
          style: { zIndex: 99999 } // Asegura que cada alerta individual tenga prioridad
        }}
        style={{ zIndex: 99999 }} // Asegura que el contenedor tenga prioridad
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
  );
}