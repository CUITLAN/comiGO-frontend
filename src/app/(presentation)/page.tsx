import { Hero } from '@/components/landing-page/Hero';
import { CompanyAdvertising } from '@/interfaces';
import { TargetGroups } from '@/components/landing-page/TargetGroups';


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
        
        <div className="space-y-4 pt-0.5 pb-10">
          <Hero />
        </div>

        <section className="space-y-8  pb-10 px-4">
          
          <h2 className="text-5xl font-bold text-center text-[var(--color-titulos)]">
            Genera ingresos mientras ayudas al planeta
          </h2>

          <div className="max-w-4xl mx-auto space-y-8 text-center">
            
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold text-[var(--color-titulos)]">
                ¿Sabías que en México se desperdicia más del 34% de los alimentos?
              </h3>
              <p className="text-xl text-zinc-600 leading-relaxed">
                Cada día, toneladas de comida en perfecto estado (frutas, verduras, panadería y platillos preparados) son descartadas. Esto no solo es una pérdida de recursos, es un problema económico y ambiental que podemos solucionar juntos.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-semibold text-[var(--color-titulos)]">
                ¿Cuánto dinero estás tirando a la basura... literalmente?
              </h3>
              <p className="text-xl text-zinc-600 leading-relaxed">
                La merma diaria es más que solo comida; es una fuga de ganancias. Cada platillo que no se vende, cada ingrediente que caduca, es una pérdida directa en tu balance final. Se estima que los restaurantes pueden perder entre el 15% y 25% de sus insumos en mermas.
              </p>
            </div>

          </div>
        </section>
        <div className="space-y-2  pb-20">
          <TargetGroups />
        </div>

      </div>
    </>
  );
}