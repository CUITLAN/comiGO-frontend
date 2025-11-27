import { Toaster } from "sonner"; 
import AuthGuard from '@/components/auth/AuthGuard'; 
import BottomBarStoreWrapper from '@/components/client/BottomBarStoreWrapper'; // Importar el nuevo wrapper

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const allowedRoles = ['client']; 
  
  return (
    <AuthGuard allowedRoles={allowedRoles}>
        <div className="flex flex-col min-h-screen bg-gray-50 pb-20 relative"> 
        
            <Toaster 
                position="top-center" 
                richColors 
                style={{ zIndex: 99999 }} 
            />

            <main className="flex-1 w-full max-w-md mx-auto bg-white min-h-screen shadow-xl overflow-hidden relative">
                {children}
            </main>

            <BottomBarStoreWrapper />
        </div>
    </AuthGuard>
  );
}