'use client';

import { useEffect, useCallback } from 'react';
import { Bag, Refresh } from '@solar-icons/react';
import { OrderCard } from '@/components/client/OrderCards';
import EmptyDisplay from '@/components/empty-display/EmptyDisplay';
import { useAuthStore } from '@/store/useAuthStore';
import { useMyOrdersStore } from '@/store/useMyOrdersStore';

export default function MyOrdersPage() {
  const { user, accessToken } = useAuthStore();
  const { orders, isLoading, fetchMyOrders } = useMyOrdersStore();

  // Función para cargar datos (memorizada para usar en efectos)
  const loadOrders = useCallback(() => {
    if (user?.id && accessToken) {
        fetchMyOrders(user.id, accessToken);
    }
  }, [user, accessToken, fetchMyOrders]);

  // 1. Carga Inicial
  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  // 2. POLLING: Actualizar cada 5 segundos
  // Esto garantiza que si el restaurante marca "Listo", el cliente lo vea casi al instante
  useEffect(() => {
    const interval = setInterval(() => {
        // Solo actualizamos silenciosamente (sin spinner de carga global si es posible)
        loadOrders();
    }, 5000);

    return () => clearInterval(interval);
  }, [loadOrders]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] pb-24">
      
      {/* HEADER */}
      <div className="sticky top-0 z-30 bg-[#EBEBEB] px-6 py-3 flex justify-between items-center shadow-sm">
        <h1 className="text-lg font-bold text-[#0C3252] tracking-wide uppercase">Mis Pedidos</h1>
        <button onClick={loadOrders} className="text-black active:scale-95 transition-transform">
            <Refresh className={`w-6 h-6 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="p-4 space-y-4 flex-1">
        
        {/* Lista de pedidos */}
        {orders.length > 0 ? (
            orders.map((order) => (
                <OrderCard key={order.id} item={order} />
            ))
        ) : !isLoading && (
            <div className="py-20 flex justify-center">
                <EmptyDisplay
                    icon={<Bag className="w-20 h-20 text-gray-300" />} 
                    firstLine="No tienes pedidos activos"
                    secondline="¡Rescata comida deliciosa hoy!"
                />
            </div>
        )}
        
        {/* Skeleton Loading inicial */}
        {isLoading && orders.length === 0 && (
             <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0C3252]"></div>
             </div>
        )}

      </div>
    </div>
  );
}