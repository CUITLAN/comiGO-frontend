import ApplicantTabs from '@/components/applicant/ApplicantTabs';

export default function ApplicantLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      

      <main className="flex flex-grow">
        {/* Columna izquierda - Tabs */}
        <div className="w-120 py-12">
          <ApplicantTabs />
        </div>

        {/* Columna derecha - Contenido */}
        <div className="flex-1 py-10">{children}</div>
      </main>
    </div>
  );
}
