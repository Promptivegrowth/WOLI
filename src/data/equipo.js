/**
 * Tarjetas virtuales del equipo.
 *
 * Añadir a alguien es añadir un objeto aquí: su tarjeta, su vCard y su QR se
 * generan solos al compilar.
 *
 * Campos que parecen accesorios y no lo son:
 *   alias   Las tarjetas se imprimen y viven años. Si un slug cambia, las URL
 *           antiguas siguen funcionando desde aquí.
 *   activo  Cuando alguien deja la empresa su URL sigue circulando. En false,
 *           la tarjeta muestra un aviso cortés y lleva a contacto, sin 404.
 *   modelo  'comercial' lleva retrato; 'gerencia' va sin foto, con monograma.
 */
export const equipo = [
  {
    slug: 'fernando-bolona',
    alias: ['fernando', 'gerencia'],
    activo: true,
    modelo: 'gerencia',
    nombre: 'Fernando Boloña Prieto',
    nombreCompleto: 'Fernando José Martín Boloña Prieto',
    iniciales: 'FB',
    cargo: 'Gerencia Comercial y de Operaciones',
    cargoEn: 'Commercial and Operations Management',
    movil: '+51 997 059 212',
    whatsapp: '51997059212',
    // Sin correo personal facilitado: se usa el de gerencia de la empresa.
    email: 'gerencia@wlicargo.com',
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
