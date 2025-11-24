'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Bag } from '@solar-icons/react';
import { initialCartData } from '@/data/cartData';
import { CartFoodCard } from '@/components/client/cartFood';
import { Button } from '@/components/ui/button';
import EmptyDisplay from '@/components/empty-display/EmptyDisplay';

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartData);

  // --- CÁLCULOS ---
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const serviceFee = subtotal * 0.05; 
  const donation = subtotal * 0.05;   
  const total = subtotal + serviceFee + donation;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    // Ajusté pb-32 a pb-24 para reducir el espacio inferior excesivo, 
    // pero manteniendo suficiente para que el footer no choque con la navegación móvil.
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] pb-24"> 
      
      {/* HEADER */}
      <div className="sticky top-0 z-30 bg-[#EBEBEB] px-6 py-3 flex justify-between items-center shadow-sm">
        <h1 className="text-lg font-bold text-[#0C3252] tracking-wide uppercase">Tu Carrito</h1>
        <div className="text-black">
            <Bag className="w-6 h-6" />
        </div>
      </div>

      <div className="p-4 space-y-6 flex-1"> {/* flex-1 empuja el footer hacia abajo solo si falta contenido */}
        
        {/* BANNER HERO */}
        <div className="relative w-full h-32 rounded-2xl overflow-hidden shadow-md group shrink-0">
            <Image
                src="/Carrusel2.jpg"
                alt="Banner Donación"
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center px-6 text-center">
                <h2 className="text-white font-bold text-lg leading-snug drop-shadow-md">
                    Las ONGS Mexicanas se benefician de tu compra
                </h2>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#529A60]" />
        </div>

        {/* LISTA DE PRODUCTOS */}
        <div className="space-y-3">
            {cartItems.length > 0 ? (
                cartItems.map((item) => (
                    <CartFoodCard 
                        key={item.id} 
                        item={item} 
                        onRemove={handleRemoveItem}
                    />
                ))
            ) : (
                <div className="py-10">
                    <EmptyDisplay
                        icon={<Bag className="w-20 h-20 text-gray-300" />} 
                        firstLine="Tu carrito está vacío"
                        secondline="Explora nuestros platillos."
                    />
                </div>
            )}
        </div>

      </div>

      {/* --- FOOTER DE RESUMEN --- */}
      {cartItems.length > 0 && (
          <div className="px-6 bg-[#FDFBF7] pt-4">
            <hr className="border-gray-300 mb-4" />

            {/* Desglose compacto */}
            <div className="space-y-1 text-right text-sm text-gray-700 font-medium mb-4">
                <p>Tu pedido: <span className="font-bold">{formatCurrency(subtotal)}</span></p>
                <p>Servicio (5%): <span className="font-bold">{formatCurrency(serviceFee)}</span></p>
                <p>Donación ONG (5%): <span className="font-bold">{formatCurrency(donation)}</span></p>
            </div>

            {/* Total y Botón */}
            <div className="space-y-4">
                <div className="flex justify-end">
                    {/* Caja Total más compacta */}
                    <div className="border border-gray-300 rounded-lg px-4 py-1.5 bg-white shadow-sm">
                        <span className="font-extrabold text-lg text-black">
                            Total: {formatCurrency(total)}
                        </span>
                    </div>
                </div>

                <p className="text-[10px] text-gray-400 text-right truncate">
                    Gracias por ayudarnos a salvar comida.
                </p>

                {/* Botón Confirmar Ajustado */}
                <Button 
                    className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white text-base font-bold h-11 rounded-xl shadow-md mb-2"
                    onClick={() => console.log("Ir a pagar", { total })}
                >
                    Confirmar Compra
                </Button>
            </div>
          </div>
      )}

    </div>
  );
}