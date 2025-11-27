'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useOrderDeliveryStore } from '@/store/useOrderDeliveryStore';
import BranchSelector from '@/components/forms/vacancy/branchselector';
import { DataTableOrders } from '@/components/tables/layouts/OrderTable';
import { deliveryColumns } from '@/components/tables/schemas/deliverorderschema';
import EmptyDisplay from '@/components/empty-display/EmptyDisplay';
import { Box, Refresh } from '@solar-icons/react'; // Agregamos icono Refresh
import AuthGuard from '@/components/auth/AuthGuard';
import { Button } from '@/components/ui/button'; // Importamos Button para el botón manual

export default function OrdersPage() {
  const { user, accessToken } = useAuthStore();
  const { orders, isLoading, fetchPendingOrders } = useOrderDeliveryStore();
  
  const [currentBranchId, setCurrentBranchId] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // 1. Inicializar Branch
  useEffect(() => {
    if (user?.branchId && !currentBranchId) {
        setCurrentBranchId(user.branchId);
    }
  }, [user, currentBranchId]);

  // 2. Función de carga segura
  const loadOrders = useCallback(() => {
    if (currentBranchId && accessToken) {
        fetchPendingOrders(currentBranchId, accessToken)
            .then(() => setLastUpdated(new Date()));
    }
  }, [currentBranchId, accessToken, fetchPendingOrders]);

  // 3. Fetch Inicial
  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  // 4. POLLING: Actualización automática cada 10 segundos
  // Esto crea la "conexión" visual de tiempo real con el cliente
  useEffect(() => {
    const intervalId = setInterval(() => {
        console.log("🔄 Auto-actualizando pedidos...");
        loadOrders();
    }, 10000); // 10000 ms = 10 segundos

    return () => clearInterval(intervalId); // Limpieza al salir
  }, [loadOrders]);

  const handleBranchChange = (newId: string) => setCurrentBranchId(newId);

  return (
    <AuthGuard allowedRoles={['restaurant_admin', 'admin']}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 mb-20">
        
        <div className="w-full bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
          
          {/* HEADER AZUL */}
          <div className="bg-[#EAF2FF] px-6 py-4 flex flex-col md:flex-row justify-between items-center border-b border-blue-100 gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                <h2 className="text-[#0C3252] font-bold text-lg uppercase tracking-wide whitespace-nowrap">
                  PEDIDOS POR ENTREGAR
                </h2>
                
                <div className="w-full sm:w-64">
                    <BranchSelector 
                        activeBranchId={currentBranchId}
                        onSelect={handleBranchChange} 
                    />
                </div>
            </div>

            {/* Botón de Actualización Manual + Info */}
            <div className="flex items-center gap-3">
                <span className="text-[10px] text-gray-500 hidden sm:block">
                    Actualizado: {lastUpdated.toLocaleTimeString()}
                </span>
                <Button 
                    variant="primary"
                    size="sm"
                    onClick={loadOrders}
                    className="text-[#0C3252] border-blue-200 hover:bg-blue-50 gap-2"
                    title="Actualizar lista manualmente"
                >
                    <Refresh size={16} className={isLoading ? 'animate-spin' : ''} />
                    <span className="hidden sm:inline">Actualizar</span>
                </Button>
            </div>
          </div>

          <div className="p-6">
            {isLoading && orders.length === 0 ? (
                <div className="flex justify-center py-20">
                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0C3252]"></div>
                </div>
            ) : orders.length > 0 ? (
                <div className="relative">
                    {/* Indicador visual sutil de carga en background */}
                    {isLoading && (
                        <div className="absolute top-0 right-0 p-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#4A7729]"></div>
                        </div>
                    )}
                    <DataTableOrders
                        columns={deliveryColumns}
                        data={orders}
                    />
                </div>
            ) : (
                <div className="flex w-full flex-col items-center justify-center text-center py-10">
                    <EmptyDisplay
                      icon={<Box color="#D4D4D8" width={100} height={100} />}
                      firstLine="No hay pedidos pendientes."
                      secondline="Esta pantalla se actualizará automáticamente cuando lleguen nuevos pedidos."
                    />
                </div>
            )}
          </div>

        </div>
      </div>
    </AuthGuard>
  );
}