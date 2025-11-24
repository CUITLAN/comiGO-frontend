import { MobileBottomBar } from "@/components/client/MObileBottomBar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20"> 
      {/* pb-20 es importante: da espacio abajo para que el contenido no quede tapado por la barra fija */}
      
      <main className="flex-1 w-full max-w-md mx-auto bg-white min-h-screen shadow-xl overflow-hidden">
         {/* max-w-md simula la vista de celular en pantallas grandes */}
         {children}
      </main>

      <MobileBottomBar />
    </div>
  );
}