'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { 
  AltArrowLeft, 
  User, 
  ShieldKeyhole,
  Letter, 
  Phone
} from '@solar-icons/react';
import FormInput from '@/components/forms/FormInput';
import { Button } from '@/components/ui/button';

// Importamos el esquema desde su archivo dedicado
import { profileSchema, ProfileFormType } from '@/validations/profileSchema';

export default function ClientProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  
  // Estado local para simular datos
  const [user, setUser] = useState({
    id: '',
    fullName: '',
    email: '',
    phone: '',
    isSocialLogin: false,
  });

  const methods = useForm<ProfileFormType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { control, handleSubmit, reset } = methods;

  // --- SIMULACIÓN: Cargar datos del usuario ---
  useEffect(() => {
    setTimeout(() => {
      const userDataFromApi = {
        id: 'user-123',
        fullName: 'Alan Cuitlan',
        email: 'alan.dev@gmail.com',
        phone: '4421234567',
        isSocialLogin: false, 
      };
      
      setUser(userDataFromApi);
      
      // Actualizamos el formulario
      reset({
        fullName: userDataFromApi.fullName,
        email: userDataFromApi.email,
        phone: userDataFromApi.phone,
        password: '',
        confirmPassword: ''
      });
      
      setIsLoading(false);
    }, 1000); 
  }, [reset]);

  const onSubmit = async (data: ProfileFormType) => {
    console.log("Enviando a API:", data);
    
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
      loading: 'Actualizando perfil...',
      success: () => {
        setIsEditing(false);
        setUser(prev => ({ ...prev, fullName: data.fullName, phone: data.phone || '' }));
        return 'Perfil actualizado correctamente';
      },
      error: 'Error al actualizar',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="animate-pulse text-[#0C3252] font-bold">Cargando perfil...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-24 relative">
      
      {/* HEADER */}
      <div className="sticky top-0 z-30 bg-[#EBEBEB] px-4 h-16 flex items-center justify-between shadow-sm">
        <Link href="/client/user/settings">
            <button className="text-gray-700 hover:bg-gray-200 rounded-full p-2 transition-colors">
                <AltArrowLeft size={24} />
            </button>
        </Link>
        <h1 className="text-lg font-bold text-[#0C3252] tracking-wide uppercase">TU PERFIL</h1>
        <div className="w-10" />
      </div>

      <div className="p-6 max-w-md mx-auto">
        
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                
                {/* HEADER NOMBRE (Solo visualización) */}
                {!isEditing && (
                    <div className="flex flex-col items-center mb-4">
                        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-3 shadow-inner text-gray-400">
                            <User size={40} weight="Bold" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#0C3252] text-center">{user.fullName}</h2>
                        <span className="bg-[#EAF2FF] text-[#008BD8] text-xs px-3 py-1 rounded-full font-medium mt-2">
                            {user.isSocialLogin ? 'Cuenta Google' : 'Cliente ComiGo'}
                        </span>
                    </div>
                )}

                {/* FORMULARIO */}
                <div className="space-y-5">
                    <div className="relative">
                        <FormInput 
                            control={control}
                            name="fullName"
                            label="Nombre Completo"
                            placeholder="Tu nombre"
                            disabled={!isEditing}
                        />
                        {!isEditing && <User className="absolute right-3 top-9 text-gray-400 pointer-events-none" size={20} />}
                    </div>

                    <div className="relative">
                        <FormInput 
                            control={control}
                            name="email"
                            label="Correo Electrónico"
                            disabled={true} 
                            description="El correo no se puede cambiar."
                        />
                        <Letter className="absolute right-3 top-9 text-gray-400 pointer-events-none" size={20} />
                    </div>

                    <div className="relative">
                        {/* INPUT TELÉFONO CON LÍMITE DE CARACTERES */}
                        <FormInput 
                            control={control}
                            name="phone"
                            label="Teléfono"
                            placeholder="10 dígitos"
                            // FIX: Cambiamos 'tel' por 'text' para cumplir con los tipos de FormInput
                            type="text" 
                            disabled={!isEditing}
                            
                        />
                        {!isEditing && <Phone className="absolute right-3 top-9 text-gray-400 pointer-events-none" size={20} />}
                    </div>

                    {/* SECCIÓN CONTRASEÑA */}
                    {!user.isSocialLogin && isEditing && (
                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4 mt-4 animate-in fade-in slide-in-from-bottom-2">
                            <div className="flex items-center gap-2 text-[#0C3252] border-b border-gray-100 pb-2 mb-2">
                                <ShieldKeyhole size={20} />
                                <h3 className="font-bold text-sm">Cambiar Contraseña</h3>
                            </div>
                            <FormInput control={control} name="password" label="Nueva Contraseña" type="password" placeholder="Déjalo vacío para no cambiar" />
                            <FormInput control={control} name="confirmPassword" label="Confirmar Contraseña" type="password" placeholder="Repite la nueva contraseña" />
                        </div>
                    )}

                    {/* Mensaje Google */}
                    {user.isSocialLogin && isEditing && (
                        <div className="bg-blue-50 text-blue-700 text-xs p-3 rounded-lg flex items-center gap-2 border border-blue-100">
                            <ShieldKeyhole size={16} className="shrink-0" />
                            <span>Tu cuenta está vinculada a Google. Gestiona tu seguridad desde allí.</span>
                        </div>
                    )}
                </div>

                {/* BOTONES */}
                <div className="pt-4">
                    {!isEditing ? (
                        <Button 
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="w-full bg-white border-2 border-[#008BD8] text-[#008BD8] hover:bg-blue-50 font-bold h-12 rounded-xl shadow-sm"
                        >
                            Editar Perfil
                        </Button>
                    ) : (
                        <div className="flex gap-3">
                            <Button 
                                type="button"
                                onClick={() => {
                                    reset();
                                    setIsEditing(false);
                                }}
                                className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300 font-bold h-12 rounded-xl"
                            >
                                Cancelar
                            </Button>
                            <Button 
                                type="submit"
                                className="flex-1 bg-[#4A7729] hover:bg-[#3d6321] text-white font-bold h-12 rounded-xl shadow-md"
                            >
                                Guardar
                            </Button>
                        </div>
                    )}
                </div>

            </form>
        </FormProvider>

      </div>
    </div>
  );
}