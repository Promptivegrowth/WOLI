/**
 * Configuración de idiomas.
 * Español en la raíz (/) e inglés bajo /en/. Los slugs se traducen.
 */
export const idiomas = ['es', 'en'];
export const idiomaPorDefecto = 'es';

export const etiquetasIdioma = {
  es: { corto: 'ES', largo: 'Español' },
  en: { corto: 'EN', largo: 'English' },
};

/** Tabla de rutas: clave -> ruta por idioma (sin barra final). */
export const rutas = {
  inicio: { es: '/', en: '/en' },
  nosotros: { es: '/nosotros', en: '/en/about' },
  servicios: { es: '/servicios', en: '/en/services' },
  tarifarios: { es: '/tarifarios', en: '/en/rates' },
  tracking: { es: '/tracking', en: '/en/tracking' },
  cotizacion: { es: '/cotizacion', en: '/en/quote' },
  contacto: { es: '/contacto', en: '/en/contact' },
  reclamaciones: { es: '/libro-de-reclamaciones', en: '/en/complaints-book' },
  privacidad: { es: '/privacidad', en: '/en/privacy' },
};

/** Devuelve la ruta de una clave en el idioma dado. */
export const ruta = (clave, lang = idiomaPorDefecto) => rutas[clave]?.[lang] ?? rutas[clave]?.[idiomaPorDefecto] ?? '/';

/** Ruta de la ficha de un servicio. */
export const rutaServicio = (servicio, lang = idiomaPorDefecto) =>
  `${ruta('servicios', lang)}/${servicio.slug[lang] ?? servicio.slug[idiomaPorDefecto]}`;

/** Deduce el idioma a partir de la URL actual. */
export function idiomaDeUrl(pathname) {
  return /^\/en(\/|$)/.test(pathname) ? 'en' : 'es';
}

/**
 * Dada la ruta actual y su clave, devuelve el enlace equivalente en el otro idioma.
 * `extra` permite añadir el slug traducido de una ficha de servicio.
 */
export function alternar(clave, lang, extra = '') {
  const otro = lang === 'es' ? 'en' : 'es';
  return { lang: otro, href: ruta(clave, otro) + extra };
}

/** Menú principal, en orden. */
export const menu = ['inicio', 'nosotros', 'servicios', 'tarifarios', 'tracking', 'contacto'];
