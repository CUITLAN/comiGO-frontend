'use client';

import { Button } from '@/components/ui/button';
import { 
  MenuDots, 
  Eye,        
  Pen,        
  CloseSquare 
} from '@solar-icons/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Drawer } from '@/components/ui/drawer';
import DrawerVacante from '@/components/DrawerVacante/DrawerVacante';
import { DeletePublicationDialog } from '@/components/ui/modal/DeletePublication';
import * as React from 'react';
import { Vacancy } from '@/interfaces/vacancy';
import { useRouter } from 'next/navigation'; 

export default function RowActions({ row }: { row: { original: Vacancy } }) {
  // Estado para el Drawer de Detalles
  const [openDrawer, setOpenDrawer] = React.useState(false);
  
  // Estado para el Modal de Eliminar
  const [openDelete, setOpenDelete] = React.useState(false);
  
  const router = useRouter(); 

  return (
    <>
      {/* 1. MODAL DE ELIMINACIÓN (Renderizado fuera del Drawer para evitar conflictos visuales) */}
      <DeletePublicationDialog 
        open={openDelete} 
        onOpenChange={setOpenDelete}
        productName={row.original.productName} // Pasamos el nombre dinámico
        onConfirm={() => console.log('Eliminando ID:', row.original.id)}
      />

      {/* 2. DRAWER Y MENÚ */}
      <Drawer direction="right" open={openDrawer} onOpenChange={setOpenDrawer}>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 text-gray-500 hover:text-[#6D28D9] hover:bg-purple-50 rounded-full">
              <span className="sr-only">Abrir menú</span>
              <MenuDots weight="Bold" className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48 border-gray-100 shadow-lg rounded-xl z-50 bg-white">
            <DropdownMenuLabel className="text-[#6D28D9]">Acciones</DropdownMenuLabel>
            
            {/* Ver Detalle */}
            <DropdownMenuItem 
              onSelect={(e) => e.preventDefault()} 
              onClick={() => setOpenDrawer(true)}
              className="cursor-pointer text-gray-600 hover:text-[#6D28D9] hover:bg-purple-50 focus:bg-purple-50 focus:text-[#6D28D9]"
            >
              <Eye className="mr-2 h-4 w-4" />
              Ver detalle
            </DropdownMenuItem>

            {/* Editar */}
            <DropdownMenuItem 
              onClick={() => router.push(`/myrestaurant/home/post/${row.original.id}`)}
              className="cursor-pointer text-gray-600 hover:text-[#6D28D9] hover:bg-purple-50 focus:bg-purple-50 focus:text-[#6D28D9]"
            >
              <Pen className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            
            <DropdownMenuSeparator className="bg-gray-100" />

            {/* Bajar publicación (Abre el Modal) */}
            <DropdownMenuItem 
              onClick={() => setOpenDelete(true)} // Activamos el modal aquí
              className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 focus:bg-red-50 focus:text-red-700"
            >
              <CloseSquare className="mr-2 h-4 w-4" />
              Bajar publicacion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DrawerVacante vacante={row.original} />
      </Drawer>
    </>
  );
}