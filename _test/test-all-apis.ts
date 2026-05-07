import { getOpciones } from '@/lib/api/opciones';
import { getProgramas } from '@/lib/api/programas';
import { getFAQs } from '@/lib/api/faqs';
import { getEquipo } from '@/lib/api/equipo';

async function main() {
  const [opciones, programas, faqs, equipo] = await Promise.all([
    getOpciones(),
    getProgramas(),
    getFAQs(),
    getEquipo(),
  ]);

  console.log('heroTitulo:', opciones.heroTitulo);
  console.log('total programas:', programas.length);
  console.log('total faqs:', faqs.length);
  console.log('total equipo:', equipo.length);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
