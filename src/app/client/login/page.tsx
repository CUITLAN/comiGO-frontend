'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clientLoginSchema, ClientLoginFormType } from '@/validations/clientLoginSchema';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/forms/FormInput';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast, Toaster } from 'sonner';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore'; // Importamos el store

const API_LOGIN_URL = 'http://localhost:3000/auth/login';
const API_SOCIAL_LOGIN_URL = 'http://localhost:3000/auth/social-login';

export default function ClientLoginPage() {
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const router = useRouter();
  const loginAction = useAuthStore((state) => state.login); // Función para guardar el token

  const methods = useForm<ClientLoginFormType>({
    resolver: zodResolver(clientLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { control, handleSubmit } = methods;

  // --- LOGIN NATIVO (Email/Password) ---
  const onSubmit = async (data: ClientLoginFormType) => {
    
    // FIX: El password se envía con una 's' extra para compatibilidad con el backend
    const payload = {
        email: data.email,
        passsword: data.password // Usamos 'passsword' para el backend
    };

    toast.promise(
        axios.post(API_LOGIN_URL, payload),
        {
            loading: 'Iniciando sesión...',
            success: (res) => {
                loginAction(res.data.access_token, res.data.user);
                router.push('/client/user/home');
                return `Bienvenido, ${res.data.user.fullName.split(' ')[0]}`;
            },
            error: (err) => {
                const message = err.response?.data?.message || 'Credenciales inválidas o error de conexión.';
                return `Error de acceso: ${message}`;
            },
        }
    );
  };

  // --- LOGIN SOCIAL (Google) ---
  const handleGoogleLogin = async () => {
    setIsLoadingGoogle(true);
    
    // 1. Simulación de datos recibidos por Auth0/Google (Frontend)
    const googleUserData = {
        email: "client_social_01@gmail.com",
        fullName: "Alan Cliente Google",
        authProvider: "google",
        // En un flujo real, enviarías el token de Google (id_token) al backend, 
        // pero aquí enviamos la data limpia para que el backend haga el registro/login.
    };
    
    try {
      // 2. Llamada al endpoint de login social en nuestra API
      const res = await axios.post(API_SOCIAL_LOGIN_URL, googleUserData);

      // 3. Guardar token y redirigir
      loginAction(res.data.access_token, res.data.user);
      
      toast.success(`Bienvenido, ${res.data.user.fullName.split(' ')[0]}`, {
        description: "Has iniciado sesión con Google.",
      });
      
      router.push('/client/user/home');

    } catch (error) {
      console.error("Error en login social:", error);
      toast.error("Fallo al iniciar sesión con Google", {
        description: "El servidor no pudo procesar tu solicitud social.",
      });
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* Agregamos el Toaster aquí para asegurar que se vean las alertas en el Login */}
      <Toaster position="top-center" richColors />

      {/* --- HERO SECTION --- */}
      <div className="relative h-64 w-full bg-gray-900">
        <Image
          src="/Login.png" 
          alt="Comida fresca"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <h1 className="text-white text-2xl font-bold text-center leading-tight drop-shadow-md">
            Descubre comida mientras salvas al planeta
          </h1>
        </div>
      </div>

      {/* --- FORM CARD SECTION --- */}
      <main className="flex-1 bg-white rounded-t-[2rem] -mt-8 relative z-10 px-8 pt-10 pb-8 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        
        <div className="flex flex-col items-center gap-4 mb-8">
            <Image 
                src="/ComiGo.png" 
                alt="ComiGo" 
                width={60} 
                height={60} 
                className="object-contain"
            />
            <div className="text-center">
                <h2 className="text-xl font-bold text-[#0C3252]">¡Nos vemos nuevamente!</h2>
                <p className="text-gray-500 text-sm mt-1">Por favor ingresa tus datos</p>
            </div>
        </div>

        <div className="text-center mb-8">
            <p className="text-sm text-gray-600">
                ¿No tienes cuenta?{' '}
                <Link href="/client/signup" className="text-[#4A7729] font-bold hover:underline">
                    Registrate
                </Link>
            </p>
        </div>

        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
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

                <div className="space-y-1">
                    <FormInput
                        control={control}
                        // FIX: El nombre del campo debe ser 'password' en el formulario para hook-form
                        name="password" 
                        label="Contraseña"
                        type="password"
                        placeholder=""
                        description="Ingresa tu contraseña"
                    />
                </div>

                <div className="pt-4">
                    <Button 
                        type="submit" 
                        className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white h-12 text-base font-semibold rounded-lg shadow-md transition-all active:scale-95"
                    >
                        Iniciar sesión
                    </Button>
                </div>

                <div className="text-center">
                    <Link 
                        href="/recovery" 
                        className="text-sm text-gray-600 hover:text-[#0C3252] font-medium"
                    >
                        Olvidaste tu contraseña?
                    </Link>
                </div>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">O continúa con</span>
                    </div>
                </div>

                {/* Botón Google */}
                <Button 
                    type="button" 
                    variant="primary" 
                    className="w-full h-12 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 flex items-center justify-center gap-3 transition-all active:scale-95"
                    onClick={handleGoogleLogin}
                    disabled={isLoadingGoogle}
                >
                    {isLoadingGoogle ? (
                        <span className="animate-pulse">Conectando con Google...</span>
                    ) : (
                        <>
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Google
                        </>
                    )}
                </Button>

            </form>
        </FormProvider>
      </main>
    </div>
  );
}