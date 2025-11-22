'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/legacyButton'; 
import {
  AltArrowLeft,
  AltArrowRight,
  DoubleAltArrowLeft,
  DoubleAltArrowRight,
} from '@solar-icons/react';
import { useState } from 'react';

import { filterType } from '@/interfaces/table';
import TableSearchBar from '@/components/ui/TableSerchBar';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

interface DataTableCSBProps<TData, TValue> extends DataTableProps<TData, TValue> {
  filters: filterType[];
}

export function DataTableCustomSearchBar<TData, TValue>({
  columns,
  data,
  filters,
}: DataTableCSBProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="flex flex-col space-y-4">
      
      {/* Barra de búsqueda y filtros */}
      <div className="w-full">
         <TableSearchBar filters={filters} table={table} />
      </div>

      {/* Contenedor de la Tabla */}
      <div className="w-full overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white">
        <Table>
          {/* Header con fondo suave */}
          <TableHeader className="bg-[#F8F7FA]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-gray-100 hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead 
                        key={header.id} 
                        // --- CAMBIO AQUÍ: text-[#4A7729] (Verde ComiGO) en lugar de morado ---
                        className="text-[#4A7729] font-bold text-sm h-12 whitespace-nowrap"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow 
                    key={row.id} 
                    data-state={row.getIsSelected() && 'selected'}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4 text-sm text-gray-700">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500">
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
      <div className="flex flex-col sm:flex-row items-center justify-between py-4 gap-4 text-gray-600">
        
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Filas por vista</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px] bg-white border-gray-300">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex border-gray-300 text-gray-600 hover:bg-gray-100"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Ir a la primera página</span>
            <DoubleAltArrowLeft className="w-4 h-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="size-8 border-gray-300 text-gray-600 hover:bg-gray-100"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Ir a la página anterior</span>
            <AltArrowLeft className="w-4 h-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="size-8 border-gray-300 text-gray-600 hover:bg-gray-100"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Ir a la página siguiente</span>
            <AltArrowRight className="w-4 h-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex border-gray-300 text-gray-600 hover:bg-gray-100"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Ir a la última página</span>
            <DoubleAltArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}