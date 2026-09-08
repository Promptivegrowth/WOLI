export const site = {
  nombre: 'WOLI',
  nombreLargo: 'World Logistics International',
  legal: 'World Logistics International S.A.C.',
  // Completar con el RUC real de la empresa: se muestra en el Libro de Reclamaciones.
  ruc: '',
  dominio: 'https://wlicargo.com',
  descripcion:
    'Operador logístico peruano con más de 20 años de experiencia. Carga marítima, aérea, consolidada, agenciamiento de aduana y logística médica internacional.',
  direccion: 'Cal. Germán Schreiber Nro. 276, San Isidro — Lima, Perú',
  direccionCorta: 'San Isidro, Lima — Perú',
  email: 'gerencia@wlicargo.com',
  telefonoDisplay: '+51 997 059 212',
  whatsapp: '51997059212',
  horario: 'Lunes a viernes · 9:00 – 18:00 h',
  tiempoRespuesta: '48 horas',
  mapa:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2758.5904301880196!2d-77.02532943264664!3d-12.095989718965916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c86567bc14ab%3A0xa45eb32ad7d1aef1!2sSchreiber%20Coworking%20%26%20Offices%20-%20Sede%20San%20Isidro!5e0!3m2!1ses-419!2spe!4v1740165568032!5m2!1ses-419!2spe',
  mapaLink: 'https://maps.google.com/?q=Germán+Schreiber+276+San+Isidro+Lima+Perú',
  tracking: 'https://miranda-soft.com.pe/tools/206wli19375261/panel/login.html',
  redes: [
    { nombre: 'LinkedIn', url: 'https://www.linkedin.com', icono: 'linkedin' },
    { nombre: 'Facebook', url: 'https://www.facebook.com', icono: 'facebook' },
    { nombre: 'Instagram', url: 'https://www.instagram.com', icono: 'instagram' },
  ],
};

export const waLink = (msg) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg || 'Hola WOLI, quisiera cotizar un servicio logístico.')}`;

export const nav = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Tarifarios', href: '/tarifarios' },
  { label: 'Tracking', href: '/tracking' },
  { label: 'Contacto', href: '/contacto' },
];

export const cifras = [
  { valor: 20, sufijo: '+', label: 'Años de experiencia', detalle: 'conectando al Perú con el mundo' },
  { valor: 7, sufijo: '', label: 'Puertos y terminales', detalle: 'con tarifario publicado' },
  { valor: 24, sufijo: '/7', label: 'Rastreo de carga', detalle: 'trazabilidad en tiempo real' },
  { valor: 48, sufijo: ' h', label: 'Respuesta comercial', detalle: 'tiempo de atención comprometido' },
];

export const diferenciales = [
  { icono: 'globe', titulo: 'Red global de agentes', texto: 'Conexión directa con corresponsales en origen y destino para coordinar cada embarque sin intermediarios innecesarios.' },
  { icono: 'gps', titulo: 'Rastreo en tiempo real', texto: 'Seguimiento GPS y trazabilidad documental desde la recolección hasta la entrega final.' },
  { icono: 'stamp', titulo: 'Asesoría aduanera', texto: 'Clasificación arancelaria, regímenes y documentación gestionados por especialistas certificados.' },
  { icono: 'chart', titulo: 'Optimización de costos', texto: 'Análisis de rutas, consolidación y modalidad de transporte para reducir el costo total de tu operación.' },
  { icono: 'truck', titulo: 'Flota propia', texto: 'Unidades de 15 y 7 toneladas con cobertura nacional para el tramo terrestre y la última milla.' },
  { icono: 'shield', titulo: 'Booking garantizado', texto: 'Reservas de embarque aseguradas y disponibilidad FCL y LCL durante todo el año.' },
];

export const valores = [
  { titulo: 'Transparencia', texto: 'Tarifas publicadas, costos claros y comunicación honesta en cada etapa del proceso.' },
  { titulo: 'Compromiso', texto: 'Cada carga se trata como propia: puntualidad, cuidado y responsabilidad de inicio a fin.' },
  { titulo: 'Especialización', texto: 'Equipos dedicados por modalidad y por sector, incluyendo carga sensible y médica.' },
  { titulo: 'Mejora continua', texto: 'Tecnología e indicadores para elevar el estándar de servicio operación tras operación.' },
];

export const testimonios = [
  { nombre: 'Katty Flower', cargo: 'Gerente de Importaciones', texto: 'Trabajar con este equipo ha sido una experiencia increíble. Su dedicación y compromiso con cada proyecto nos ha permitido alcanzar nuevas alturas. Son un socio esencial en nuestro camino hacia el éxito.' },
  { nombre: 'Carlos Pérez', cargo: 'Jefe de Logística', texto: 'Desde el primer día, nos sentimos apoyados por un equipo profesional y confiable. Su atención al detalle y su enfoque estratégico han marcado la diferencia en nuestros resultados.' },
  { nombre: 'Laura Gómez', cargo: 'Coordinadora de Comercio Exterior', texto: 'Un servicio de primer nivel. Cada interacción con ellos es un recordatorio de que tomamos la decisión correcta al elegirlos como socios. Recomendados al 100%.' },
];

export const proceso = [
  { paso: '01', titulo: 'Cotización', texto: 'Recibimos tu requerimiento y en un plazo máximo de 48 horas entregamos una propuesta con costos, tiempos y modalidad recomendada.' },
  { paso: '02', titulo: 'Booking y recojo', texto: 'Reservamos el espacio de embarque, coordinamos el recojo en origen y preparamos la documentación de exportación o importación.' },
  { paso: '03', titulo: 'Tránsito y control', texto: 'Monitoreamos el embarque en tiempo real y te informamos cada hito relevante hasta el arribo.' },
  { paso: '04', titulo: 'Aduana y entrega', texto: 'Gestionamos el despacho aduanero y entregamos la carga en el destino final con toda la documentación en regla.' },
];
