'use client';

import Link from 'next/link';
import * as React from 'react'; // <-- NUEVO (Importamos React completo para usar useState)
import Image from 'next/image';
import { User, Logout2 } from '@solar-icons/react';
import { Button } from "@/components/ui/button"; 
import { useRouter } from 'next/navigation';
import LogoutModal from './modal/LogoutModal';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';


interface HeaderProps {
    userIcon?: React.ReactNode;
    logOut?: React.ReactNode;
    companyImageUrl?: string; 
    companyTitle?: string; 
    showProfileButton?: boolean;
    logoutRedirectPath?: string; 
}

export default function Header({ 
    companyTitle = 'Deloitte Qro', 
    companyImageUrl = '/Deloitte.svg', 
    userIcon = <User className="h-5 w-5"/>, 
    logOut = <Logout2 className='h-5 w-5'/>,
    showProfileButton = true, 
    logoutRedirectPath = '/' // Esta ruta ya apunta a la raíz (localhost:3000/)
}: HeaderProps) {
    
    const router = useRouter(); 

    // <-- NUEVO: Estado para controlar la visib
    const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);
    const closeLogoutModal = () => {
        setIsLogoutModalOpen(false);
    };
    const handleLogoutConfirm = () => {
        closeLogoutModal(); 
        
        console.log("Cerrar sesión y redirigir a:", logoutRedirectPath);
        
        router.push(logoutRedirectPath); 
    };
    
    
    const handleLogoutClick = () => {
        setIsLogoutModalOpen(true);
    };

    return (
        <>
            <header className='bg-accent !z-50 flex items-center justify-between px-10 border-b border-zinc-200 drop-shadow-md'>
                {/* ... (Tu código de los logos de la izquierda no cambia) ... */}
                <div className='flex items-center gap-4 py-4'>
                    <Link href="/" className="text-lg font-bold">
                        <img src="/Comigo-Logo.png" alt="Colon" className="h-10 w-28 scale-100"/>
                    </Link>
                </div>
                
                <div className="flex items-center justify-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="mono">
                                <Image src={companyImageUrl} alt={companyTitle} width={32} height={32} className="h-8 w-8 rounded-full" />
                                {companyTitle}
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                            
                            {showProfileButton && (
                                <Link href={"user/profile"}>
                                    <DropdownMenuItem onClick={() => console.log("Página de perfil")}>
                                        {userIcon}
                                        Perfil 
                                    </DropdownMenuItem>
                                </Link>
                            )}
                            
                           
                            <DropdownMenuItem onClick={handleLogoutClick} variant="destructive">
                                {logOut}
                                Cerrar sesión 
                            </DropdownMenuItem>
                            
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            {isLogoutModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <LogoutModal 
                        onConfirm={handleLogoutConfirm} 
                        onClose={closeLogoutModal} 
                        open={isLogoutModalOpen}
                    />
                </div>
            )}
        </>
    );
}