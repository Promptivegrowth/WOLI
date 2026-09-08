/**
 * Los diez servicios, en español e inglés.
 * Añadir un objeto aquí crea automáticamente su ficha en los dos idiomas.
 */
export const servicios = [
  {
    id: 'carga-maritima',
    slug: { es: 'carga-maritima', en: 'ocean-freight' },
    icono: 'ship',
    imagen: '/img/cr-ship-dusk.jpg',
    es: {
      nombre: 'Carga Marítima',
      corto: 'Marítimo FCL y LCL',
      tagline: 'FCL y LCL con booking garantizado durante todo el año.',
      resumen:
        'Soluciones de transporte marítimo confiables: gestionamos el envío de tus mercancías de forma segura y optimizada, con reservas de embarque garantizadas hacia y desde los principales puertos del mundo.',
      intro:
        'El transporte marítimo sigue siendo la columna vertebral del comercio exterior peruano. En WOLI operamos contenedor completo (FCL) y carga suelta consolidada (LCL) con acuerdos directos con líneas navieras y agentes corresponsales, lo que nos permite asegurar espacio, sostener tarifas y responder cuando el mercado se ajusta.',
      beneficios: [
        'FCL y LCL disponibles todo el año, incluso en temporada alta.',
        'Reservas de embarque garantizadas con confirmación documentada.',
        'Cobertura en Callao, Chancay, Paita, Pisco, Ilo, Matarani y Chimbote.',
        'Rastreo del contenedor en tiempo real hasta el arribo.',
      ],
      incluye: [
        'Cotización de flete marítimo puerto a puerto o puerta a puerta',
        'Reserva de espacio (booking) y emisión de Bill of Lading',
        'Seguro de carga internacional opcional',
        'Coordinación de recojo en origen y estiba',
        'Gestión de gastos locales y liberación de documentos',
      ],
    },
    en: {
      nombre: 'Ocean Freight',
      corto: 'FCL and LCL ocean',
      tagline: 'FCL and LCL with guaranteed booking all year round.',
      resumen:
        'Reliable ocean transport: we handle your shipments safely and efficiently, with guaranteed bookings to and from the main ports in the world.',
      intro:
        'Ocean transport remains the backbone of Peruvian foreign trade. At WOLI we run full container load (FCL) and consolidated less-than-container load (LCL) with direct agreements with shipping lines and correspondent agents, which lets us secure space, hold rates and respond when the market tightens.',
      beneficios: [
        'FCL and LCL available all year, even in peak season.',
        'Guaranteed bookings with documented confirmation.',
        'Coverage in Callao, Chancay, Paita, Pisco, Ilo, Matarani and Chimbote.',
        'Real-time container tracking until arrival.',
      ],
      incluye: [
        'Ocean freight quote, port to port or door to door',
        'Space booking and Bill of Lading issuance',
        'Optional international cargo insurance',
        'Pickup coordination at origin and stowage',
        'Local charges management and document release',
      ],
    },
  },
  {
    id: 'carga-aerea',
    slug: { es: 'carga-aerea', en: 'air-freight' },
    icono: 'plane',
    imagen: '/img/cr-air-cargo.jpg',
    es: {
      nombre: 'Carga Aérea',
      corto: 'Aéreo urgente y sensible',
      tagline: 'Cuando el tiempo apremia, volamos por ti.',
      resumen:
        'Entregas rápidas y seguras a cualquier destino internacional, con enfoque en la puntualidad y el manejo especializado de carga sensible, perecible o de alto valor.',
      intro:
        'La carga aérea resuelve lo que no puede esperar: reposiciones urgentes, muestras comerciales, repuestos críticos, insumos médicos y productos de alto valor. Operamos con aerolíneas de carga y consolidadores en los principales hubs, cumpliendo estándares internacionales de manipulación y seguridad.',
      beneficios: [
        'Tránsitos cortos y salidas frecuentes desde y hacia Lima (LIM).',
        'Cumplimiento de estándares internacionales de seguridad aérea.',
        'Manejo especializado de carga sensible, frágil y de cadena de frío.',
        'Optimización de tiempos y costos según la urgencia real del embarque.',
      ],
      incluye: [
        'Cotización de flete aéreo con alternativas de tránsito',
        'Emisión de Air Waybill (AWB) y documentación de embarque',
        'Handling en terminal de carga aérea',
        'Coordinación de carga peligrosa y perecible según normativa',
        'Entrega puerta a puerta con transporte terrestre integrado',
      ],
    },
    en: {
      nombre: 'Air Freight',
      corto: 'Urgent and sensitive air',
      tagline: 'When time is short, we fly for you.',
      resumen:
        'Fast, secure deliveries to any international destination, focused on punctuality and the specialised handling of sensitive, perishable or high-value cargo.',
      intro:
        'Air freight solves what cannot wait: urgent restocks, commercial samples, critical spare parts, medical supplies and high-value goods. We work with cargo airlines and consolidators at the main hubs, meeting international handling and security standards.',
      beneficios: [
        'Short transit times and frequent departures to and from Lima (LIM).',
        'Compliance with international air security standards.',
        'Specialised handling of sensitive, fragile and cold-chain cargo.',
        'Time and cost optimisation based on the real urgency of the shipment.',
      ],
      incluye: [
        'Air freight quote with transit alternatives',
        'Air Waybill (AWB) issuance and shipping documentation',
        'Handling at the air cargo terminal',
        'Dangerous and perishable goods coordination under regulation',
        'Door-to-door delivery with integrated road transport',
      ],
    },
  },
  {
    id: 'carga-consolidada',
    slug: { es: 'carga-consolidada', en: 'consolidated-cargo' },
    icono: 'boxes',
    imagen: '/img/cr-containers-aerial.jpg',
    es: {
      nombre: 'Carga Consolidada',
      corto: 'LCL y grupaje',
      tagline: 'Paga solo por el espacio que realmente usas.',
      resumen:
        'Optimizamos tus costos de envío unificando mercancías de diferentes clientes en un solo embarque, reduciendo el costo unitario sin renunciar al control de tu carga.',
      intro:
        'No todas las compras llenan un contenedor. La consolidación permite a importadores pequeños y medianos acceder a fletes internacionales competitivos pagando únicamente por el volumen ocupado, sin renunciar a la trazabilidad ni al control documental.',
      beneficios: [
        'Ideal para volúmenes que no justifican un contenedor completo.',
        'Reducción real del costo por metro cúbico o kilo tarifado.',
        'Consolidación en origen de varios proveedores en un solo embarque.',
        'Salidas programadas y tiempos de tránsito previsibles.',
      ],
      incluye: [
        'Recepción y consolidación de carga en almacén de origen',
        'Cubicaje, paletizado y refuerzo de embalaje',
        'Emisión de House Bill of Lading por cliente',
        'Desconsolidación en destino y entrega individual',
        'Reporte de estado por embarque consolidado',
      ],
    },
    en: {
      nombre: 'Consolidated Cargo',
      corto: 'LCL and groupage',
      tagline: 'Pay only for the space you actually use.',
      resumen:
        'We optimise your shipping costs by combining goods from different clients into a single shipment, cutting the unit cost without giving up control of your cargo.',
      intro:
        'Not every purchase fills a container. Consolidation lets small and mid-sized importers access competitive international freight by paying only for the volume they occupy, without losing traceability or document control.',
      beneficios: [
        'Ideal for volumes that do not justify a full container.',
        'Real reduction in cost per cubic metre or chargeable kilo.',
        'Consolidation at origin of several suppliers into one shipment.',
        'Scheduled departures and predictable transit times.',
      ],
      incluye: [
        'Receipt and consolidation of cargo at the origin warehouse',
        'Cubing, palletising and packaging reinforcement',
        'House Bill of Lading issuance per client',
        'Deconsolidation at destination and individual delivery',
        'Status report per consolidated shipment',
      ],
    },
  },
  {
    id: 'logistica-integral',
    slug: { es: 'logistica-integral', en: 'integrated-logistics' },
    icono: 'network',
    imagen: '/img/cr-air-sea.jpg',
    es: {
      nombre: 'Logística Integral',
      corto: 'Cadena de suministro completa',
      tagline: 'Un solo interlocutor para toda tu cadena de suministro.',
      resumen:
        'Una solución que abarca todo el ciclo de la cadena de suministro —origen, tránsito, aduana, almacén y distribución— optimizando cada etapa para maximizar la eficiencia.',
      intro:
        'Coordinar cinco proveedores distintos para un mismo embarque multiplica los errores y los costos ocultos. Con la logística integral de WOLI, un solo equipo diseña, ejecuta y controla la operación completa, con indicadores claros y un único punto de contacto responsable del resultado.',
      beneficios: [
        'Diseño de la operación end-to-end según tu modelo de negocio.',
        'Menos intermediarios, menos sobrecostos y menos tiempos muertos.',
        'Indicadores de cumplimiento, costo y tiempo por embarque.',
        'Escalable: crece con tu volumen sin rehacer el proceso.',
      ],
      incluye: [
        'Diagnóstico y rediseño de la cadena de suministro',
        'Gestión multimodal marítima, aérea y terrestre',
        'Agenciamiento de aduana y cumplimiento normativo',
        'Almacenaje y control de inventario',
        'Distribución nacional y última milla',
      ],
    },
    en: {
      nombre: 'Integrated Logistics',
      corto: 'Full supply chain',
      tagline: 'One single contact for your entire supply chain.',
      resumen:
        'A solution covering the full supply chain cycle — origin, transit, customs, warehousing and distribution — optimising every stage to maximise efficiency.',
      intro:
        'Coordinating five different suppliers for the same shipment multiplies errors and hidden costs. With WOLI integrated logistics, a single team designs, runs and controls the whole operation, with clear indicators and one point of contact accountable for the outcome.',
      beneficios: [
        'End-to-end operation design based on your business model.',
        'Fewer intermediaries, fewer extra costs and less dead time.',
        'Compliance, cost and time indicators per shipment.',
        'Scalable: it grows with your volume without redoing the process.',
      ],
      incluye: [
        'Supply chain assessment and redesign',
        'Multimodal ocean, air and road management',
        'Customs brokerage and regulatory compliance',
        'Warehousing and inventory control',
        'Domestic distribution and last mile',
      ],
    },
  },
  {
    id: 'transporte-internacional',
    slug: { es: 'transporte-internacional', en: 'international-transport' },
    icono: 'globe',
    imagen: '/img/cr-ship-map.jpg',
    es: {
      nombre: 'Transporte Internacional',
      corto: 'Multimodal global',
      tagline: 'Movemos tu carga a nivel global, por la ruta que más te conviene.',
      resumen:
        'Gestionamos envíos aéreos, marítimos y terrestres a nivel global con soluciones seguras y eficientes, asegurando entregas a tiempo y sin complicaciones.',
      intro:
        'Cada embarque tiene una ruta óptima distinta según urgencia, volumen, valor y estacionalidad. Analizamos las alternativas modales y te presentamos escenarios comparados —costo, tránsito y riesgo— para que la decisión sea informada y no una improvisación.',
      beneficios: [
        'Comparativo real entre modalidades antes de decidir.',
        'Red de agentes corresponsales en los principales mercados.',
        'Coordinación en origen y destino con un solo responsable.',
        'Gestión de incidencias y planes de contingencia.',
      ],
      incluye: [
        'Análisis de ruta y modalidad recomendada',
        'Negociación de flete con líneas navieras y aerolíneas',
        'Seguimiento de hitos y notificaciones proactivas',
        'Gestión documental completa del embarque',
        'Seguro internacional de mercancías opcional',
      ],
    },
    en: {
      nombre: 'International Transport',
      corto: 'Global multimodal',
      tagline: 'We move your cargo globally, by the route that suits you best.',
      resumen:
        'We manage air, ocean and road shipments worldwide with secure, efficient solutions, ensuring on-time deliveries with no complications.',
      intro:
        'Every shipment has a different optimal route depending on urgency, volume, value and seasonality. We analyse the modal alternatives and lay out compared scenarios — cost, transit and risk — so the decision is informed rather than improvised.',
      beneficios: [
        'A real comparison between modes before deciding.',
        'Correspondent agent network in the main markets.',
        'Coordination at origin and destination with a single owner.',
        'Incident management and contingency plans.',
      ],
      incluye: [
        'Route analysis and recommended mode',
        'Freight negotiation with shipping lines and airlines',
        'Milestone tracking and proactive notifications',
        'Complete shipment document management',
        'Optional international cargo insurance',
      ],
    },
  },
  {
    id: 'agenciamiento-aduana',
    slug: { es: 'agenciamiento-aduana', en: 'customs-brokerage' },
    icono: 'stamp',
    imagen: '/img/cr-port-cranes.jpg',
    es: {
      nombre: 'Agenciamiento de Aduana',
      corto: 'Despacho aduanero',
      tagline: 'Despacho rápido, seguro y en regla.',
      resumen:
        'Garantizamos un despacho aduanero ágil y seguro, asegurando el cumplimiento de toda la normativa vigente y evitando sobrecostos por almacenaje o rectificaciones.',
      intro:
        'Un error de clasificación arancelaria o un documento incompleto puede inmovilizar tu carga durante días y generar sobrecostos que superan al propio flete. Nuestro equipo aduanero revisa la operación antes del arribo para que el despacho sea un trámite y no un problema.',
      beneficios: [
        'Revisión documental anticipada para evitar observaciones.',
        'Clasificación arancelaria y determinación de tributos.',
        'Gestión de regímenes de importación, exportación y temporales.',
        'Reducción de días de almacenaje y demoras portuarias.',
      ],
      incluye: [
        'Numeración de DAM y despacho anticipado o diferido',
        'Clasificación arancelaria y liquidación de tributos',
        'Gestión de permisos ante entidades reguladoras',
        'Atención de canales naranja y rojo',
        'Regularización y archivo documental',
      ],
    },
    en: {
      nombre: 'Customs Brokerage',
      corto: 'Customs clearance',
      tagline: 'Fast, secure clearance, fully compliant.',
      resumen:
        'We guarantee agile, secure customs clearance, ensuring compliance with all applicable regulations and avoiding extra costs from storage or corrections.',
      intro:
        'A tariff classification error or an incomplete document can hold your cargo for days and generate extra costs higher than the freight itself. Our customs team reviews the operation before arrival so clearance is a formality, not a problem.',
      beneficios: [
        'Advance document review to avoid observations.',
        'Tariff classification and duty assessment.',
        'Management of import, export and temporary regimes.',
        'Fewer storage days and port demurrage.',
      ],
      incluye: [
        'Customs declaration filing, advance or deferred clearance',
        'Tariff classification and duty settlement',
        'Permit management with regulatory bodies',
        'Handling of orange and red inspection channels',
        'Regularisation and document filing',
      ],
    },
  },
  {
    id: 'almacenaje',
    slug: { es: 'almacenaje', en: 'warehousing' },
    icono: 'warehouse',
    imagen: '/img/op-03.jpg',
    es: {
      nombre: 'Almacén Simple y Temporal',
      corto: 'Almacenaje y custodia',
      tagline: 'Espacios seguros, estratégicamente ubicados.',
      resumen:
        'Soluciones de almacenamiento adaptadas a las necesidades de tu empresa, con espacios seguros, control de inventario y ubicación estratégica cerca de puerto.',
      intro:
        'El almacenaje deja de ser un costo y se convierte en una ventaja cuando está bien ubicado y bien gestionado. Ofrecemos custodia temporal para carga en tránsito y almacenaje simple para inventario de rotación, con control de ingresos y salidas documentado.',
      beneficios: [
        'Ubicación cercana a puerto y a los principales corredores logísticos.',
        'Control de inventario con registro de ingresos y salidas.',
        'Espacios acondicionados para carga paletizada y suelta.',
        'Flexibilidad de metraje según la temporada.',
      ],
      incluye: [
        'Recepción, verificación y registro de mercancía',
        'Almacenaje simple y depósito temporal',
        'Paletizado, etiquetado y reacondicionamiento',
        'Picking y preparación de pedidos',
        'Despacho programado hacia distribución',
      ],
    },
    en: {
      nombre: 'Simple and Temporary Warehousing',
      corto: 'Warehousing and custody',
      tagline: 'Secure spaces, strategically located.',
      resumen:
        'Storage solutions tailored to your company, with secure spaces, inventory control and a strategic location close to the port.',
      intro:
        'Warehousing stops being a cost and becomes an advantage when it is well located and well run. We offer temporary custody for cargo in transit and simple storage for rotating inventory, with documented in and out control.',
      beneficios: [
        'Located close to the port and the main logistics corridors.',
        'Inventory control with in and out records.',
        'Spaces fitted for palletised and loose cargo.',
        'Flexible floor space depending on the season.',
      ],
      incluye: [
        'Receipt, verification and recording of goods',
        'Simple storage and temporary deposit',
        'Palletising, labelling and reconditioning',
        'Picking and order preparation',
        'Scheduled dispatch to distribution',
      ],
    },
  },
  {
    id: 'ultima-milla',
    slug: { es: 'ultima-milla', en: 'last-mile-delivery' },
    icono: 'truck',
    imagen: '/img/op-01.jpg',
    es: {
      nombre: 'Distribución de Última Milla',
      corto: 'Entrega final',
      tagline: 'Flota propia de 15 y 7 toneladas, cobertura nacional.',
      resumen:
        'Entregamos tu mercancía directamente al cliente final con rapidez y precisión, optimizando rutas y tiempos de entrega en Lima y provincias.',
      intro:
        'La última milla es donde se juega la percepción de servicio de tu propia marca. Con flota propia de 15 y 7 toneladas y rutas planificadas, controlamos el tramo final sin depender de terceros y con evidencia de entrega documentada.',
      beneficios: [
        'Flota propia de 15 y 7 toneladas, sin tercerizar el tramo crítico.',
        'Cobertura nacional e internacional coordinada.',
        'Optimización de rutas y ventanas horarias de entrega.',
        'Constancia de entrega y reporte por destino.',
      ],
      incluye: [
        'Planificación de rutas y consolidación de despachos',
        'Transporte local, provincial y de retorno',
        'Entregas programadas y ventanas horarias',
        'Constancia de entrega digital',
        'Gestión de devoluciones y logística inversa',
      ],
    },
    en: {
      nombre: 'Last Mile Delivery',
      corto: 'Final delivery',
      tagline: 'Own fleet of 15 and 7 tonne trucks, nationwide coverage.',
      resumen:
        'We deliver your goods directly to the end customer quickly and accurately, optimising routes and delivery times in Lima and the provinces.',
      intro:
        'The last mile is where your own brand’s service perception is decided. With an own fleet of 15 and 7 tonne trucks and planned routes, we control the final leg without depending on third parties and with documented proof of delivery.',
      beneficios: [
        'Own fleet of 15 and 7 tonne trucks, no outsourcing of the critical leg.',
        'Coordinated national and international coverage.',
        'Route and delivery time-window optimisation.',
        'Proof of delivery and reporting per destination.',
      ],
      incluye: [
        'Route planning and dispatch consolidation',
        'Local, provincial and return transport',
        'Scheduled deliveries and time windows',
        'Digital proof of delivery',
        'Returns management and reverse logistics',
      ],
    },
  },
  {
    id: 'logistica-medica',
    slug: { es: 'logistica-medica', en: 'medical-logistics' },
    icono: 'medical',
    imagen: '/img/cr-fragile.jpg',
    destacado: true,
    es: {
      nombre: 'Logística Médica Internacional',
      corto: 'Carga médica y sensible',
      tagline: 'Expertos en carga médica: crítica, sensible y regulada.',
      resumen:
        'Personal especializado en el traslado internacional de equipamiento médico, insumos y dispositivos, con manejo cuidadoso y cumplimiento normativo de principio a fin.',
      intro:
        'La carga médica no admite improvisación: equipos de diagnóstico de alto valor, dispositivos sensibles, insumos con fecha de vencimiento y productos sujetos a autorización sanitaria. WOLI cuenta con personal profesional especializado en este tipo de operación, cuidando la integridad física de la carga y la trazabilidad documental que exigen las entidades reguladoras.',
      beneficios: [
        'Personal profesional y especializado en carga médica.',
        'Manejo de equipamiento delicado, frágil y de alto valor.',
        'Coordinación de requisitos sanitarios y permisos regulatorios.',
        'Optimización de tiempos y costos sin comprometer la integridad.',
      ],
      incluye: [
        'Evaluación de embalaje y condiciones de transporte',
        'Transporte aéreo o marítimo según criticidad',
        'Gestión de permisos y certificaciones sanitarias',
        'Manipulación especializada en origen, tránsito y destino',
        'Trazabilidad documental completa de la operación',
      ],
    },
    en: {
      nombre: 'International Medical Logistics',
      corto: 'Medical and sensitive cargo',
      tagline: 'Experts in medical cargo: critical, sensitive and regulated.',
      resumen:
        'Specialised staff for the international movement of medical equipment, supplies and devices, with careful handling and regulatory compliance from start to finish.',
      intro:
        'Medical cargo leaves no room for improvisation: high-value diagnostic equipment, sensitive devices, supplies with expiry dates and products subject to health authorisation. WOLI has professional staff specialised in this type of operation, protecting the physical integrity of the cargo and the document traceability required by regulators.',
      beneficios: [
        'Professional staff specialised in medical cargo.',
        'Handling of delicate, fragile and high-value equipment.',
        'Coordination of health requirements and regulatory permits.',
        'Time and cost optimisation without compromising integrity.',
      ],
      incluye: [
        'Assessment of packaging and transport conditions',
        'Air or ocean transport depending on criticality',
        'Management of health permits and certifications',
        'Specialised handling at origin, transit and destination',
        'Complete document traceability of the operation',
      ],
    },
  },
  {
    id: 'cargas-spot',
    slug: { es: 'cargas-spot', en: 'spot-shipments' },
    icono: 'bolt',
    imagen: '/img/cr-ship-front.jpg',
    destacado: true,
    es: {
      nombre: 'Cargas SPOT',
      corto: 'Sin contratos a largo plazo',
      tagline: 'Importa o exporta sin contratos ni compromisos de volumen.',
      resumen:
        'Para operaciones urgentes o puntuales: precio fijo y transparente, booking garantizado en el momento y cero compromisos a largo plazo.',
      intro:
        'No toda empresa necesita —ni quiere— amarrarse a un contrato anual. La modalidad SPOT está pensada para operaciones puntuales, picos de demanda o proyectos específicos: cotizas, aceptas el precio y reservas, sin volúmenes mínimos ni permanencia.',
      beneficios: [
        'Sin contratos a largo plazo ni volúmenes mínimos.',
        'Precio fijo y transparente al momento de la reserva.',
        'Ideal para operaciones urgentes o puntuales.',
        'Booking garantizado al confirmar la operación.',
      ],
      incluye: [
        'Cotización SPOT con validez definida',
        'Confirmación inmediata de espacio disponible',
        'Gestión completa del embarque puntual',
        'Opción de agenciamiento aduanero asociado',
        'Sin permanencia ni penalidades',
      ],
    },
    en: {
      nombre: 'SPOT Shipments',
      corto: 'No long-term contracts',
      tagline: 'Import or export with no contracts or volume commitments.',
      resumen:
        'For urgent or one-off operations: fixed transparent pricing, booking guaranteed on the spot and zero long-term commitments.',
      intro:
        'Not every company needs — or wants — to be tied to an annual contract. The SPOT mode is designed for one-off operations, demand peaks or specific projects: you get a quote, accept the price and book, with no minimum volumes and no lock-in.',
      beneficios: [
        'No long-term contracts and no minimum volumes.',
        'Fixed, transparent price at the moment of booking.',
        'Ideal for urgent or one-off operations.',
        'Booking guaranteed when the operation is confirmed.',
      ],
      incluye: [
        'SPOT quote with a defined validity',
        'Immediate confirmation of available space',
        'Full management of the one-off shipment',
        'Optional associated customs brokerage',
        'No lock-in and no penalties',
      ],
    },
  },
];

/** Servicio con sus textos ya resueltos en el idioma pedido. */
export const localizar = (servicio, lang = 'es') => ({
  ...servicio,
  ...(servicio[lang] ?? servicio.es),
  slugActual: servicio.slug[lang] ?? servicio.slug.es,
});

/** Lista completa localizada. */
export const serviciosDe = (lang = 'es') => servicios.map((s) => localizar(s, lang));

/** Busca por slug dentro de un idioma. */
export const buscarPorSlug = (slug, lang = 'es') => servicios.find((s) => (s.slug[lang] ?? s.slug.es) === slug);
