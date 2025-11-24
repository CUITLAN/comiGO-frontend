'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// Importamos el esquema y el tipo que acabamos de definir
import { clientRegisterSchema, ClientRegisterFormType } from '@/validations/clientRegisterSchema';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/forms/FormInput';
import Image from 'next/image';
import Link from 'next/link';

export default function ClientRegisterPage() {
  const methods = useForm<ClientRegisterFormType>({
    resolver: zodResolver(clientRegisterSchema),
    defaultValues: {
      fullName: '',
      email: '',
      birthDate: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { control, handleSubmit } = methods;

  const onSubmit = (data: ClientRegisterFormType) => {
    console.log('Datos de Registro:', data);
    // Aquí iría la lógica para crear el usuario en tu backend
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* --- HERO SECTION (Imagen Superior) --- */}
      <div className="relative h-72 w-full bg-gray-900">
        <Image
          src="/Signup1.png" // Asegúrate de tener esta imagen en public/
          alt="Comida rescatada"
          fill
          className="object-cover opacity-90"
          priority
        />
        {/* Overlay oscuro degradado para que el texto blanco resalte */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" />
        
        {/* Texto sobre la imagen */}
        <div className="absolute inset-0 flex items-start pt-16 justify-center px-6 pb-8">
          <h1 className="text-white text-2xl font-bold text-center leading-tight drop-shadow-lg max-w-xs">
            Se desperdicia el 34% de la comida en Mexico
          </h1>
        </div>
      </div>

      {/* --- TARJETA DEL FORMULARIO --- */}
      {/* -mt-16: Sube la tarjeta sobre la imagen */}
      {/* rounded-t-[2.5rem]: Borde superior muy curvo estilo app móvil */}
      <main className="flex-1 bg-white rounded-t-[2.5rem] -mt-16 relative z-10 px-8 pt-8 pb-12 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        
        {/* Logo y Título */}
        <div className="flex flex-col items-center gap-2 mb-6">
            <Image 
                src="/ComiGo.png" 
                alt="ComiGo" 
                width={80} 
                height={80} 
                className="object-contain"
            />
            <h2 className="text-xl font-bold text-[#0C3252]">Unete a la comunidad</h2>
        </div>

        {/* Link para Iniciar Sesión */}
        <div className="text-center mb-6">
            <p className="text-sm text-gray-600 font-medium">
                ¿Ya tienes cuenta?{' '}
                <Link href="/client/login" className="text-[#4A7729] font-bold hover:underline">
                    Inicia sesion
                </Link>
            </p>
        </div>

        {/* Formulario */}
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                
                {/* Nombre Completo */}
                <div className="space-y-1">
                    <FormInput
                        control={control}
                        name="fullName"
                        label="Nombre completo"
                        type="text"
                        placeholder=""
                        description="Ingresa tu nombre completo."
                    />
                </div>

                {/* Correo */}
                <div className="space-y-1">
                    <FormInput
                        control={control}
                        name="email"
                        label="Correo"
                        type="email"
                        placeholder=""
                        description="Ingresa tu correo electrónico registrado."
                    />
                </div>

                {/* Fecha de Nacimiento */}
                <div className="space-y-1">
                    <FormInput
                        control={control}
                        name="birthDate"
                        label="Fecha de nacimiento"
                        type="date"
                        placeholder=""
                        description="Ingresa tu fecha de nacimiento."
                    />
                </div>

                {/* Contraseña */}
                <div className="space-y-1">
                    <FormInput
                        control={control}
                        name="password"
                        label="Contraseña"
                        type="password"
                        placeholder=""
                        description="Ingresa tu contraseña."
                    />
                </div>

                {/* Confirmar Contraseña */}
                <div className="space-y-1">
                    <FormInput
                        control={control}
                        name="confirmPassword"
                        label="Confirmar Contraseña"
                        type="password"
                        placeholder=""
                        description="Repite tu contraseña."
                    />
                </div>

                {/* Botón Continuar */}
                <div className="pt-6 pb-4">
                    <Button 
                        type="submit" 
                        className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white h-12 text-base font-bold rounded-lg shadow-md transition-all active:scale-95"
                    >
                        Continuar
                    </Button>
                </div>

            </form>
        </FormProvider>
      </main>
    </div>
  );
}