'use client';

import { ColumnDef } from '@tanstack/react-table';
import SortButton from '../ui/SortButton';
import { dateToLocaleDateString } from '@/lib/utils';
import React, { useState } from 'react';
import { Sale } from '@/interfaces/sale';
import { Star, User } from '@solar-icons/react';
import { Drawer } from '@/components/ui/drawer';
import DrawerPedido from '@/components/DrawerVacante/DrawerPedido';

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          weight={star <= rating ? "Bold" : "Linear"}
          className={`w-4 h-4 ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
};

const SalesActions = ({ row }: { row: { original: Sale } }) => {
  const [open, setOpen] = useState(false);
  const sale = row.original;

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
        <div 
            onClick={() => setOpen(true)} 
            className="cursor-pointer flex items-center gap-2 text-gray-600 hover:text-[#4A7729] transition-colors group"
        >
            <User className="w-5 h-5 text-gray-400 group-hover:text-[#4A7729]" />
            <span className="text-sm font-medium underline decoration-gray-300 underline-offset-4 group-hover:decoration-[#4A7729]">
                ver pedido
            </span>
        </div>
        {open && <DrawerPedido sale={sale} onClose={() => setOpen(false)} />}
    </Drawer>
  );
};

export const salesColumns: ColumnDef<Sale>[] = [
  {
    // --- CORRECCIÓN AQUÍ ---
    // Mantenemos el accessorKey apuntando a los datos ('productName')
    // Pero forzamos el ID a 'name' para que el buscador la encuentre.
    accessorKey: 'productName', 
    id: 'name', 
    // -----------------------
    
    header: ({ column }) => <SortButton column={column} name="Nombre" />,
    cell: ({ row }) => <span className="font-semibold text-[#0C3252]">{row.getValue('name')}</span> // Ojo: getValue usa el ID, así que ahora es 'name'
  },
  {
    accessorKey: 'saleDate',
    header: ({ column }) => <SortButton column={column} name="Fecha de venta" />,
    cell: ({ getValue }) => <span className="text-gray-600">{dateToLocaleDateString(getValue() as string)}</span>,
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => <SortButton column={column} name="Porciones" />,
    cell: ({ row }) => (
      <div className="flex gap-1 font-medium text-gray-700">
        <span>{row.original.quantity}</span>
        <span className="text-gray-400 text-xs self-center ml-1 uppercase">{row.original.unit}</span>
      </div>
    ),
  },
  {
    accessorKey: 'rating',
    header: 'Puntuacion',
    cell: ({ row }) => <StarRating rating={row.getValue('rating')} />,
  },
  {
    accessorKey: 'price',
    header: 'Precio',
    cell: ({ row }) => <span className="font-medium text-gray-900">${row.getValue('price')}</span>,
  },
  {
    accessorKey: 'branch',
    header: 'Sucursal',
    cell: ({ getValue }) => <span className="text-gray-500 text-sm">{getValue() as string}</span>
  },
  {
    header: 'Editar',
    id: 'actions',
    cell: ({ row }) => <SalesActions row={row} />,
  },
];