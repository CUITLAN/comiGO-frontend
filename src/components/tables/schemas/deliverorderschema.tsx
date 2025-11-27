'use client';

import { ColumnDef } from '@tanstack/react-table';
import SortButton from '../ui/SortButton';
import { dateToLocaleDateString } from '@/lib/utils';
import { TrashBinMinimalistic, CheckSquare, Box } from '@solar-icons/react'; 
import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useOrderDeliveryStore, DeliveryOrder } from '@/store/useOrderDeliveryStore';

// Modales
import { DeliverOrderDialog } from '@/components/ui/modal/deliverorderdialog';
import { CancelOrderDialog } from '@/components/ui/modal/cancelorderdialog';
import { ConfirmReadyDialog } from '@/components/ui/modal/ConfirmReady';

const OrderActions = ({ row }: { row: { original: DeliveryOrder } }) => {
    const { accessToken } = useAuthStore();
    const { markReady, deliverOrder, cancelOrder } = useOrderDeliveryStore();

    const [showDeliver, setShowDeliver] = useState(false);
    const [showCancel, setShowCancel] = useState(false);
    const [showReady, setShowReady] = useState(false);

    // 1. MARCAR LISTO
    const handleReady = async () => {
        if (!accessToken) return;
        await markReady(row.original.id, accessToken);
        setShowReady(false);
    };

    // 2. ENTREGAR
    // Corregimos el tipo explícito 'string'
    const handleDeliver = async (code: string) => {
        if (!accessToken) return;
        const success = await deliverOrder(row.original.id, code, accessToken);
        if (success) setShowDeliver(false);
    };

    // 3. CANCELAR
    // Corregimos el tipo explícito 'string'
    const handleCancel = async (reason: string) => {
        if (!accessToken) return;
        const success = await cancelOrder(row.original.id, reason, accessToken);
        if (success) setShowCancel(false);
    };

    const isReady = row.original.status === 'ready';

    return (
        <div className="flex items-center justify-center gap-6">
            {!isReady && (
                <button 
                    onClick={() => setShowReady(true)}
                    className="text-gray-600 hover:text-blue-600 transition-transform hover:scale-110"
                    title="Marcar como listo"
                >
                    <Box size={24} />
                </button>
            )}

            <button 
                onClick={() => setShowDeliver(true)}
                className={`transition-transform hover:scale-110 ${isReady ? 'text-[#4A7729] animate-pulse' : 'text-gray-400 hover:text-gray-600'}`}
                title="Entregar al cliente"
            >
                <CheckSquare size={24} />
            </button>

            <button 
                onClick={() => setShowCancel(true)}
                className="text-gray-600 hover:text-red-500 transition-transform hover:scale-110"
                title="Cancelar pedido"
            >
                <TrashBinMinimalistic size={24} />
            </button>

            <ConfirmReadyDialog 
                open={showReady}
                onOpenChange={setShowReady}
                clientName={row.original.clientName}
                onConfirm={handleReady}
            />

            <DeliverOrderDialog 
                open={showDeliver} 
                onOpenChange={setShowDeliver}
                // Envolvemos en una función flecha para que coincida con la firma esperada
                onConfirm={(code) => { handleDeliver(code); }} 
            />
            
            <CancelOrderDialog 
                open={showCancel} 
                onOpenChange={setShowCancel}
                clientName={row.original.clientName}
                // Envolvemos en una función flecha
                onConfirm={(reason) => { handleCancel(reason); }}
            />
        </div>
    );
};

export const deliveryColumns: ColumnDef<DeliveryOrder>[] = [
  {
    accessorKey: 'clientName',
    header: ({ column }) => <SortButton column={column} name="Cliente" />,
    cell: ({ row }) => (
        <div>
            <span className="font-bold text-gray-700 block">{row.getValue('clientName')}</span>
            {row.original.status === 'ready' && (
                <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Listo para entrega</span>
            )}
        </div>
    )
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <SortButton column={column} name="Tipo" />,
    cell: ({ row }) => <span className="text-gray-500">{row.getValue('type')}</span>
  },
  {
    accessorKey: 'deliveryDate',
    header: ({ column }) => <SortButton column={column} name="Fecha Pedido" />,
    cell: ({ getValue }) => <span className="text-gray-500">{dateToLocaleDateString(getValue() as string)}</span>,
  },
  {
    accessorKey: 'productName',
    header: ({ column }) => <SortButton column={column} name="Nombre pedido" />,
    cell: ({ row }) => <span className="text-gray-500">{row.getValue('productName')}</span>
  },
  {
    id: 'actions',
    header: () => (
        <div className="text-center text-[#4A7729] font-bold">
            Acciones
        </div>
    ),
    cell: ({ row }) => <OrderActions row={row} />,
  },
];