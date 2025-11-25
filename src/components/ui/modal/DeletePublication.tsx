'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DeletePublicationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
  onConfirm: () => void;
}

export function DeletePublicationDialog({ open, onOpenChange, productName, onConfirm }: DeletePublicationProps) {
  
  const handleDelete = () => {
    onConfirm();
    
    onOpenChange(false);
    toast.success("Publicación eliminada", {
      description: `La publicación "${productName}" ha sido dada de baja correctamente.`,
      duration: 3000,
      style: {
        background: '#FEF2F2',
        border: '1px solid #FCA5A5',
        color: '#991B1B'
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border-l-4">
        <DialogHeader>
          <DialogTitle className="text-[#0C3252] text-lg font-bold uppercase">Bajar Publicación</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 text-sm">
            <p className="text-gray-600 mb-2">
              ¿Estás seguro que quieres eliminar <span className="font-bold text-gray-900">"{productName}"</span>?
            </p>
            <p className="text-gray-400">
              Esta acción pausará la visibilidad del platillo para los usuarios. Podrás reactivarlo o eliminarlo definitivamente más tarde.
            </p>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)} 
            className="text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white shadow-sm"
          >
            Sí, eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}