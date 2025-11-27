'use client';

import { useEffect, useState } from 'react';
import AuthGuard from '@/components/auth/AuthGuard';
import { useProductStore } from '@/store/useProductStore';
import BranchSelector from '@/components/forms/vacancy/branchselector';
import { useAuthStore } from '@/store/useAuthStore'; 

// --- Componentes de UI y Tablas ---
import { vacanciesColumns } from '@/components/tables/schemas/Vacancies';
import { DataTableCustomSearchBar } from '@/components/tables/layouts/DateTableCustomSearchBar';
import { filtersVacancies } from '@/data/filtersVacancies';
import EmptyDisplay from '@/components/empty-display/EmptyDisplay';
import { Button } from '@/components/ui/button';
import NoteRemove from '@/components/common/hugeIcons';

export default function PublicationsPage() {
  // 1. Store de Autenticación (Usuario y Token)
  const { user, accessToken } = useAuthStore();
  
  // 2. Store de Productos (Datos y Acciones)
  const { products, isLoading, fetchProductsByBranch } = useProductStore();

  // 3. Estado local para saber qué sucursal estamos viendo
  const [currentBranchId, setCurrentBranchId] = useState<string | null>(null);

  // EFECTO 1: Inicialización
  // Cuando carga el usuario, establecemos su sucursal principal como la predeterminada
  useEffect(() => {
    if (user?.branchId && !currentBranchId) {
        setCurrentBranchId(user.branchId);
    }
  }, [user, currentBranchId]);

  // EFECTO 2: Carga de Datos (Fetch)
  // Cada vez que cambia el ID de la sucursal (ya sea al inicio o por el selector), pedimos los datos a la API
  useEffect(() => {
    if (currentBranchId && accessToken) {
        fetchProductsByBranch(currentBranchId, accessToken);
    }
  }, [currentBranchId, accessToken, fetchProductsByBranch]);

  // Handler: Qué pasa cuando el usuario elige algo en el dropdown
  const handleBranchChange = (newBranchId: string) => {
      console.log("Cambiando a sucursal:", newBranchId);
      setCurrentBranchId(newBranchId);
      // El useEffect 2 detectará este cambio y hará el fetch automáticamente
  };

  // UI: Estado Vacío (cuando no hay productos)
  const emptyState = (
    <div className="flex w-full flex-col items-center justify-center text-center py-10">
      <EmptyDisplay
        icon={<NoteRemove color="#D4D4D8" width={158} height={166} />}
        firstLine="Todavía no has publicado ningún platillo en esta sucursal."
        secondline="Crea una nueva publicación para comenzar."
      />
      
    </div>
  );

  return (
    // Protegemos la ruta para que solo usuarios logueados y con rol entren
    <AuthGuard allowedRoles={['restaurant_admin', 'admin']}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 mb-20">
        
        {/* --- CONTENEDOR PRINCIPAL --- */}
        <div className="w-full bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
            
            {/* HEADER: Título + Selector + Botón Nueva */}
            <div className="bg-[#EAF2FF] px-6 py-4 flex flex-col md:flex-row justify-between items-center border-b border-blue-100 gap-4">
                
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                    <h2 className="text-[#0C3252] font-bold text-lg uppercase tracking-wide whitespace-nowrap">
                        MIS PUBLICACIONES
                    </h2>
                    
                    {/* INTEGRACIÓN DEL SELECTOR */}
                    {/* Asegúrate que tu BranchSelector reciba un evento para avisar el cambio */}
                    <div className="w-full sm:w-64">
                        <BranchSelector 
                            // Pasamos el ID actual para que se marque en la lista (si tu componente lo soporta)
                            activeBranchId={currentBranchId}
                            // Callback cuando seleccionan uno
                            onSelect={handleBranchChange} 
                        />
                    </div>
                </div>

            </div>

            {/* CUERPO DE LA PÁGINA */}
            <div className="p-6 min-h-[400px]">
                {isLoading ? (
                    // Estado de Carga
                    <div className="flex flex-col justify-center items-center h-full py-20 gap-3">
                         <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#4A7729]"></div>
                         <span className="text-gray-500 font-medium">Cargando platillos...</span>
                    </div>
                ) : products.length > 0 ? (
                    // Tabla de Datos
                    <DataTableCustomSearchBar
                        columns={vacanciesColumns}
                        data={products} 
                        filters={filtersVacancies} 
                    />
                ) : (
                    // Sin datos
                    emptyState
                )}
            </div>
        </div>

      </div>
    </AuthGuard>
  );
}