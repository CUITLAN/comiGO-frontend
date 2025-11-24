'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/legacyButton';
import { AltArrowLeft, AltArrowRight, DoubleAltArrowLeft, DoubleAltArrowRight } from '@solar-icons/react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTableOrders<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex flex-col space-y-4">
      
      {/* Dropdown de Sucursal */}
      <div className="bg-gray-50 p-3 rounded-md border border-gray-100 flex justify-center items-center">
         <span className="font-bold text-gray-700 mr-4">Sucursal:</span>
         <Select defaultValue="todas">
            <SelectTrigger className="w-[300px] bg-transparent border-none shadow-none focus:ring-0 text-center font-medium text-gray-600">
                <SelectValue placeholder="Selecciona sucursal" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="todas">Todas las sucursales</SelectItem>
                <SelectItem value="norte">Sucursal Norte</SelectItem>
                <SelectItem value="centro">Sucursal Centro</SelectItem>
            </SelectContent>
         </Select>
      </div>

      {/* Tabla */}
      <div className="w-full overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white">
        <Table>
          {/* SOLUCIÓN ERROR DE ESPACIO: Asegúrate que no haya espacios entre TableHeader y la llave { */}
          <TableHeader className="bg-[#F8F7FA]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-gray-100 hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead 
                    key={header.id} 
                    // CAMBIO DE COLOR: text-[#4A7729] (Verde) en lugar de Morado
                    className="text-[#4A7729] font-bold text-sm h-12 whitespace-nowrap text-center"
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border-b border-gray-50 hover:bg-gray-50/50 text-center">
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
                    No hay pedidos por entregar.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
      <div className="flex items-center justify-center py-4 space-x-4 text-gray-600">
          <Button variant="ghost" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}><AltArrowLeft /></Button>
          <span>Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}</span>
          <Button variant="ghost" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}><AltArrowRight /></Button>
      </div>
    </div>
  );
}