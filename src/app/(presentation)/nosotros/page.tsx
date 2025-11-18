import Image from 'next/image';
import { Hero2 } from '@/components/landing-page/Hero2';
import { CompanyAdvertising } from '@/interfaces';
import { Button } from '@/components/ui/button';
import { ToggleRight } from 'lucide-react';

async function getAdvertisingCompanies(): Promise<CompanyAdvertising[] | void> {
  
}

export default async function LandingPage() {
  const advertisingCompanies = await getAdvertisingCompanies();
  
  return (
    <>
      <div className="">
        
        <div className="space-y-4 pt-0.5 pb-10">
          <Hero2 />
        </div>
        
        <section className="flex flex-col gap-10 pt-10 pb-20 px-6 lg:px-20 max-w-[1440px] mx-auto">
          
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-bold text-[var(--color-titulos)]">
              Nuestra historia
            </h2>
            <p className="text-xl text-black">
              comiGO nació de una simple observación aquí mismo, en Querétaro.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            
            <div className="w-full lg:w-1/3 flex-shrink-0">
              <Image 
                src="/Nosotros1.png"
                alt="Alan Tinajero Fundador"
                width={400}
                height={500}
                className="w-full h-auto object-cover rounded-[32px] shadow-md"
              />
            </div>

            <div className="w-full lg:w-2/3 space-y-8">
              
              <div className="space-y-4">
                <h3 className="text-4xl font-semibold text-[var(--color-titulos)]">
                  ¿Como comenzamos?
                </h3>
                <p className="text-lg text-black leading-relaxed text-justify">
                  Mi nombre es Alan Tinajero y soy fundador de comiGO y estudiante de la UAQ, campus Juriquilla. Como muchos, descubrí que en otras partes del mundo ya existían aplicaciones exitosas para combatir el desperdicio de comida en restaurantes. La idea era brillante, pero cuando la quise aplicar aquí, me topé con una realidad:
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 relative">
                <div className="absolute top-8 right-8 text-zinc-500">
                   <ToggleRight size={32} />
                </div>

                <h4 className="text-xl font-bold text-[var(--color-titulos)] mb-4 pr-10">
                  Esos modelos no estaban hechos para el mercado mexicano.
                </h4>
                <div className="space-y-4 text-zinc-600 text-base leading-relaxed">
                  <p>
                    El ritmo, la operación y la agilidad de un negocio de comida en México son únicos. Muchas plataformas extranjeras exigen procesos rígidos que no se adaptan a la operación (a veces informal, pero siempre ágil) de la cocina mexicana.
                  </p>
                  <p>
                    Entendí que no necesitábamos una copia, necesitábamos una herramienta diseñada desde cero que entendiera nuestros retos locales.
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="w-full">
             <Image 
                src="/Nosotros2.png"
                alt="Variedad de vegetales"
                width={1200}
                height={300}
                className="w-full h-[250px] lg:h-[300px] object-cover rounded-[32px]"
              />
          </div>

          <div className="flex flex-col lg:flex-row   items-center">
            
            <div className="w-full lg:w-1/2 space-y-6">
              <h3 className="text-4xl font-bold text-[var(--color-titulos)]">
                Llamada a la accion
              </h3>
              <p className="text-lg text-black leading-relaxed text-justify">
                Después de leer el articulo de la jornada así como diferentes fuentes note esta contradiccion, Siendo que en mexico tenemos un deficit alimentario y a la vez lideramos america latina como el pais que genera mas desperdicios de la region
              </p>
              
              <div className="pt-4">
                <Button 
                  variant="secundary"
                  className="px-8 text-lg font-semibold border-2   hover:bg-zinc-100 rounded-xl"
                  style={{
                      borderColor: '#1a1a1a',
                      color: '#1a1a1a'
                      
                  }}
                >
                  Registrarse
                </Button>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
               <Image 
                src="/Nosotros3.png"
                alt="Caja de frutas y verduras"
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-[32px] shadow-md"
              />
            </div>

          </div>

        </section>

      </div>
    </>
  );
}