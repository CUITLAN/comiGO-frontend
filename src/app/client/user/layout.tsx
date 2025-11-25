import { MobileBottomBar } from "@/components/client/MObileBottomBar";
import { Toaster } from "sonner"; // 1. Importamos el Toaster

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20 relative"> 
      
      {/* 2. Agregamos el Toaster aquí. 
          'top-center' es ideal para móviles. 
          'richColors' le da los estilos de éxito/error bonitos.
      */}
      <Toaster 
        position="top-center" 
        richColors 
        style={{ zIndex: 99999 }} // Aseguramos que flote sobre todo
      />

      <main className="flex-1 w-full max-w-md mx-auto bg-white min-h-screen shadow-xl overflow-hidden relative">
         {/* max-w-md simula la vista de celular en pantallas grandes */}
         {children}
      </main>

      <MobileBottomBar />
    </div>
  );
}