/**
 * Contacto descargable (vCard 3.0) de cada tarjeta.
 *
 * Es la pieza que hace útil a una tarjeta virtual: sin esto el cliente mira
 * unos datos y los pierde. La versión 3.0 es la que aceptan sin rechistar
 * tanto iOS como Android y Outlook.
 */
import { equipo, partirNombre, tel } from '../../data/equipo.js';
import { site } from '../../data/site.js';

export function getStaticPaths() {
  return equipo.flatMap((p) => [
    { params: { slug: p.slug }, props: { persona: p } },
    ...(p.alias ?? []).map((a) => ({ params: { slug: a }, props: { persona: p } })),
  ]);
}

// Las comas, los puntos y coma y las barras invertidas van escapados en vCard.
const esc = (v = '') => String(v).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

export function GET({ props }) {
  const p = props.persona;

  // Separar mal el nombre deja la agenda del cliente archivando el contacto
  // por un segundo nombre. La regla vive junto a los datos, en equipo.js.
  const { apellidos, pila } = partirNombre(p);

  const lineas = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${esc(apellidos)};${esc(pila)};;;`,
    `FN:${esc(p.nombre)}`,
    `ORG:${esc(site.nombreLargo)}`,
    // Quien no tiene cargo declarado no lleva la línea: una vCard con TITLE
    // vacío deja un renglón en blanco en la ficha de contacto.
    ...(p.cargo ? [`TITLE:${esc(p.cargo)}`] : []),
    `TEL;TYPE=CELL,VOICE:${tel(p)}`,
    `EMAIL;TYPE=INTERNET,WORK:${p.email}`,
    `ADR;TYPE=WORK:;;${esc('Av. Venezuela 1684')};${esc('Breña')};${esc('Lima')};;${esc('Perú')}`,
    `URL:${site.dominio}`,
    `item1.URL:${site.dominio}/t/${p.slug}`,
    'item1.X-ABLabel:Tarjeta digital',
    `NOTE:${esc(p.cargo ? `${p.cargo} · ${site.nombreLargo}` : site.nombreLargo)}`,
    `REV:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    'END:VCARD',
  ];

  return new Response(lineas.join('\r\n'), {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': `attachment; filename="${p.slug}.vcf"`,
    },
  });
}
