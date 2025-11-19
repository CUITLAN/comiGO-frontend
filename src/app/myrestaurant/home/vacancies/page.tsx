'use client';
import TitleSection from '@/components/common/TitleSection';
import EmptyDisplay from '@/components/empty-display/EmptyDisplay';
import { vacanciesColumns } from '@/components/tables/schemas/Vacancies';//
import { Button } from '@/components/ui/button';
import { CaseRound } from '@solar-icons/react';
import AlertCard from '@/components/common/Alert';
import { DataTableCustomSearchBar } from '@/components/tables/layouts/DateTableCustomSearchBar';
import { DataVacancies } from '@/data/testDataVacancies';//
import { filtersVacancies } from '@/data/filtersVacancies';//
import NoteRemove from '@/components/common/hugeIcons';

const accountStatus: 'approved' | 'reviewed' | 'rejected' = 'approved';



const sectionConfig = {
  profile: {
    icon: <CaseRound size={24} weight="Bold" />,
    title: 'MIS VACANTES',
    description: '',
  },
};

const VacanciesContent = ({
  hasData,
  accountStatus,
}: {
  hasData: boolean;
  accountStatus: 'approved' | 'reviewed' | 'rejected';
}) => {
  const commonEmptyState = (
    <div className="flex w-full flex-col items-center justify-center text-center">
      <EmptyDisplay
        icon={<NoteRemove color="#D4D4D8" width={158} height={166} />}
        firstLine="Todavía no has publicado alguna vacante."
        secondline="Utiliza las opciones de la barra de navegación lateral para crear una o da clic en el siguiente botón para generar una nueva vacante."
      />
    </div>
  );

  const statusComponents = {
    approved: hasData ? (
      <div>
        <DataTableCustomSearchBar
          columns={vacanciesColumns}
          data={DataVacancies}
          filters={filtersVacancies}
        />
      </div>
      
    ) : (
      <div className="flex w-full flex-col items-center justify-center text-center">
        {commonEmptyState}
        <Button variant="primary" color="accent">
          <a href="/employer/user/vacancy/create">Crear Vacante</a>
        </Button>
      </div>
    ),
    reviewed: (
      <>
        {commonEmptyState}
        <div className="flex w-full flex-col items-center justify-center text-center">
          <Button variant="primary" color="gray">
            Crear Vacante
          </Button>
        </div>
        <AlertCard
          title={'Tu cuenta aún no está verificada'}
          content={
            'Una vez que se haya verificado la veracidad de la empresa, podrás empezar a publicar vacantes'
          }
        />
      </>
    ),
    rejected: (
      <>
        {commonEmptyState}
        <div className="flex w-full flex-col items-center justify-center text-center">
          <Button variant="primary" color="gray">
            Crear Vacante
          </Button>
        </div>
        <AlertCard
          title={'Tu cuenta fue rechazada'}
          content={
            <>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                <li>El RFC no existe</li>
                <li>La razón social no corresponde a el RFC </li>
              </ul>
              <p>
                Realiza los cambios necesarios desde los{' '}
                <a className="underline" href="/employer/profile">
                  ajustes de tu perfil
                </a>{' '}
                y solicita una nueva revisión
              </p>
            </>
          }
        />
      </>
    ),
  };

  return statusComponents[accountStatus] || null;
};

export default function VacanciesPage() {
  const hasData = DataVacancies.length > 0;

  return (
    <>
      <div className="mx-32 flex flex-col gap-5 mt-20">
        <div className="">
          <TitleSection sections={sectionConfig} currentSection={'profile'} />
        </div>

        <VacanciesContent hasData={hasData} accountStatus={accountStatus} />
      </div>
    </>
  );
}