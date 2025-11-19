'use client';

import FormInput from '@/components/forms/FormInput';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { LoginFormType, loginSchema } from '@/validations/loginSchema';
import { useState, useEffect } from 'react';

// --- DATOS DEL CARRUSEL ---
const slides = [
  {
    id: 1,
    image: "/Login.png", // Tu imagen actual
    text: "Genera ingresos mientras evitas el desperdicio de comida en Mexico"
  },
  {
    id: 2,
    image: "/Carrusel2.jpg", // Ejemplo: Usa otra imagen que tengas
    text: "Conecta con miles de clientes buscando ofertas deliciosas"
  },
  {
    id: 3,
    image: "/Cartruse3.jpg", // Ejemplo
    text: "Únete a la red de restaurantes sustentables más grande"
  }
];

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

  // Estado para el carrusel
  const [currentSlide, setCurrentSlide] = useState(0);

  // Efecto para cambiar el slide automáticamente cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const onSubmit = (data: LoginFormType) => {
    console.log('Iniciaste sesión', data);
  };

  return (
    <div className="flex min-h-screen w-full bg-white">
      
      {/* --- IZQUIERDA: FORMULARIO --- */}
      <div className="flex flex-1 flex-col items-center justify-center px-12 lg:px-24 py-12">
        
        <div className="w-full max-w-[480px] space-y-8">
          
          <div className="flex flex-col items-center gap-6 text-center">
            <Image 
              src="/ComiGo.png"
              alt="Comigo Logo"
              width={237}
              height={213}
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
                <div>
                  <FormInput
                    control={control}
                    name="email"
                    label="Correo"
                    type="email"
                    maxChars={50}
                  />
                  <p className="mt-2 text-xs text-zinc-700">
                    Ingresa tu correo electrónico registrado.
                  </p>
                </div>
                <div>
                  <FormInput
                    control={control}
                    name="password"
                    label="Contraseña"
                    type="password"
                    maxChars={20}
                  />
                  <p className="mt-2 text-xs text-zinc-700">
                    Ingresa tu contraseña de acceso.
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

      {/* --- DERECHA: CARRUSEL --- */}
      {/* Aumenté el tamaño de la imagen cambiando max-w-md a max-w-xl */}
      <div className="hidden lg:flex flex-1 bg-[#4A7729] flex-col items-center justify-center relative px-8 py-12 transition-all duration-500">
        
        {/* Contenedor de Diapositivas */}
        <div className="relative w-full max-w-xl aspect-[4/5] mb-8">
           {slides.map((slide, index) => (
             <div
               key={slide.id}
               className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                 index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
               }`}
             >
                <Image
                  src={slide.image}
                  alt="Slide image"
                  fill
                  className="object-cover rounded-3xl border-4 border-[#5d8a3e] shadow-2xl"
                  priority={index === 0}
                />
             </div>
           ))}
        </div>

        <div className="text-center  h-24 flex items-center justify-center  z-20">
          {slides.map((slide, index) => (
            <h2 
              key={slide.id}
              className={`text-2xl font-bold text-white leading-snug absolute transition-all duration-700 transform ${
                index === currentSlide 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-4"
              }`}
            >
              {slide.text}
            </h2>
          ))}
        </div>

        
        <div className="flex gap-3 mt-4 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "w-8 bg-white" : "w-3 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

      </div>

    </div>
  );
}