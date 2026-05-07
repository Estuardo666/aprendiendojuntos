import { getServicios } from '@/lib/api/servicios';

async function main() {
  const servicios = await getServicios();
  console.log('Total de servicios:', servicios.length);
  console.log('Primer servicio:', JSON.stringify(servicios[0], null, 2));
}

main().catch(console.error);
