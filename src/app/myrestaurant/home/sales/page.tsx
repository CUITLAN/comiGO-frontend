'use client';

import { TrashBinMinimalistic } from '@solar-icons/react';
import { DataTableOrders } from '@/components/tables/layouts/OrderTable';
import { deliveryColumns } from '@/components/tables/schemas/deliverorderschema';
import { DataOrders } from '@/data/ordersdata';

export default function OrdersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 mb-20">
      
      <div className="w-full bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
        
        {/* HEADER AZUL */}
        <div className="bg-[#EAF2FF] px-6 py-4 flex justify-between items-center border-b border-blue-100">
          <h2 className="text-[#0C3252] font-bold text-lg uppercase tracking-wide">
            PEDIDOS POR ENTREGAR
          </h2>
         
        </div>

        <div className="p-6">
          {/* TABLA SIN SEARCHBAR (Con selector de sucursal integrado) */}
          <DataTableOrders
            columns={deliveryColumns}
            data={DataOrders}
          />
        </div>

      </div>
    </div>
  );
}