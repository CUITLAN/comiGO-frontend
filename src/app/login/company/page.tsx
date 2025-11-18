'use client';

import FormInput from '@/components/forms/FormInput';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { LoginFormType, loginSchema } from '@/validations/loginSchema';

export default function PublicLogin() {
  const methods = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  });

  const { control, handleSubmit } = methods;

  const onSubmit = (data: LoginFormType) => {
    console.log('Iniciaste sesión', data);
  };

  return (
    <div className="flex min-h-screen w-full bg-white">
      
      <div className="flex flex-1 flex-col items-center justify-center px-12 lg:px-24 py-12">
        
        <div className="w-full max-w-[480px] space-y-8">
          
          <div className="flex flex-col items-center gap-6 text-center">
            <Image 
              src="/Comigo-Logo.png"
              alt="Comigo Logo"
              width={120}
              height={120}
              className="object-contain"
            />
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-[var(--color-titulos)]">
                ¡Nos vemos nuevamente!
              </h1>
              <p className="text-lg text-zinc-500 font-medium">
                Porfavor ingresa tus datos
              </p>
            </div>
          </div>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
              
              <div className="space-y-6">
                <div className="space-y-1">
                  <FormInput
                    control={control}
                    name="email"
                    label="Correo"
                    type="email"
                    placeholder=""
                    maxChars={50}
                    className="bg-gray-50 border-gray-200 h-12" 
                  />
                  <p className="text-xs text-zinc-400 pl-1">
                    Ingresa tu correo electrónico registrado.
                  </p>
                </div>

                <div className="space-y-1">
                  <FormInput
                    control={control}
                    name="password"
                    label="Contraseña"
                    type="password"
                    maxChars={20}
                    className="bg-gray-50 border-gray-200 h-12"
                  />
                  <p className="text-xs text-zinc-400 pl-1">
                    Escribe tu contraseña de acceso.
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <Link
                  href="/recovery"
                  className="text-sm text-zinc-600 font-medium hover:text-zinc-900 transition-colors"
                >
                  Olvidaste tu contraseña?
                </Link>
              </div>

              <Button 
                variant="primary"
                type="submit"
                className="w-full h-12 text-base font-bold bg-[#0088CC] hover:bg-[#0077B3] text-white rounded-lg"
              >
                Iniciar sesión
              </Button>

              <div className="text-center pt-4">
                <p className="text-sm text-zinc-600 font-bold">
                  ¿No tienes cuenta?{' '}
                  <Link 
                    href="/signup/employer" 
                    className="text-[#4A7729] hover:text-[#3a6120] transition-colors ml-1"
                  >
                    Registrate
                  </Link>
                </p>
              </div>

            </form>
          </FormProvider>

        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-[#4A7729] flex-col items-center justify-center relative px-12 py-12">
        
        <div className="relative w-full max-w-md aspect-[4/5] mb-12">
             <Image
              src="/Login.png"
              alt="Bolsa de comida"
              fill
              className="object-cover rounded-3xl border-4 border-[#5d8a3e]"
              priority
            />
        </div>

        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-white leading-snug">
            Genera ingresos mientras evitas el desperdicio de comida en Mexico
          </h2>
        </div>

      </div>

    </div>
  );
}