'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Vacancy } from '@/interfaces/vacancy';
import SortButton from '../ui/SortButton'; 
import RowActions from './VacanciesActions';
export const vacanciesColumns: ColumnDef<Vacancy>[] = [
  {
    // --- CORRECCIÓN 1: Forzamos el ID 'name' ---
    // Esto conecta el dato 'productName' con el buscador que espera 'name'
    accessorKey: 'productName', 
    id: 'name', 
    header: ({ column }) => <SortButton column={column} name="Nombre" />,
    cell: ({ row }) => (
      // Nota: row.getValue usa el ID de la columna, por eso pedimos 'name'
      <span className="font-bold text-[#0C3252]">{row.getValue('name')}</span>
    ),
  },
  {
    accessorKey: 'portions', 
    header: ({ column }) => <SortButton column={column} name="Porciones" />,
    cell: ({ row }) => (
      <span className="font-medium text-gray-600">{row.getValue('portions')}</span>
    ),
  },
  {
    accessorKey: 'foodType', 
    header: ({ column }) => <SortButton column={column} name="Tipo" />,
    cell: ({ row }) => (
      <span className="text-gray-600 capitalize">{row.getValue('foodType')}</span>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <SortButton column={column} name="Fecha de publicación" />,
    cell: ({ row }) => {
        const date = new Date(row.getValue('createdAt'));
        return (
            <span className="text-gray-600">
                {date.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
        );
    },
  },
  {
    accessorKey: 'state',
    header: ({ column }) => <SortButton column={column} name="Estado" />,
    cell: ({ row }) => {
      const state = row.getValue('state') as string;
      
      // --- CORRECCIÓN 2: Tipos de Badge ---
      // Mapeamos a los variantes permitidos estrictamente: "danger" | "success" | "warning" | "outline"
      // Eliminamos "default" o "secondary" si no existen en tu definición de BadgeProps
      let variant: "danger" | "success" | "warning" | "outline" = "outline";
      
      switch (state) {
        case 'Activo': 
            variant = 'success'; 
            break;
        case 'EnRevisión': 
            variant = 'warning'; 
            break;
        case 'Rechazado': 
        case 'Agotada': 
            variant = 'danger'; 
            break;
        case 'Cerrado': 
            variant = 'outline'; 
            break;
        default: 
            variant = 'outline';
      }
      
      return <Badge variant={variant} className="capitalize">{state}</Badge>;
    },
  },
  {
    accessorKey: 'category', 
    header: ({ column }) => <SortButton column={column} name="Categoría" />,
    cell: ({ row }) => (
      <span className="text-sm text-gray-500">{row.getValue('category')}</span>
    ),
  },
  {
    id: 'actions',
    header: 'Editar',
    cell: ({ row }) => <RowActions row={row} />, 
  },
];