
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Definimos la interfaz exacta que espera tu Header
interface LogoutModalProps {
  open: boolean;
  onClose: () => void;   // Esta es la prop que faltaba en la definición
  onConfirm: () => void;
}

export default function LogoutModal({ open, onClose, onConfirm }: LogoutModalProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
        // Si el cambio de estado es "cerrar" (false), ejecutamos onClose
        if (!isOpen) onClose();
    }}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-[#0C3252]">¿Cerrar sesión?</DialogTitle>
          <DialogDescription className="text-gray-600">
            ¿Estás seguro de que quieres salir de tu cuenta? Tendrás que iniciar sesión nuevamente para acceder.
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" onClick={onClose} className="text-gray-600 hover:bg-gray-100">
            Cancelar
          </Button>
          <Button 
            variant="primary" color="danger" 
            onClick={onConfirm} 
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Cerrar Sesión
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}