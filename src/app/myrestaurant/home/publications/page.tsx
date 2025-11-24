'use client';

import EmptyDisplay from '@/components/empty-display/EmptyDisplay';
import { vacanciesColumns } from '@/components/tables/schemas/Vacancies';
import { Button } from '@/components/ui/button';
import { DataTableCustomSearchBar } from '@/components/tables/layouts/DateTableCustomSearchBar';
import { DataVacancies } from '@/data/testDataVacancies';
import { filtersVacancies } from '@/data/filtersVacancies'; // Importamos los filtros nuevos
import NoteRemove from '@/components/common/hugeIcons';
import { TrashBinMinimalistic } from '@solar-icons/react';

const accountStatus: 'approved' | 'reviewed' | 'rejected' = 'approved';

const VacanciesContent = ({
  hasData,
  accountStatus,
}: {
  hasData: boolean;
  accountStatus: 'approved' | 'reviewed' | 'rejected';
}) => {
  
  // Estado vacío común
  const commonEmptyState = (
    <div className="flex w-full flex-col items-center justify-center text-center py-10">
      <EmptyDisplay
        icon={<NoteRemove color="#D4D4D8" width={158} height={166} />}
        firstLine="Todavía no has publicado ningún platillo."
        secondline="Crea una nueva publicación para comenzar."
      />
    </div>
  );

  if (accountStatus === 'approved') {
    return hasData ? (
      <div className="w-full bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
        {/* HEADER AZUL CLARO */}
        <div className="bg-[#EAF2FF] px-6 py-4 flex justify-between items-center border-b border-blue-100">
          <h2 className="text-[#0C3252] font-bold text-lg uppercase tracking-wide">
            MIS PUBLICACIONES
          </h2>
          
        </div>

        <div className="p-6">
          
          <DataTableCustomSearchBar
            columns={vacanciesColumns}
            data={DataVacancies}
            filters={filtersVacancies} 
          />
        </div>
      </div>
    ) : (
      <div className="flex w-full flex-col items-center justify-center text-center mt-10">
        {commonEmptyState}
        <Button variant="primary" className="bg-[#4A7729] mt-4 text-white">
          <a href="/employer/user/vacancy/create">Crear Publicación</a>
        </Button>
      </div>
    );
  }

  return (
      <div className="text-center p-10">
          <p>Tu cuenta está en estado: {accountStatus}</p>
      </div>
  );
};

export default function VacanciesPage() {
  const hasData = DataVacancies.length > 0;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 mb-20">
      <VacanciesContent hasData={hasData} accountStatus={accountStatus} />
    </div>
  );
}