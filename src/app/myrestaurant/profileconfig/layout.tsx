'use client';

import EmployerSideBar from '@/components/sidebar/EmployerSideBar';
import Header from '@/components/ui/header';
import EmployerTab from '@/components/employer/EmployerTab';
import React from 'react';

export default function LayoutEmployerView({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b bg-white shadow-sm">
        <Header />
      </header>

      {/* Main layout with padding for fixed header */}
      <main className="flex pt-16">
        {/* Sticky Sidebar (preserves original structure) */}
        <div className="shrink-0 sticky top-16 h-[calc(100vh-4rem)]">
          <EmployerSideBar />
        </div>
        <div className="w-120 py-12 shrink-0">
          <EmployerTab />
        </div>


        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto py-10 px-6">
          {children}
        </div>
      </main>
    </div>
  );
}