/**
 * Contacto descargable (vCard 3.0) de cada tarjeta.
 *
 * Es la pieza que hace útil a una tarjeta virtual: sin esto el cliente mira
 * unos datos y los pierde. La versión 3.0 es la que aceptan sin rechistar
 * tanto iOS como Android y Outlook.
 */
import { equipo, tel } from '../../data/equipo.js';
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

  // Convención peruana: los dos últimos son los apellidos (paterno y materno),
  // el resto son nombres de pila. Separarlo mal deja la agenda del cliente
  // archivando el contacto por un segundo nombre.
  const partes = p.nombreCompleto.trim().split(/\s+/);
  const apellidos = partes.slice(-2).join(' ');
  const pila = partes.slice(0, -2).join(' ') || partes[0];

  const lineas = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${esc(apellidos)};${esc(pila)};;;`,
    `FN:${esc(p.nombre)}`,
    `ORG:${esc(site.nombreLargo)}`,
    `TITLE:${esc(p.cargo)}`,
    `TEL;TYPE=CELL,VOICE:${tel(p)}`,
    `EMAIL;TYPE=INTERNET,WORK:${p.email}`,
    `ADR;TYPE=WORK:;;${esc('Cal. Germán Schreiber 276')};${esc('San Isidro')};${esc('Lima')};;${esc('Perú')}`,
    `URL:${site.dominio}`,
    `item1.URL:${site.dominio}/t/${p.slug}`,
    'item1.X-ABLabel:Tarjeta digital',
    `NOTE:${esc(`${p.cargo} · ${site.nombreLargo}`)}`,
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
