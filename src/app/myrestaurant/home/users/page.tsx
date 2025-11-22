'use client';

import React, { useMemo, useState } from 'react'
import ApplicantCard from '../../../../components/linker/ApplicantCard';
import { StarShine, UserBlockRounded, UsersGroupRounded, UsersGroupTwoRounded } from '@solar-icons/react';
import TitleSection from '@/components/common/TitleSection';
import { testDataUser } from '@/data/testDataUsers';
import SearchBar from '@/components/toreview/searchbar';
import FormOptions from '@/components/forms/FormOptions';
import { Form, FormProvider, useForm } from 'react-hook-form';
import { states } from '@/constants';
import { DataTableCustomSearchBar } from '@/components/tables/layouts/DateTableCustomSearchBar';
import { vacanciesColumns } from '@/components/tables/schemas/Vacancies';

const users = testDataUser;

const sectionConfig = {
    talents: {
        icon: <UsersGroupTwoRounded size={24} weight="Bold" className='justify+selfend' />,
        title: 'CARTERA DE USUARIOS',
        description: ''
    },
};

type Filters = {
  modality: string;
  workdayType: string;
  state: string;
};


export default function UserLists() {
    const methods = useForm<Filters>({
    defaultValues: {
      modality: '',
      workdayType: '',
      state: ''
    },
  });

    const { control, handleSubmit } = methods;

    
    const [searchTags, setSearchTags] = useState<string[]>([]);

    const normalize = (s = '') =>
    s.normalize('NFD') // separa letras y acentos
        .replace(/\p{Diacritic}/gu, '') // elimina los acentos (ó → o)
        .toLowerCase() // ignora mayúsculas/minúsculas
        .trim(); // quita espacios al inicio y final

    const handleSearch = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) {
        setSearchTags([]);
        return;
    }

    const tags = trimmed
        .split(/[,\s]+/)
        .map((t) => t.trim())
        .filter(Boolean);

    setSearchTags(tags);
    };

    const filteredUsers = useMemo(() => {
        const tags = searchTags.map(normalize);
        
        return users.filter((u) => {
        if (!searchTags.length) return true;
        const haystack = normalize(
            [u.firstName, u.lastName, u.recentPosition, u.careerSummary]
            .filter(Boolean)
            .join(' ')
        );
        return tags.some((t) => haystack.includes(t));
        });
  }, [users, searchTags]);

    return (
        <main className='flex flex-col items-center mt-[100px]'>
            <div className='w-8/12 align-center flex flex-col'>
                <TitleSection sections={sectionConfig} currentSection='talents' />
                <br />
                <SearchBar onSearch={handleSearch}  placeholder='Escribe palabras clave para encontrar el talento que necesitas' showFilter />
                
                <div className='mt-5'>
                    <FormProvider {...methods}>
                        <Form className='flex gap-3'>
                            <FormOptions
                                    control={control}
                                    name="modality"
                                    type="select"
                                    placeholder="Modalidad"
                                    options={[
                                    { value: "presencial", label: "Presencial" },
                                    { value: "hibrido", label: "Híbrido" },
                                    { value: "remoto", label: "Remoto" },
                                    ]}
                                    className='rounded-full !text-brand border-brand bg-uaq-white-ghost font-medium'
                                />

                                <FormOptions
                                    control={control}
                                    name="workdayType"
                                    type="select"
                                    placeholder="Tipo de Jornada"
                                    options={[
                                    { value: "completa", label: "Tiempo completo" },
                                    { value: "media", label: "Medio tiempo" },
                                    { value: "flexible", label: "Flexible" },
                                    ]}
                                    className='rounded-full !text-brand border-brand bg-uaq-white-ghost font-medium'
                                />
                                <FormOptions
                                    control={control}
                                    name="state"
                                    type="combobox"
                                    placeholder="Estado"
                                    options={states}
                                    color= "brand"
                                />
                        </Form>
                    </FormProvider>
                </div>
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => <ApplicantCard key={user.id} user={user} />)
                ) : (
                    <div className="text-center py-10 text-zinc-300 align-center align-center mt-15 items-center content-center">
                    <UserBlockRounded className='w-[203px] h-[206px] justify-self-center'/>
                    <p>NO SE ENCONTRARON BUSCADORES DE EMPLEO QUE CUMPLAN CON LA DESCRIPCIÓN</p>
                    </div>
                )}
                            <br />
                

            </div>

        </main>
    )
}