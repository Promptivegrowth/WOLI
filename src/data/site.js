/** Datos de la empresa. Lo neutral va suelto; lo que cambia por idioma va en `contenido`. */
export const site = {
  nombre: 'WOLI',
  nombreLargo: 'World Logistics International',
  legal: 'World Logistics International S.A.C.',
  // Completar con el RUC real de la empresa: se muestra en el Libro de Reclamaciones.
  ruc: '',
  dominio: 'https://wlicargo.com',
  direccion: 'Cal. Germán Schreiber Nro. 276, San Isidro — Lima, Perú',
  email: 'gerencia@wlicargo.com',
  telefonoDisplay: '+51 997 059 212',
  whatsapp: '51997059212',
  tiempoRespuesta: { es: '48 horas', en: '48 hours' },
  horario: { es: 'Lunes a viernes · 9:00 – 18:00 h', en: 'Monday to Friday · 9:00 – 18:00' },
  descripcion: {
    es: 'Operador logístico peruano con más de 20 años de experiencia. Carga marítima, aérea, consolidada, agenciamiento de aduana y logística médica internacional.',
    en: 'Peruvian freight forwarder with over 20 years of experience. Ocean, air and consolidated freight, customs brokerage and international medical logistics.',
  },
  mapa:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2758.5904301880196!2d-77.02532943264664!3d-12.095989718965916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c86567bc14ab%3A0xa45eb32ad7d1aef1!2sSchreiber%20Coworking%20%26%20Offices%20-%20Sede%20San%20Isidro!5e0!3m2!1ses-419!2spe!4v1740165568032!5m2!1ses-419!2spe',
  mapaLink: 'https://maps.google.com/?q=Germán+Schreiber+276+San+Isidro+Lima+Perú',
  tracking: 'https://miranda-soft.com.pe/tools/206wli19375261/panel/login.html',
  // Vídeo de portada. Sube tu archivo a public/video/ con estos nombres.
  // Si no existe, el hero usa la imagen de respaldo automáticamente.
  video: { mp4: '/video/hero.mp4', webm: '/video/hero.webm', poster: '/img/cr-ship-dusk.jpg' },
  redes: [
    { nombre: 'LinkedIn', url: 'https://www.linkedin.com', icono: 'linkedin' },
    { nombre: 'Facebook', url: 'https://www.facebook.com', icono: 'facebook' },
    { nombre: 'Instagram', url: 'https://www.instagram.com', icono: 'instagram' },
  ],
};

