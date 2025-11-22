'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '@/components/forms/FormInput';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { z } from 'zod'; // 1. Importamos Zod

// 2. Definimos un Schema exclusivo para este paso (Solo pide Email)
const recoveryEmailSchema = z.object({
  email: z.string().email('Ingrese un correo electrónico válido.'),
});

type RecoveryEmailForm = z.infer<typeof recoveryEmailSchema>;

interface EmailStepProps {
  onNext: (email: string) => void;
}

export default function EmailStep({ onNext }: EmailStepProps) {
  const methods = useForm<RecoveryEmailForm>({
    // 3. Usamos el nuevo schema aquí en lugar de loginSchema
    resolver: zodResolver(recoveryEmailSchema), 
    defaultValues: { email: '' },
    mode: 'onChange', // 'onChange' ayuda a ver si hay errores en tiempo real
  });

  const { control, handleSubmit, formState: { isValid } } = methods;

  const onSubmit = (data: RecoveryEmailForm) => {
    console.log("Enviando código a:", data.email);
    // Si llegamos aquí, la validación pasó
    onNext(data.email); 
  };

  return (
    <div className='h-full w-full max-w-2xl space-y-8 rounded-md border border-gray-300 bg-white px-12 py-6 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500'>
        <Link href="/">
          <Button variant="ghost" className='scale-150 p-0'>
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        
        <div className="flex flex-col items-center gap-4">
           <img src="/recovery.png" alt="Recuperación" className="scale-100"/>
           <h1 className="text-3xl font-medium -space-y-28">¿Olvidaste tu contraseña?</h1>
           <p className="text-center text-gray-500">No te preocupes, si sucede solo sigue las instrucciones para crear una nueva contraseña</p>
        </div>

        <FormProvider {...methods}> 
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
              <div className="space-y-10 ">
                <FormInput
                  name="email"
                  label="Correo electrónico"
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  control={control}
                  maxChars={244}
                />
              </div>
              <div className="items-center text-center mt-8">
                {/* Puedes deshabilitar el botón si no es válido para feedback visual */}
                <Button 
                    type="submit" 
                    className="w-full bg-[#0088CC] hover:bg-[#0077B3]"
                    disabled={!isValid} 
                >
                    Continuar
                </Button>
              </div>
            </form>
        </FormProvider>
    </div>
  );
}