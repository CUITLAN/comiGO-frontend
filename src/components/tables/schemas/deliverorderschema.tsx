'use client';

import { ColumnDef } from '@tanstack/react-table';
import SortButton from '../ui/SortButton';
import { dateToLocaleDateString } from '@/lib/utils';
import { Order } from '@/data/ordersdata';
import { TrashBinMinimalistic, CheckSquare } from '@solar-icons/react';
import { useState } from 'react';
import { DeliverOrderDialog } from '@/components/ui/modal/deliverorderdialog';
import { CancelOrderDialog } from '@/components/ui/modal/cancelorderdialog';

const OrderActions = ({ row }: { row: { original: Order } }) => {
    const [showDeliver, setShowDeliver] = useState(false);
    const [showCancel, setShowCancel] = useState(false);

    return (
        <div className="flex items-center justify-center gap-8">
            {/* Botón Entregar */}
            <button 
                onClick={() => setShowDeliver(true)}
                className="text-gray-800 hover:text-[#4A7729] transition-transform hover:scale-110"
            >
                <CheckSquare size={24} />
            </button>

            {/* Botón Cancelar */}
            <button 
                onClick={() => setShowCancel(true)}
                className="text-gray-800 hover:text-red-500 transition-transform hover:scale-110"
            >
                <TrashBinMinimalistic size={24} />
            </button>

            {/* Modales */}
            <DeliverOrderDialog 
                open={showDeliver} 
                onOpenChange={setShowDeliver}
                onConfirm={() => console.log("Entregado", row.original.id)}
            />
            
            <CancelOrderDialog 
                open={showCancel} 
                onOpenChange={setShowCancel}
                clientName={row.original.clientName}
            />
        </div>
    );
};

export const deliveryColumns: ColumnDef<Order>[] = [
  {
    accessorKey: 'clientName',
    header: ({ column }) => <SortButton column={column} name="Cliente" />,
    cell: ({ row }) => <span className="font-bold text-gray-700">{row.getValue('clientName')}</span>
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <SortButton column={column} name="Tipo" />,
    cell: ({ row }) => <span className="text-gray-500">{row.getValue('type')}</span>
  },
  {
    accessorKey: 'deliveryDate',
    header: ({ column }) => <SortButton column={column} name="Fecha de Entrega" />,
    cell: ({ getValue }) => <span className="text-gray-500">{dateToLocaleDateString(getValue() as string)}</span>,
  },
  {
    accessorKey: 'productName',
    header: ({ column }) => <SortButton column={column} name="Nombre pedido" />,
    cell: ({ row }) => <span className="text-gray-500">{row.getValue('productName')}</span>
  },
  {
    id: 'actions',
    // Header personalizado para Entregar / Editar
    header: () => (
        // CAMBIO DE COLOR AQUÍ: text-[#4A7729]
        <div className="flex justify-center gap-8 text-[#4A7729] font-bold">
            <span>Entregar</span>
            <span>Editar</span>
        </div>
    ),
    cell: ({ row }) => <OrderActions row={row} />,
  },
];