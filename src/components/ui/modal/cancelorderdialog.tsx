'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CancelOrderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientName: string;
  // CAMBIO CLAVE: Agregamos onConfirm que recibe el string de la razón
  onConfirm: (reason: string) => void;
}

export function CancelOrderDialog({ open, onOpenChange, clientName, onConfirm }: CancelOrderProps) {
  const [reason, setReason] = useState("");
  const MIN_CHARS = 50;

  const handleCancel = () => {
    // Validación local de longitud
    if (reason.trim().length < MIN_CHARS) return;

    // Enviamos la razón al padre (quien llamará a la API)
    onConfirm(reason);
    
    // Limpiamos el estado
    setReason("");
    // Igual que el otro modal, dejamos que el padre cierre el modal si todo sale bien.
  };

  const currentLength = reason.trim().length;
  const isInvalid = currentLength < MIN_CHARS;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
        if (!isOpen) setReason(""); 
        onOpenChange(isOpen);
    }}>
      <DialogContent className="sm:max-w-lg bg-white border-l-4 border-l-[#FE4141]">
        <DialogHeader>
          <DialogTitle className="text-[#0C3252] text-lg font-bold uppercase">CANCELAR PEDIDO</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
            <p className="text-sm font-bold text-gray-800">Cliente: <span className="font-normal">{clientName}</span></p>
            
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600">
                    Describa observaciones <span className="text-red-500">*</span>
                </label>
                <textarea 
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className={`w-full h-32 bg-gray-50 border rounded-md p-3 text-sm resize-none outline-none focus:ring-1 text-gray-800 transition-colors ${
                        isInvalid 
                        ? "border-gray-200 focus:border-red-300 focus:ring-red-200" 
                        : "border-green-200 focus:border-green-500 focus:ring-green-200 bg-green-50/30"
                    }`}
                    placeholder={`Por favor, describe detalladamente el motivo de la cancelación (Mínimo ${MIN_CHARS} caracteres)...`}
                />
                
                <div className="flex justify-end">
                    {isInvalid ? (
                       <p className="text-xs text-red-400 italic">
                           Faltan {MIN_CHARS - currentLength} caracteres para continuar
                       </p>
                    ) : (
                       <p className="text-xs text-green-600 font-medium">
                           ¡Descripción válida! ({currentLength} caracteres)
                       </p>
                    )}
                </div>
            </div>
        </div>

        <DialogFooter>
          <div className="flex w-full justify-end gap-3">
            <Button 
                variant="ghost" 
                onClick={() => { onOpenChange(false); setReason(""); }} 
                className="text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
                Volver
            </Button>
            
            <Button 
                onClick={handleCancel}
                disabled={isInvalid}
                className={`px-6 text-white transition-all ${
                    isInvalid
                    ? "bg-gray-300 cursor-not-allowed" 
                    : "bg-[#FE4141] hover:bg-red-600 shadow-md hover:shadow-lg"
                }`}
            >
                Confirmar Cancelación
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}