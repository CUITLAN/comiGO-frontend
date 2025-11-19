'use client';

import EmployerTab from '@/components/employer/EmployerTab';
import React from 'react';
import { useState } from 'react';
import TitleSection from '@/components/common/TitleSection';
import { ConfigRow } from '@/components/settings/ConfigRow';
import { Buildings } from '@solar-icons/react';
import { Button } from '@/components/ui/button';

export default function CompanyPage() {
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingFiscales, setIsEditingFiscales] = useState(false);

  //Conectar con la API para poder acceder a los datos del empleador
  const [form, setForm] = useState({ 
    nombreEmpresa: 'Deloitte QRO',
    descripcion:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit sodales id sem, fringilla non justo phasellus porttitor fames morbi senectus sollicitudin vivamus, integer condimentum montes dis risus pretium urna et tempus. Netus odio aptent maecenas auctor convallis torquent suspendisse nisi habitant felis nisl, lacinia cubilia hac mi placerat aliquam natoque habitasse ut proin vehicula neque, elementum libero per ad a dignissim pellentesque quis inceptos nibh. Litora tellus iaculis cursus pulvinar primis, ultrices dictumst eleifend penatibus metus euismod, dictum lectus imperdiet arcu.',
    sectorTrabajo: 'Informática',
    correoContacto: 'contacto_qro@deloitte.com',
    codigoPostal: '76100',
    pais: 'México',
    direccion: 'Av. Antea 1090-Piso 7, Santiago de Querétaro, Qro.',
    rfc: 'ABC123456T78',
    razonSocial: 'Deloitte',
  });

  const [infoErrors, setInfoErrors] = useState<Record<string, string>>({});
  const [fiscalErrors, setFiscalesErrors] = useState<Record<string, string>>({});

  const sectionConfig = {
    profile: {
      icon: <Buildings size={24} weight="Bold" />,
      title: 'INFORMACIÓN EMPRESARIAL',
      description: 'Consulte y actualice la información de su empresa',
    },
  };

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setInfoErrors((e) => ({ ...e, [key]: '' }));
    setFiscalesErrors((e) => ({ ...e, [key]: '' }));
  };

  const validateInfoFields = () => {
    const errors: Record<string, string> = {};
    // Validar todos los campos del form para que no queden vacíos al guardar
    const keys = Object.keys(form) as (keyof typeof form)[];
    keys.forEach((k) => {
      const raw = (form as any)[k];
      const v = typeof raw === 'string' ? raw.trim() : raw;
      if (!v || (typeof v === 'string' && v === '')) {
        errors[k as string] = 'No puede quedar vacío';
      }
    });
    return errors;
  };

  const validateFiscalesFields = () => {
    const errors: Record<string, string> = {};
    // Validar todos los campos del form para que no queden vacíos al guardar
    const keys = Object.keys(form) as (keyof typeof form)[];
    keys.forEach((k) => {
      const raw = (form as any)[k];
      const v = typeof raw === 'string' ? raw.trim() : raw;
      if (!v || (typeof v === 'string' && v === '')) {
        errors[k as string] = 'No puede quedar vacío';
      }
    });
    return errors;
  };

  const handleSaveInfo = () => {
    const errors = validateInfoFields();
    if (Object.keys(errors).length > 0) {
      setInfoErrors(errors);
      setIsEditingInfo(true);
      return;
    }

    setForm((prev) => ({
      ...prev,
      nombreEmpresa: prev.nombreEmpresa.trim(),
      descripcion: prev.descripcion.trim(),
      sectorTrabajo: prev.sectorTrabajo.trim(),
      correoContacto: prev.correoContacto.trim(),
      codigoPostal: prev.codigoPostal.trim(),
      pais: prev.pais.trim(),
      direccion: prev.direccion.trim(),
    }));

    // Aquí iría la llamada API para guardar
    console.log('Saving company data:', form);
    setInfoErrors({});
    setIsEditingInfo(false);
  };

  const handleSaveFiscales = () => {
    const errors = validateFiscalesFields();
    if (Object.keys(errors).length > 0) {
      setFiscalesErrors(errors);
      setIsEditingFiscales(true);
      return;
    }

    setForm((prev) => ({
      ...prev,
      rfc: prev.rfc.trim(),
      razonSocial: prev.razonSocial.trim(),
    }));

    // Aquí iría la llamada API para guardar
    console.log('Saving company data:', form);
    setFiscalesErrors({});
    setIsEditingFiscales(false);
  };

  return (
    <div className="mr-20 space-y-6 p-4 md:p-6">
      {/* Encabezado */}
      <TitleSection sections={sectionConfig} currentSection="profile" />

      {/* Sección de Información*/}
      <div className="rounded-lg border border-zinc-300 shadow-sm">
        <ConfigRow
          title="Información de la empresa"
          valueinput=""
          isTitle={true}
          placeholder=""
          isEditable={true}
          editInput={false}
          onEditClick={() => {
            setInfoErrors({});
            setIsEditingInfo((s) => !s);
          }}
        />

        {/* Nombre */}
        <div className="px-6">
          <ConfigRow
            title="Nombre"
            valueinput={form.nombreEmpresa}
            isTitle={false}
            placeholder="Contenido"
            isEditable={isEditingInfo}
            editInput={isEditingInfo}
            onValueChange={(v) => handleChange('nombreEmpresa', v)}
            externalError={infoErrors.nombreEmpresa}
          />
        </div>

        {/* Descripción */}
        <div className="px-6">
          {isEditingInfo ? (
            <ConfigRow
              title="Descripción"
              valueinput={form.descripcion}
              isTitle={false}
              placeholder="Contenido"
              isEditable={isEditingInfo}
              editInput={isEditingInfo}
              onValueChange={(v) => handleChange('descripcion', v)}
              externalError={infoErrors.descripcion}
            />
          ) : (
            <div className="flex w-full items-center px-4 border-b border-zinc-100">
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-center min-w-0">
                  <p className="min-w-[150px] py-3">Descripción</p>
                  <div className="flex-1">
                    <div className="text-sm text-zinc-600 whitespace-pre-wrap">{form.descripcion}</div>
                  </div>
                </div>
              </div>
              <div className="ml-auto py-6 shrink-0" />
            </div>
          )}
        </div>

        {/* Sector */}
        <div className="px-6">
          <ConfigRow
            title="Sector de trabajo"
            valueinput={form.sectorTrabajo}
            isTitle={false}
            placeholder="Contenido"
            isEditable={isEditingInfo}
            editInput={isEditingInfo}
            onValueChange={(v) => handleChange('sectorTrabajo', v)}
            externalError={infoErrors.sectorTrabajo}
          />
        </div>

        {/* Correo de contacto */}
        <div className="px-6">
          <ConfigRow
            title="Correo electrónico"
            valueinput={form.correoContacto}
            isTitle={false}
            placeholder="Contenido"
            isEditable={isEditingInfo}
            editInput={isEditingInfo}
            onValueChange={(v) => handleChange('correoContacto', v)}
            externalError={infoErrors.correoContacto}
          />
        </div>
         {isEditingInfo && (
            <div className="flex justify-end px-6 py-4">
              <Button variant="primary" onClick={handleSaveInfo}>
                Guardar Cambios
              </Button>
            </div>
          )}
      </div>

        <div className="rounded-lg border border-zinc-300 shadow-sm mt-6">

          {/* Datos fiscales */}
          <div>
            <ConfigRow
              title="Datos fiscales"
              valueinput=""
              isTitle={true}
              placeholder=""
              isEditable={true}
              editInput={false}
              onEditClick={() => {
                setFiscalesErrors({});
                setIsEditingFiscales((s) => !s);
              }}
            />
          </div>

          <div className="px-6">
            <ConfigRow
              title="RFC"
              valueinput={form.rfc}
              isTitle={false}
              placeholder="Contenido"
              isEditable={isEditingFiscales}
              editInput={isEditingFiscales}
              onValueChange={(v) => handleChange('rfc', v)}
              externalError={fiscalErrors.rfc}
            />
          </div>

          <div className="px-6">
            <ConfigRow
              title="Razón Social"
              valueinput={form.razonSocial}
              isTitle={false}
              placeholder="Contenido"
              isEditable={isEditingFiscales}
              editInput={isEditingFiscales}
              onValueChange={(v) => handleChange('razonSocial', v)}
              externalError={fiscalErrors.razonSocial}
            />
          </div>

          {isEditingFiscales && (
            <div className="flex justify-end px-6 py-4">
              <Button variant="primary" onClick={handleSaveFiscales}>
                Guardar Cambios
              </Button>
            </div>
          )}
        </div>
    </div>
  );
}
