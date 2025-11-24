'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface LogoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export default function LogoutModal({ open, onOpenChange, onConfirm }: LogoutModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white rounded-xl">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-center text-[#0C3252] text-xl font-bold">
            CERRAR SESIÓN
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600 text-base">
            ¿Está seguro que quiere cerrar sesión?
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="flex sm:justify-center gap-4 mt-6 w-full">
          {/* Botón Cancelar */}
          <Button 
            variant="primary" 
            onClick={() => onOpenChange(false)}
            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg h-11 font-semibold"
          >
            Cancelar
          </Button>
          
          {/* Botón Confirmar (Rojo para acción destructiva/salida) */}
          <Button 
            onClick={onConfirm}
            className="flex-1 bg-[#FE4141] hover:bg-red-600 text-white rounded-lg h-11 font-semibold"
          >
            Aceptar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}