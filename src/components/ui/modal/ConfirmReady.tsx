'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Box } from '@solar-icons/react';

interface ConfirmReadyProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientName: string;
  onConfirm: () => void;
}

export function ConfirmReadyDialog({ open, onOpenChange, clientName, onConfirm }: ConfirmReadyProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border-t-4 border-t-blue-500">
        <DialogHeader>
          <DialogTitle className="text-[#0C3252] text-lg font-bold uppercase flex items-center gap-2">
            <Box className="text-blue-500" />
            Confirmar Pedido Listo
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-6 text-center space-y-2">
            <p className="text-gray-600 text-base">
              ¿Estás seguro de marcar el pedido de <span className="font-bold text-[#0C3252]">{clientName}</span> como listo?
            </p>
            <p className="text-xs text-gray-400">
              Se enviará una notificación al cliente para que pase a recogerlo.
            </p>
        </div>

        <DialogFooter className="gap-3 sm:gap-0">
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)} 
            className="text-gray-500 hover:bg-gray-100"
          >
            Cancelar
          </Button>
          <Button 
            onClick={() => {
                onConfirm();
                onOpenChange(false);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold shadow-sm"
          >
            Sí, notificar cliente
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}