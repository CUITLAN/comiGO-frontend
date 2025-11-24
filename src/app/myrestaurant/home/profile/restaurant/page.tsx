'use client';

import { useState, useRef } from 'react';
import TitleSection from '@/components/common/TitleSection';
import { ConfigRow } from '@/components/settings/ConfigRow';
import { PenNewSquare, Camera } from '@solar-icons/react'; 
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { toast } from 'sonner'; // 1. Importamos toast

export default function RestaurantDataPage() {
  const [isEditing, setIsEditing] = useState(false);

  // 1. Estado de los campos de texto
  const [form, setForm] = useState({
    nombre: 'La Mercaderia',
    telefono: '442 xxx xxx',
    redSocial: 'HolasoylaredSocial@gmail.com',
    descripcion: 'Yo s blablaaoy un lorem ipsum bla bla...',
    categoria: 'Cafeteria, Fonda',
  });

  // 2. Estado de las imágenes
  const [profileImage, setProfileImage] = useState('/ComiGo-Logo.png'); 
  const [galleryImages, setGalleryImages] = useState<(string | null)[]>([
    '/FondoLanding.png', 
    '/FondoLanding.png', 
    '/FondoLanding.png', 
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Refs para los inputs de archivo ocultos
  const profileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const sectionConfig = {
    restaurant: {
      icon: <PenNewSquare size={24} weight="Bold" />,
      title: 'DATOS DE RESTAURANTE',
      description: 'Consulte la información de su restaurante',
    },
  };

  // --- MANEJADORES ---

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  // Manejar cambio de Foto de Perfil
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setProfileImage(url);
    }
  };

  // Manejar cambio de Galería
  const handleGalleryImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      const newGallery = [...galleryImages];
      newGallery[index] = url;
      setGalleryImages(newGallery);
    }
  };

  const handleSave = () => {
    // Aquí validarías campos vacíos si fuera necesario
    // TODO: Conexión con API para subir imágenes y datos
    console.log('Guardando datos:', { ...form, profileImage, galleryImages });
    
    // 2. Disparamos la alerta de éxito
    toast.success("Cambios guardados", {
      description: "Los datos del restaurante se han modificado correctamente.",
      duration: 3000,
      // Los estilos los maneja 'richColors' del Layout global
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Aquí podrías revertir los cambios si guardaras un estado de backup
  };

  return (
    <div className="mr-20 space-y-8 p-4 md:p-6">
      
      <TitleSection sections={sectionConfig} currentSection="restaurant" />

      {/* Tarjeta Principal */}
      <div className={`
        rounded-xl border bg-white overflow-hidden transition-all duration-300 shadow-sm pb-8
        ${isEditing ? 'border-[#4A7729] ring-1 ring-[#4A7729]/20' : 'border-[#4A7729]/60'}
      `}>
        
        {/* --- HEADER TARJETA --- */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 bg-[#FAFAFA]">
            <h3 className="text-base font-bold text-gray-800">Informacion de el restaurante</h3>
            
            {!isEditing ? (
                <Button 
                    variant="primary" 
                    onClick={() => setIsEditing(true)}
                    className="text-[#008BD8] border-[#008BD8] bg-white hover:bg-blue-50 h-9 px-6 font-medium"
                >
                    Editar
                </Button>
            ) : (
                <div className="flex gap-3">
                    <Button 
                        variant="ghost" 
                        onClick={handleCancel}
                        className="text-gray-500 hover:text-gray-700 h-9 hover:bg-gray-200"
                    >
                        Cancelar
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleSave}
                        className="bg-[#4A7729] text-white hover:bg-[#3d6321] h-9 px-6"
                    >
                        Guardar
                    </Button>
                </div>
            )}
        </div>

        {/* --- CUERPO: CAMPOS DE TEXTO --- */}
        <div className="p-6 space-y-1">
            <div className="px-4">
                <ConfigRow
                    title="Nombre"
                    valueinput={form.nombre}
                    isTitle={false}
                    placeholder="Nombre comercial"
                    isEditable={isEditing}
                    editInput={isEditing}
                    onValueChange={(v) => handleChange('nombre', v)}
                />
            </div>
            <div className="px-4">
                <ConfigRow
                    title="Telefono"
                    valueinput={form.telefono}
                    isTitle={false}
                    placeholder="10 dígitos"
                    isEditable={isEditing}
                    editInput={isEditing}
                    onValueChange={(v) => handleChange('telefono', v)}
                />
            </div>
            <div className="px-4">
                <ConfigRow
                    title="Red social"
                    valueinput={form.redSocial}
                    isTitle={false}
                    placeholder="Link o usuario"
                    isEditable={isEditing}
                    editInput={isEditing}
                    onValueChange={(v) => handleChange('redSocial', v)}
                />
            </div>
            <div className="px-4">
                <ConfigRow
                    title="Descripcion"
                    valueinput={form.descripcion}
                    isTitle={false}
                    placeholder="Breve descripción"
                    isEditable={isEditing}
                    editInput={isEditing} 
                    onValueChange={(v) => handleChange('descripcion', v)}
                />
            </div>
            <div className="px-4">
                <ConfigRow
                    title="Categoria"
                    valueinput={form.categoria}
                    isTitle={false}
                    placeholder="Ej. Cafetería, Mexicana"
                    isEditable={isEditing}
                    editInput={isEditing} 
                    onValueChange={(v) => handleChange('categoria', v)}
                />
            </div>
        </div>

        {/* --- SECCIÓN: FOTOGRAFÍAS --- */}
        <div className="mt-4 border-t border-gray-100 pt-6 bg-gray-50/30">
            <h4 className="text-center font-bold text-gray-800 mb-6">Fotografias</h4>

            {/* 1. FOTO DE PERFIL CIRCULAR */}
            <div className="flex flex-col items-center justify-center mb-10">
                <div 
                    className={`
                        relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg
                        ${isEditing ? 'cursor-pointer hover:opacity-90 ring-2 ring-[#4A7729] ring-offset-2' : ''}
                    `}
                    onClick={() => isEditing && profileInputRef.current?.click()}
                >
                    <Image 
                        src={profileImage} 
                        alt="Logo Restaurante" 
                        fill 
                        className="object-cover bg-gray-200"
                    />
                    {/* Overlay de cámara al editar */}
                    {isEditing && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white">
                            <Camera size={32} />
                        </div>
                    )}
                </div>
                <input 
                    type="file" 
                    ref={profileInputRef} 
                    hidden 
                    accept="image/*"
                    onChange={handleProfileImageChange}
                />
                <p className="text-xs text-gray-400 mt-3">Da click en la imagen para cambiarla</p>
            </div>

            {/* 2. GALERÍA DE 3 IMÁGENES */}
            <div className="flex justify-center gap-6 px-8 pb-8">
                {galleryImages.map((imgSrc, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div 
                            className={`
                                relative w-40 h-52 rounded-xl overflow-hidden shadow-md bg-white
                                ${isEditing ? 'cursor-pointer hover:scale-105 transition-transform ring-2 ring-[#4A7729]/50' : ''}
                            `}
                            onClick={() => isEditing && galleryInputRefs.current[index]?.click()}
                        >
                            {imgSrc ? (
                                <Image 
                                    src={imgSrc} 
                                    alt={`Galeria ${index}`} 
                                    fill 
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full bg-gray-100 text-gray-400">
                                    <Camera size={24} />
                                </div>
                            )}
                            
                            {/* Input oculto para cada imagen */}
                            <input 
                                type="file" 
                                ref={(el) => { galleryInputRefs.current[index] = el }} 
                                hidden 
                                accept="image/*"
                                onChange={(e) => handleGalleryImageChange(index, e)}
                            />
                        </div>
                    </div>
                ))}
            </div>

        </div>

      </div>
    </div>
  );
}