'use client';

import Link from 'next/link';
import * as React from 'react';
import Image from 'next/image'; // Importaste 'next/image' pero usas <img>, lo cual está bien.
import { Button } from "@/components/ui/button";

export default function LandingHeader() {
    const header = '#0C3252';
    
    return(
        <>
            <header className='bg--accent flex items-center justify-between px-10 border-b border-zinc-200 drop-shadow-md'>
                
                <div className="flex items-center gap-8">
                    <div className='flex items-center gap-4 py-4'>
                        <Link href="/" className="text-lg font-bold">
                            <img src="/Comigo-Logo.png" alt="Comigo"  className="h-20 w-55 scale-100"/>
                        </Link>
                    </div> 
                    <div className="flex items-center gap-4 py-4 text-base leading-loose"> 
                        <Link href={"/"}>
                            <span 
                                style={{ color: header }} 
                                className="font-semibold" 
                            >
                                Iniciativa
                            </span>
                        </Link>
                        <Link href={"/nosotros"}>
                            <span 
                                style={{ color: header }} 
                                className="font-semibold" 
                            >
                                Sobre nosotros
                            </span>
                        </Link>
                        <Link href={"/ventajas"}>
                        
                            <span 
                                    style={{ color: header }} 
                                    className="font-semibold" 
                                >
                                    Ventajas
                            </span>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center gap-4 py-4">
                    <Link href={"/login"}>
                        <Button variant="primary" className ="" onClick={() => console.log("Página de registro")}>
                            Iniciar Sesión {
                                
                            }
                        </Button>
                    </Link>
                </div>
                
            </header>
        </>
    );
}