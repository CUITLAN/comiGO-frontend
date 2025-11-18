import { Hero } from '@/components/landing-page/Hero';
import { CompanyAdvertising } from '@/interfaces';
import { TargetGroups } from '@/components/landing-page/TargetGroups';
import { ComigoPillars } from '@/components/landing-page/Pilares';
import { Button } from '@/components/ui/button';

async function getAdvertisingCompanies(): Promise<CompanyAdvertising[] | void> {
  // fetch to have companies that have purchased the ads section
  // If something wrong, then return void
  // return;

  
}

export default async function LandingPage() {
  const advertisingCompanies = await getAdvertisingCompanies();
  return (
    <>
      <div className="">
        
        
        <section className="space-y-8 pt-10 pb-10 px-4">
          
          <h2 className="text-5xl font-bold text-center text-[var(--color-titulos)]">
            Desperdicio de Alimentos en Mexico 
          </h2>

          <div className="max-w-5xl mx-auto space-y-8 text-center text-left">
            
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold text-[var(--color-titulos)] text-left">
                Representa el 2.5% delPI del país. <br />Equivale a la contaminación de 16 millones de automóviles.
              </h3>
              <p className="text-xl text-black leading-relaxed">
                El contraste es brutal: en un país con más de 20 millones de personas en inseguridad alimentaria, cada minuto dos tráilers llenos de comida se van a la basura.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-semibold text-[var(--color-titulos)]">
                Como podemos brindar una solucion 
              </h3>
              <p className="text-xl text-black leading-relaxed">
                Podemos crear un puente entre tu negocio y los posibles clientes, porque no solo vemos "desperdicio de comida", vemos "fugas de ganancia".              </p>
            </div>

          </div>
        </section>
        <div className="space-y-2  pb-5">
          <ComigoPillars/>
        </div>
        <section className="space-y-8  pb-20 px-4">
          
  

          <div className="max-w-4xl mx-auto space-y-8 text-center">
            <div className="space-y-3">
              <h3 className="text-2xl text-center font-semibold text-[var(--color-titulos)]">
                ¿Listo para ser parte de la solución? 
              </h3>
              <p className="text-xl text-black leading-relaxed text-left">
                Descubre cómo podemos adaptar comiGO a tu operación diaria y empezar a generar ingresos desde el primer día.</p>
            </div>

          </div>
          <div className="max-w-4xl mx-auto space-y-8 text-center">
            <Button variant='primary'  color='terniary' className="px-8 py-3 text-lg" 
              style={{  
                borderColor: 'white', 
                borderWidth: '2px', 
                borderRadius: '8px', 
              }} >
                Registrame  
            </Button>
          </div>
        </section>

      </div>
    </>
  );
}