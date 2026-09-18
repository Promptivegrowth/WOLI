/**
 * Tarjetas virtuales del equipo.
 *
 * Añadir a alguien es añadir un objeto aquí: su tarjeta, su vCard y su QR se
 * generan solos al compilar.
 *
 * Campos que parecen accesorios y no lo son:
 *   alias     Las tarjetas se imprimen y viven años. Si un slug cambia, las URL
 *             antiguas siguen funcionando desde aquí.
 *   activo    Cuando alguien deja la empresa su URL sigue circulando. En false,
 *             la tarjeta muestra un aviso cortés y lleva a contacto, sin 404.
 *   modelo    'comercial' lleva retrato; 'gerencia' va sin foto, con sello.
 *   etiqueta  Lo que dice la pastilla de la esquina. Por defecto, 'Tarjeta
 *             digital'.
 *   apellidos Solo cuando no se pueden deducir. La vCard supone la convención
 *             peruana —los dos últimos son los apellidos—, y eso falla con un
 *             apellido de dos palabras como Mc Cubbin.
 *   cargo     Puede faltar. La tarjeta se compone sin él.
 */
export const equipo = [
  {
    slug: 'fernando-bolona',
    alias: ['fernando', 'gerencia'],
    activo: true,
    modelo: 'gerencia',
    etiqueta: 'Dirección',
    nombre: 'Fernando Boloña Prieto',
    nombreCompleto: 'Fernando José Martín Boloña Prieto',
    iniciales: 'FB',
    // Sin cargo por indicación del cliente.
    cargo: null,
    movil: '+51 997 059 212',
    whatsapp: '51997059212',
    // Sin correo personal facilitado: se usa el de gerencia de la empresa.
    email: 'gerencia@wlicargo.com',
    foto: null,
  },
  {
    slug: 'alfonso-mccubbin',
    alias: ['alfonso', 'pricing'],
    activo: true,
    modelo: 'gerencia',
    nombre: 'Alfonso Mc Cubbin Trisano',
    nombreCompleto: 'Alfonso Alejandro Mc Cubbin Trisano',
    apellidos: 'Mc Cubbin Trisano',
    iniciales: 'AM',
    cargo: 'Pricing e Inside Sales',
    cargoEn: 'Pricing and Inside Sales',
    movil: '+51 912 507 555',
    whatsapp: '51912507555',
    email: 'amccubbin@wlicargo.com',
    foto: null,
  },
  {
    slug: 'john-valverde',
    alias: ['john', 'jhon'],
    activo: true,
    modelo: 'comercial',
    nombre: 'John Valverde Rodríguez',
    nombreCompleto: 'John Eleazar Valverde Rodríguez',
    iniciales: 'JV',
    cargo: 'Ejecutivo Comercial',
    cargoEn: 'Commercial Executive',
    movil: '+51 972 152 600',
    whatsapp: '51972152600',
    email: 'jhon.ecomercial@wlicargo.com',
    foto: '/equipo/john-valverde.jpg',
  },
  {
    slug: 'kevin-jibaja',
    alias: ['kevin'],
    activo: true,
    modelo: 'comercial',
    nombre: 'Kevin Jibaja Vásquez',
    nombreCompleto: 'Kevin Anthony Jibaja Vásquez',
    iniciales: 'KJ',
    cargo: 'Ejecutivo Comercial',
    cargoEn: 'Commercial Executive',
    movil: '+51 960 827 163',
    whatsapp: '51960827163',
    email: 'kevin.ecomercial@wlicargo.com',
    foto: '/equipo/kevin-jibaja.jpg',
  },
];

/** Ruta pública de una tarjeta. */
export const rutaTarjeta = (slug) => `/t/${slug}`;

/** Busca por slug o por cualquiera de sus alias. */
export const buscarPersona = (slug) =>
  equipo.find((p) => p.slug === slug || (p.alias ?? []).includes(slug));

/** Número en formato marcable, sin espacios. */
export const tel = (p) => '+' + p.whatsapp;

/**
 * Nombre partido para la vCard.
 *
 * Por convención peruana los dos últimos son los apellidos. Cuando eso no
 * vale —un apellido compuesto, por ejemplo— la persona trae los suyos escritos
 * y aquí solo se descuentan del nombre completo.
 */
export const partirNombre = (p) => {
  const partes = p.nombreCompleto.trim().split(/\s+/);
  if (p.apellidos) {
    const cuantos = p.apellidos.trim().split(/\s+/).length;
    return {
      apellidos: p.apellidos,
      pila: partes.slice(0, -cuantos).join(' ') || partes[0],
    };
  }
  return {
    apellidos: partes.slice(-2).join(' '),
    pila: partes.slice(0, -2).join(' ') || partes[0],
  };
};

/**
 * Nombre tal como se compone en la tarjeta.
 *
 * Las partículas de apellido no deben quedarse solas al final de una línea:
 * «Alfonso Mc / Cubbin Trisano» se lee como otro apellido. Un espacio duro las
 * mantiene pegadas a lo que sigue, y solo aquí: la vCard y el nombre completo
 * siguen llevando espacios normales.
 */
const PARTICULAS = /\b(De la|De los|De|Del|Mc|Mac|Van|Von|Da|Di|La|Las|Los|San|Saint)\s+/g;
export const nombreTarjeta = (p) => p.nombre.replace(PARTICULAS, (m) => m.trimEnd() + '\u00A0');

/** Texto de la pastilla de la esquina de la tarjeta. */
export const etiquetaDe = (p) => p.etiqueta ?? 'Tarjeta digital';
