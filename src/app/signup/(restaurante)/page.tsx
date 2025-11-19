'use client';

import { useState } from 'react';
import Headersimple from '@/components/ui/header-simple';
import SignUpEmployer from '@/components/employer/SignUpEmployer';
import Image from 'next/image';

export default function SignUpEmployerPage() {
    const [currentStep, setCurrentStep] = useState(1);

    const stepContent = {
        1: {
            image: "/Signup1.png", 
            title: "Y bien ... \n ¿Cómo es tu negocio?",
            alt: "Preparación de comida"
        },
        2: {
            image: "/Signup2.png", 
            title: "¡Un gusto! \n Ahora cuéntanos sobre ti",
            alt: "Empresario o responsable"
        },
        3: {
            image: "/Signup3.png", 
            title: "Casi listo \n Queremos conocer tu negocio",
            alt: "Platillos del restaurante"
        }
    };
    
    const content = stepContent[currentStep as keyof typeof stepContent] || stepContent[1];

    // ... (El resto del return se queda EXACTAMENTE IGUAL que en el paso anterior)
    return (
        <div className="flex min-h-screen flex-col bg-gray-100">
            <div className="flex flex-grow items-center justify-center p-4 lg:p-8"> 
                <div className="flex w-full max-w-11/12 overflow-hidden rounded-3xl bg-white shadow-2xl min-h-[600px]">
                    
                    {/* Columna Imagen */}
                    <div className="hidden lg:flex lg:w-5/12 relative bg-[#4A7729] flex-shrink-0 transition-all duration-500 ease-in-out">
                        <Image src="/ComiGo.png" alt="ComiGo" width={80} height={80} className="absolute top-8 left-8 z-20 drop-shadow-md" />
                        
                        <div className="absolute top-36 left-8 right-8 text-white z-20">
                            <h1 className="text-3xl lg:text-4xl font-bold leading-tight whitespace-pre-line animate-in slide-in-from-bottom-4 duration-500 drop-shadow-lg">
                                {content.title}
                            </h1>
                        </div>

                        <div key={content.image} className="absolute inset-0 animate-in fade-in duration-700">
                            <Image src={content.image} alt={content.alt} fill className="object-cover opacity-90" priority />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent" />
                        </div>
                    </div>

                    {/* Columna Formulario */}
                    <main className="w-full lg:w-7/12 flex items-center justify-center p-8 bg-white">
                        <SignUpEmployer currentStep={currentStep} onStepChange={setCurrentStep} />
                    </main>

                </div>
            </div>
        </div>
    );
}