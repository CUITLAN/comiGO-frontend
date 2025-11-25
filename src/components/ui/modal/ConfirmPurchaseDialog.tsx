'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BagCheck } from '@solar-icons/react';

interface ConfirmPurchaseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  total: string; // Pasamos el total formateado para mostrarlo
}

export function ConfirmPurchaseDialog({ open, onOpenChange, onConfirm, total }: ConfirmPurchaseProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border-t-4 border-t-[#4A7729]">
        <DialogHeader>
          <DialogTitle className="text-[#0C3252] text-lg font-bold uppercase flex items-center gap-2">
            <BagCheck className="text-[#4A7729]" />
            Confirmar Pedido
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-6 space-y-3 text-center">
            <p className="text-gray-600 text-base">
              ¿Estás seguro que quieres comprar estos productos?
            </p>
            <div className="bg-gray-50 py-2 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-500">Total a pagar</p>
                <p className="text-2xl font-bold text-[#0C3252]">{total}</p>
            </div>
            <p className="text-xs text-gray-400">
              Al confirmar, se notificará a los restaurantes para que preparen tu pedido.
            </p>
        </div>

        <DialogFooter className="gap-3 sm:gap-0">
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)} 
            className="text-gray-500 hover:bg-gray-100 hover:text-gray-700 w-full"
          >
            Cancelar
          </Button>
          <Button 
            onClick={() => {
                onConfirm();
                onOpenChange(false);
            }}
            className="bg-[#4A7729] hover:bg-[#3d6321] text-white shadow-sm w-full font-bold"
          >
            Sí, confirmar compra
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}