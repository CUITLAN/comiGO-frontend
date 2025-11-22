'use client';

import { useState } from 'react';
import HeaderSimple from '@/components/ui/header-simple';

// Importamos los componentes (que crearemos a continuación)
import EmailStep from '@/components/applicant/EmailStep';
import OtpStep from '@/components/applicant/OtpStep';
import NewPasswordStep from '@/components/applicant/NewPasswordStep';
import SuccessStep from '@/components/applicant/SuccessStep';

export default function RecoveryPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState(''); // Guardamos el email para pasarlo al paso 2

  // Lógica para cambiar el fondo según el paso
  const getBackgroundImage = () => {
    return 'url("/Recovery32.png")';
  };

  return (
    <>
      <HeaderSimple />
      <div 
        className="flex min-h-screen flex-col items-center justify-center py-1 transition-all duration-500"
        style={{
          backgroundImage: getBackgroundImage(),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        <main className="flex h-fit flex-col items-center justify-center gap-10 w-full">
          
          {/* Renderizado Condicional de Pasos */}
          
          {step === 1 && (
            <EmailStep 
              onNext={(emailInput) => {
                setEmail(emailInput);
                setStep(2);
              }} 
            />
          )}

          {step === 2 && (
            <OtpStep 
              email={email}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <NewPasswordStep 
              onNext={() => setStep(4)}
            />
          )}

          {step === 4 && (
            <SuccessStep />
          )}

        </main>
      </div>
    </>
  );
}