export const waLink = (msg) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg || 'Hola WOLI / Hello WOLI')}`;

/** Terminales del Perú, para la marquesina de cobertura. */
export const terminalesPeru = ['Callao', 'Chancay', 'Paita', 'Pisco', 'Ilo', 'Matarani', 'Chimbote'];

/** Principales orígenes y destinos, para la segunda marquesina. */
export const puertosMundo = [
  'Shanghái', 'Ningbó', 'Shenzhen', 'Busan', 'Singapur', 'Miami', 'Houston', 'Nueva York',
  'Rotterdam', 'Amberes', 'Hamburgo', 'Valencia', 'Valparaíso', 'Santos', 'Manzanillo', 'Cartagena',
];

/** Contenido que cambia por idioma. */
export const contenido = {
  es: {
    cifras: [
      { valor: 20, sufijo: '+', label: 'Años de experiencia', detalle: 'conectando al Perú con el mundo' },
      { valor: 7, sufijo: '', label: 'Puertos y terminales', detalle: 'con tarifario publicado' },
      { valor: 24, sufijo: '/7', label: 'Rastreo de carga', detalle: 'trazabilidad en tiempo real' },
      { valor: 48, sufijo: ' h', label: 'Respuesta comercial', detalle: 'tiempo de atención comprometido' },
    ],
    diferenciales: [
      { icono: 'globe', titulo: 'Red global de agentes', texto: 'Conexión directa con corresponsales en origen y destino para coordinar cada embarque sin intermediarios innecesarios.' },
      { icono: 'gps', titulo: 'Rastreo en tiempo real', texto: 'Seguimiento GPS y trazabilidad documental desde la recolección hasta la entrega final.' },
      { icono: 'stamp', titulo: 'Asesoría aduanera', texto: 'Clasificación arancelaria, regímenes y documentación gestionados por especialistas certificados.' },
      { icono: 'chart', titulo: 'Optimización de costos', texto: 'Análisis de rutas, consolidación y modalidad de transporte para reducir el costo total de tu operación.' },
      { icono: 'truck', titulo: 'Flota propia', texto: 'Unidades de 15 y 7 toneladas con cobertura nacional para el tramo terrestre y la última milla.' },
      { icono: 'shield', titulo: 'Booking garantizado', texto: 'Reservas de embarque aseguradas y disponibilidad FCL y LCL durante todo el año.' },
    ],
    valores: [
      { titulo: 'Transparencia', texto: 'Tarifas publicadas, costos claros y comunicación honesta en cada etapa del proceso.' },
      { titulo: 'Compromiso', texto: 'Cada carga se trata como propia: puntualidad, cuidado y responsabilidad de inicio a fin.' },
      { titulo: 'Especialización', texto: 'Equipos dedicados por modalidad y por sector, incluyendo carga sensible y médica.' },
      { titulo: 'Mejora continua', texto: 'Tecnología e indicadores para elevar el estándar de servicio operación tras operación.' },
    ],
    testimonios: [
      { nombre: 'Katty Flower', cargo: 'Gerente de Importaciones', texto: 'Trabajar con este equipo ha sido una experiencia increíble. Su dedicación y compromiso con cada proyecto nos ha permitido alcanzar nuevas alturas. Son un socio esencial en nuestro camino hacia el éxito.' },
      { nombre: 'Carlos Pérez', cargo: 'Jefe de Logística', texto: 'Desde el primer día, nos sentimos apoyados por un equipo profesional y confiable. Su atención al detalle y su enfoque estratégico han marcado la diferencia en nuestros resultados.' },
      { nombre: 'Laura Gómez', cargo: 'Coordinadora de Comercio Exterior', texto: 'Un servicio de primer nivel. Cada interacción con ellos es un recordatorio de que tomamos la decisión correcta al elegirlos como socios. Recomendados al 100%.' },
    ],
    proceso: [
      { paso: '01', titulo: 'Cotización', texto: 'Recibimos tu requerimiento y en un plazo máximo de 48 horas entregamos una propuesta con costos, tiempos y modalidad recomendada.' },
      { paso: '02', titulo: 'Booking y recojo', texto: 'Reservamos el espacio de embarque, coordinamos el recojo en origen y preparamos la documentación de exportación o importación.' },
      { paso: '03', titulo: 'Tránsito y control', texto: 'Monitoreamos el embarque en tiempo real y te informamos cada hito relevante hasta el arribo.' },
      { paso: '04', titulo: 'Aduana y entrega', texto: 'Gestionamos el despacho aduanero y entregamos la carga en el destino final con toda la documentación en regla.' },
    ],
  },

  en: {
    cifras: [
      { valor: 20, sufijo: '+', label: 'Years of experience', detalle: 'connecting Peru with the world' },
      { valor: 7, sufijo: '', label: 'Ports and terminals', detalle: 'with published rate sheets' },
      { valor: 24, sufijo: '/7', label: 'Cargo tracking', detalle: 'real-time traceability' },
      { valor: 48, sufijo: ' h', label: 'Commercial response', detalle: 'committed response time' },
    ],
    diferenciales: [
      { icono: 'globe', titulo: 'Global agent network', texto: 'Direct connection with correspondents at origin and destination to coordinate every shipment without unnecessary intermediaries.' },
      { icono: 'gps', titulo: 'Real-time tracking', texto: 'GPS tracking and document traceability from pickup to final delivery.' },
      { icono: 'stamp', titulo: 'Customs advice', texto: 'Tariff classification, regimes and documentation handled by certified specialists.' },
      { icono: 'chart', titulo: 'Cost optimisation', texto: 'Route, consolidation and transport mode analysis to cut the total cost of your operation.' },
      { icono: 'truck', titulo: 'Own fleet', texto: '15 and 7 tonne trucks with nationwide coverage for the road leg and the last mile.' },
      { icono: 'shield', titulo: 'Guaranteed booking', texto: 'Secured space bookings and FCL and LCL availability all year round.' },
    ],
    valores: [
      { titulo: 'Transparency', texto: 'Published rates, clear costs and honest communication at every stage of the process.' },
      { titulo: 'Commitment', texto: 'Every shipment is treated as our own: punctuality, care and accountability from start to finish.' },
      { titulo: 'Specialisation', texto: 'Dedicated teams per mode and per sector, including sensitive and medical cargo.' },
      { titulo: 'Continuous improvement', texto: 'Technology and indicators to raise the service standard operation after operation.' },
    ],
    testimonios: [
      { nombre: 'Katty Flower', cargo: 'Import Manager', texto: 'Working with this team has been an incredible experience. Their dedication and commitment to every project has allowed us to reach new heights. They are an essential partner on our road to success.' },
      { nombre: 'Carlos Pérez', cargo: 'Head of Logistics', texto: 'From day one, we felt supported by a professional and reliable team. Their attention to detail and strategic approach have made a real difference to our results.' },
      { nombre: 'Laura Gómez', cargo: 'Foreign Trade Coordinator', texto: 'A first-class service. Every interaction with them is a reminder that we made the right decision choosing them as partners. Recommended 100%.' },
    ],
    proceso: [
      { paso: '01', titulo: 'Quote', texto: 'We receive your requirement and within a maximum of 48 hours we deliver a proposal with costs, transit times and recommended mode.' },
      { paso: '02', titulo: 'Booking and pickup', texto: 'We book the space, arrange pickup at origin and prepare the export or import documentation.' },
      { paso: '03', titulo: 'Transit and control', texto: 'We monitor the shipment in real time and keep you informed of every relevant milestone until arrival.' },
      { paso: '04', titulo: 'Customs and delivery', texto: 'We handle customs clearance and deliver the cargo at its final destination with all documentation in order.' },
    ],
  },
};

/** Atajo: contenido del idioma pedido. */
export const c = (lang = 'es') => contenido[lang] ?? contenido.es;
