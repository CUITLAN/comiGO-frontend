'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useSalesStore } from '@/store/useSalesStore';
import AuthGuard from '@/components/auth/AuthGuard';
import BranchSelector from '@/components/forms/vacancy/branchselector';

// Componentes UI
import EmptyDisplay from '@/components/empty-display/EmptyDisplay';
import { Button } from '@/components/ui/button';
import { DataTableCustomSearchBar } from '@/components/tables/layouts/DateTableCustomSearchBar';
import { salesColumns } from '@/components/tables/schemas/salescolumn';
import { filtersSales } from '@/data/salesdata'; // Asegúrate de que esto exista o usa un array vacío []
import { Wallet } from '@solar-icons/react';
import NoteRemove from '@/components/common/hugeIcons';

export default function AccountsPage() {
  const { user, accessToken } = useAuthStore();
  const { sales, isLoading, fetchSalesByBranch } = useSalesStore();
  
  const [currentBranchId, setCurrentBranchId] = useState<string | null>(null);

  // 1. Inicializar Sucursal
  useEffect(() => {
    if (user?.branchId && !currentBranchId) {
        setCurrentBranchId(user.branchId);
    }
  }, [user, currentBranchId]);

  // 2. Cargar Ventas
  useEffect(() => {
    if (currentBranchId && accessToken) {
        fetchSalesByBranch(currentBranchId, accessToken);
    }
  }, [currentBranchId, accessToken, fetchSalesByBranch]);

  // Handler selector
  const handleBranchChange = (newId: string) => setCurrentBranchId(newId);

  // Cálculo de totales (usando los datos reales del store)
  const totalSales = sales.reduce((sum, item) => sum + item.price, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Renderizado Condicional
  return (
    <AuthGuard allowedRoles={['restaurant_admin', 'admin']}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 mb-20">
        
        <div className="w-full bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
          
          {/* HEADER con Selector */}
          <div className="bg-[#EAF2FF] px-6 py-4 flex flex-col md:flex-row justify-between items-center border-b border-blue-100 gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="flex items-center gap-2">
                    <h2 className="text-[#0C3252] font-bold text-lg uppercase tracking-wide whitespace-nowrap">
                    MIS CUENTAS
                    </h2>
                    <Wallet className="text-[#0C3252] w-5 h-5 mb-1" />
                </div>

                <div className="w-full sm:w-64">
                     <BranchSelector 
                        activeBranchId={currentBranchId}
                        onSelect={handleBranchChange} 
                     />
                </div>
            </div>
          </div>
          
          {/* Disclaimer */}
          <div className="px-6 pt-4 pb-2">
              <p className="text-xs text-gray-400">
                Solo guardamos datos del último mes. Sin embargo, puedes filtrar por día/semana.
              </p>
          </div>

          <div className="p-6">
            {isLoading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0C3252]"></div>
                </div>
            ) : sales.length > 0 ? (
                <>
                    {/* TABLA DE VENTAS */}
                    <DataTableCustomSearchBar
                        columns={salesColumns}
                        data={sales}
                        filters={filtersSales} 
                    />

                    {/* FOOTER: TOTAL ACUMULADO */}
                    <div className="mt-8 flex flex-col items-end">
                        <div className="bg-gray-50 rounded-lg border border-gray-200 px-6 py-3 min-w-[240px] text-center shadow-sm">
                            <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Ingresos Totales</span>
                            <span className="text-[#4A7729] font-bold text-2xl">
                                {formatCurrency(totalSales)}
                            </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-2 text-right max-w-[250px]">
                            Esto representa el total de ventas acumuladas concretadas en esta sucursal.
                        </p>
                    </div>

                    <div className="mt-12 text-left">
                        <p className="text-[10px] text-gray-400">
                            * Solo aparecerán los productos una vez se concrete la venta.
                        </p>
                    </div>
                </>
            ) : (
                // EMPTY STATE
                <div className="flex w-full flex-col items-center justify-center text-center py-10">
                    <EmptyDisplay
                    icon={<NoteRemove color="#D4D4D8" width={158} height={166} />}
                    firstLine="Aún no tienes ventas registradas en esta sucursal."
                    secondline="Tus ventas aparecerán aquí una vez se concreten."
                    />
                </div>
            )}
          </div>
        </div>

      </div>
    </AuthGuard>
  );
}