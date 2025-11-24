'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface CancelOrderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientName: string;
}

export function CancelOrderDialog({ open, onOpenChange, clientName }: CancelOrderProps) {
  const [reason, setReason] = useState("");
  const MIN_CHARS = 50;

  const handleCancel = () => {
    // Validación de seguridad (aseguramos que cumpla el mínimo)
    if (reason.trim().length < MIN_CHARS) return;

    // TODO: FASE API - Aquí enviaremos la petición de cancelación al backend
    // await cancelOrderApi(orderId, reason);

    // ÉXITO
    toast.success("Pedido cancelado", {
      description: "Se ha cancelado el pedido exitosamente.",
      duration: 3000,
    });

    // Limpieza
    setReason("");
    onOpenChange(false);
  };

  const currentLength = reason.trim().length;
  const isInvalid = currentLength < MIN_CHARS;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
        if (!isOpen) setReason(""); // Limpiar texto si se cierra sin guardar
        onOpenChange(isOpen);
    }}>
      {/* Borde rojo lateral para indicar zona de peligro */}
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
                
                {/* Contador de caracteres / Feedback visual */}
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
            
            {/* Botón condicional: Se bloquea si no llega a 50 caracteres */}
            <Button 
                onClick={handleCancel}
                disabled={isInvalid}
                className={`px-6 text-white transition-all ${
                    isInvalid
                    ? "bg-gray-300 cursor-not-allowed" 
                    : "bg-[#FE4141] hover:bg-red-600 shadow-md hover:shadow-lg"
                }`}
            >
                Cancelar Pedido
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}