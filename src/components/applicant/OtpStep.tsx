'use client';

import { useForm, FormProvider } from 'react-hook-form';
import FormInput from '@/components/forms/FormInput';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface OtpStepProps {
  email: string;
  onNext: () => void;
  onBack: () => void;
}

export default function OtpStep({ email, onNext, onBack }: OtpStepProps) {
  const methods = useForm<Record<string, string>>({
    defaultValues: {
      code0: '', code1: '', code2: '', code3: '', code4: '', code5: '',
    },
  });

  const { control, handleSubmit } = methods;

  const onSubmit = (data: Record<string, string>) => {
      const code = `${data.code0}${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}`;
      console.log("Código verificado:", code);
      // Aquí verificas el código con la API
      onNext();
  };

  return (
    <div className='h-full w-full max-w-2xl space-y-8 rounded-md border border-gray-300 bg-white px-12 py-6 shadow-sm animate-in fade-in slide-in-from-right-8 duration-500'>
        <Button variant="ghost" className='scale-150 p-0' onClick={onBack}>
            <ArrowLeft className="h-6 w-6" />
        </Button>
        
        <div className="flex flex-col items-center gap-4">
           <img src="/recovery.png" alt="Revisa correo" className="scale-100"/>
           <h1 className="text-3xl font-medium text-center">Revisa tu correo</h1>
           <p className="text-center text-gray-500">Hemos enviado un código de verificación a:</p>
           <p className="font-bold text-[#4A7729]">{email || "tu correo"}</p>
           <p className="text-center text-sm">Ingresa el código enviado para continuar</p>
        </div>

        <FormProvider {...methods}> 
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
              {/* Inputs de Código - Usando Flex para distribuir */}
              <div className="flex flex-row gap-2 sm:gap-4 justify-center">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-12 sm:w-14">
                        <FormInput
                            name={`code${i}`}
                            control={control}
                            maxChars={1}
                            // Nota: Ajusté las clases para usar Tailwind estándar en inputs
                            className='text-center text-2xl h-14' 
                        />
                      </div>
                  ))}
              </div>

              <div className="flex justify-between items-center mt-8">
                <div className='flex text-sm'>
                  <p className="mr-1">¿No lo recibiste?</p>
                  <button 
                    type="button"
                    className="font-medium text-[#FF7F40] hover:underline"
                    onClick={() => console.log("Reenviar código")}
                  >
                    Reenviar código
                  </button>
                </div>
                <Button type="submit" className="bg-[#0088CC] hover:bg-[#0077B3]">
                    Continuar
                </Button>
              </div>
            </form>
        </FormProvider>
    </div>
  );
}