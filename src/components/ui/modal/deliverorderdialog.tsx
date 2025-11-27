'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";

interface DeliverOrderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // CAMBIO CLAVE: Ahora onConfirm espera recibir el código
  onConfirm: (code: string) => void;
}

export function DeliverOrderDialog({ open, onOpenChange, onConfirm }: DeliverOrderProps) {
  const [code, setCode] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Permitimos solo mayúsculas y números
    const value = e.target.value.toUpperCase();
    if (/^[A-Z0-9]*$/.test(value) && value.length <= 5) {
      setCode(value);
    }
  };

  const handleConfirm = () => {
    // Ya no validamos si es "11111". 
    // Solo enviamos el código al padre para que la API decida.
    onConfirm(code);
    setCode(""); 
    // Nota: No cerramos el modal aquí (onOpenChange(false)) inmediatamente.
    // Dejamos que el padre lo cierre si la API responde éxito, 
    // o que se mantenga abierto si hay error.
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
        if (!isOpen) setCode(""); 
        onOpenChange(isOpen);
    }}>
      <DialogContent className="sm:max-w-md bg-white border-l-4 border-l-[#008BD8]"> 
        <DialogHeader>
          <DialogTitle className="text-[#0C3252] text-lg font-bold uppercase">Entregar Pedido</DialogTitle>
        </DialogHeader>
        
        <div className="py-6 space-y-4">
            <p className="text-sm text-gray-600">Escribe el código de seguridad de 5 caracteres para entregar</p>
            
            <input 
                type="text" 
                value={code}
                onChange={handleInputChange}
                className="w-full bg-gray-100 border-none rounded-md p-3 text-center text-2xl font-bold tracking-[0.5em] outline-none focus:ring-2 focus:ring-[#4A7729]/50 placeholder:tracking-normal text-gray-800 uppercase"
                placeholder="-----"
                maxLength={5}
            />
            
            {code.length > 0 && code.length < 5 && (
                <p className="text-xs text-center text-blue-500 animate-pulse">
                    Faltan {5 - code.length} caracteres
                </p>
            )}
        </div>

        <DialogFooter className="flex justify-center sm:justify-center gap-8">
          <button 
            onClick={() => { onOpenChange(false); setCode(""); }} 
            className="text-red-500 font-bold hover:underline"
          >
            Cancelar
          </button>
          <button 
            onClick={handleConfirm}
            disabled={code.length !== 5} 
            className={`font-bold transition-all ${
                code.length === 5 
                ? "text-green-600 hover:underline hover:scale-105" 
                : "text-gray-300 cursor-not-allowed"
            }`}
          >
            Confirmar Entrega
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}