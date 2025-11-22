'use client';

import EmptyDisplay from '@/components/empty-display/EmptyDisplay';
import { Button } from '@/components/ui/button';
import { DataTableCustomSearchBar } from '@/components/tables/layouts/DateTableCustomSearchBar';
// Imports nuevos
import { salesColumns } from '@/components/tables/schemas/salescolumn';
import { DataSales } from '@/data/salesdata';
import { filtersSales } from '@/data/salesdata';
import { Wallet } from '@solar-icons/react'; // Icono de billetera/bolsa
import NoteRemove from '@/components/common/hugeIcons'; // Para estado vacío

// Calculamos el total sumando todos los precios de los datos
const totalSales = DataSales.reduce((sum, item) => sum + item.price, 0);

// Formateador de moneda
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0
  }).format(amount);
};

const AccountsContent = ({ hasData }: { hasData: boolean }) => {
  
  if (!hasData) {
    return (
      <div className="flex w-full flex-col items-center justify-center text-center py-10">
        <EmptyDisplay
          icon={<NoteRemove color="#D4D4D8" width={158} height={166} />}
          firstLine="Aún no tienes ventas registradas."
          secondline="Tus ventas aparecerán aquí una vez se concreten."
        />
      </div>
    );
  }

  return (
    <div className="w-full bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
      {/* HEADER AZUL CLARO (Estilo Mis Cuentas) */}
      <div className="bg-[#EAF2FF] px-6 py-4 flex justify-between items-center border-b border-blue-100">
        <h2 className="text-[#0C3252] font-bold text-lg uppercase tracking-wide flex items-center gap-2">
          MIS CUENTA
        </h2>
        <Wallet className="text-black w-6 h-6" />
      </div>
      
      {/* Subtítulo / Disclaimer */}
      <div className="px-6 pt-4 pb-2">
          <p className="text-xs text-gray-400">
            Solo guardamos datos de el ultimo mes, Sin embargo puedes filtrar por el dia/semana
          </p>
      </div>

      <div className="p-6">
        {/* TABLA DE VENTAS */}
        <DataTableCustomSearchBar
          columns={salesColumns}
          data={DataSales}
          filters={filtersSales} 
        />

        {/* FOOTER: TOTAL ACUMULADO */}
        <div className="mt-8 flex flex-col items-end">
            <div className="bg-gray-100 rounded-lg border border-gray-300 px-6 py-2 min-w-[200px] text-center">
                <span className="text-gray-800 font-bold text-lg">
                    Total: {formatCurrency(totalSales)}
                </span>
            </div>
            <p className="text-xs text-gray-400 mt-1 text-right">
                Esto representa el total de ventas acumuladas
            </p>
        </div>

        {/* Footer adicional texto pequeño */}
        <div className="mt-12 text-left">
             <p className="text-[10px] text-gray-400">
                Solo apareceran los productos una vez se concrete la venta
            </p>
        </div>

      </div>
    </div>
  );
};

export default function AccountsPage() {
  const hasData = DataSales.length > 0;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 mb-20">
      <AccountsContent hasData={hasData} />
    </div>
  );
}