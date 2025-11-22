import { ColumnDef } from '@tanstack/react-table';
import SortButton from '../ui/SortButton';
import { accentInsensitiveTextFilter, dateSameDay } from '@/validations/filtersTanStack';
import { dateToLocaleDateString } from '@/lib/utils';
import React from 'react';
import RowActions from './VacanciesActions';
import { Vacancy } from '@/interfaces/vacancy';

// Componente de Badge personalizado para igualar el diseño
const CustomBadge = ({ children, variant }: { children: React.ReactNode, variant: string }) => {
  let styles = "";
  
  switch(variant) {
    case 'success': // Disponible
      styles = "bg-[#D1FAE5] text-[#065F46] border border-transparent"; // Verde menta
      break;
    case 'warning': // En revisión
      styles = "bg-[#FEF3C7] text-[#92400E] border border-transparent"; // Amarillo
      break;
    case 'danger': // Agotada / Rechazado
      styles = "bg-[#FEE2E2] text-[#991B1B] border border-transparent"; // Rojo
      break;
    default:
      styles = "bg-gray-100 text-gray-800";
  }

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${styles}`}>
      {children}
    </span>
  );
};

export const vacanciesColumns: ColumnDef<Vacancy>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortButton column={column} name="Nombre" />, // Cambiado a "Nombre" como la imagen
    filterFn: accentInsensitiveTextFilter,
    cell: ({ row }) => <span className="font-medium text-gray-900">{row.getValue('name')}</span>
  },
  {
    accessorKey: 'applications',
    header: ({ column }) => <SortButton column={column} name="Porciones" />, // Simulando "Porciones"
    cell: ({ row }) => <div className="pl-4">{row.getValue('applications')}</div>
  },
  {
    accessorKey: 'workShift', // Usando esto como "Tipo" por ahora
    header: ({ column }) => <SortButton column={column} name="Tipo" />, 
  },
  {
    accessorKey: 'createdAt',
    cell: ({ getValue }) => dateToLocaleDateString(getValue() as string),
    header: ({ column }) => <SortButton column={column} name="Fecha de publicación" />,
    filterFn: dateSameDay,
  },
  {
    accessorKey: 'state',
    header: ({ column }) => <SortButton column={column} name="Estado" />,
    cell: ({ getValue }) => {
      const state = getValue() as string;
      
      // Mapeo para igualar los textos y colores de la imagen
      let variant = 'default';
      let label = state;

      if (state === 'Activo' || state === 'Disponible') {
        variant = 'success';
        label = 'Disponible';
      } else if (state === 'EnRevisión' || state === 'En revisión') {
        variant = 'warning';
        label = 'En revisión';
      } else if (state === 'Cerrado' || state === 'Agotada' || state === 'Rechazado') {
        variant = 'danger';
        label = 'Agotada';
      }

      return <CustomBadge variant={variant}>{label}</CustomBadge>;
    },
  },
  {
    accessorKey: 'modality', // Usando esto como "Categoría"
    header: 'Categoría',
    cell: ({ row }) => <span className="text-gray-500">{row.getValue('modality')}</span>
  },
  {
    header: 'Editar',
    id: 'actions',
    cell: ({ row }) => <div className="flex justify-center"><RowActions row={row} /></div>,
  },
];