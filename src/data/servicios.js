export const servicios = [
  {
    slug: 'carga-maritima',
    nombre: 'Carga Marítima',
    corto: 'Marítimo FCL y LCL',
    icono: 'ship',
    imagen: '/img/cr-ship-dusk.jpg',
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
    keywords: 'carga marítima Perú, flete marítimo Callao, FCL LCL, importación marítima',
  },
  {
    slug: 'carga-aerea',
    nombre: 'Carga Aérea',
    corto: 'Aéreo urgente y sensible',
    icono: 'plane',
    imagen: '/img/cr-air-cargo.jpg',
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
    keywords: 'carga aérea Perú, flete aéreo Lima, envío urgente internacional',
  },
  {
    slug: 'carga-consolidada',
    nombre: 'Carga Consolidada',
    corto: 'LCL y grupaje',
    icono: 'boxes',
    imagen: '/img/cr-containers-aerial.jpg',
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
    keywords: 'carga consolidada Perú, LCL, grupaje importación, consolidado marítimo',
  },
  {
    slug: 'logistica-integral',
    nombre: 'Logística Integral',
    corto: 'Cadena de suministro completa',
    icono: 'network',
    imagen: '/img/cr-air-sea.jpg',
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
    keywords: 'logística integral Perú, cadena de suministro, operador logístico 3PL',
  },
  {
    slug: 'transporte-internacional',
    nombre: 'Transporte Internacional',
    corto: 'Multimodal global',
    icono: 'globe',
    imagen: '/img/cr-ship-map.jpg',
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
    keywords: 'transporte internacional de carga, freight forwarder Perú, envíos globales',
  },
  {
    slug: 'agenciamiento-aduana',
    nombre: 'Agenciamiento de Aduana',
    corto: 'Despacho aduanero',
    icono: 'stamp',
    imagen: '/img/cr-port-cranes.jpg',
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
    keywords: 'agencia de aduana Perú, despacho aduanero Callao, agenciamiento aduanero',
  },
  {
    slug: 'almacenaje',
    nombre: 'Almacén Simple y Temporal',
    corto: 'Almacenaje y custodia',
    icono: 'warehouse',
    imagen: '/img/op-03.jpg',
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
    keywords: 'almacén temporal Callao, depósito simple, almacenaje logístico Lima',
  },
  {
    slug: 'ultima-milla',
    nombre: 'Distribución de Última Milla',
    corto: 'Entrega final',
    icono: 'truck',
    imagen: '/img/op-01.jpg',
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
    keywords: 'distribución última milla Lima, transporte de carga Perú, flota propia',
  },
  {
    slug: 'logistica-medica',
    nombre: 'Logística Médica Internacional',
    corto: 'Carga médica y sensible',
    icono: 'medical',
    imagen: '/img/cr-fragile.jpg',
    destacado: true,
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
    keywords: 'logística médica internacional, transporte de equipos médicos Perú, carga sensible',
  },
  {
    slug: 'cargas-spot',
    nombre: 'Cargas SPOT',
    corto: 'Sin contratos a largo plazo',
    icono: 'bolt',
    imagen: '/img/cr-ship-front.jpg',
    destacado: true,
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
    keywords: 'carga spot Perú, flete spot, importación sin contrato',
  },
];

export const getServicio = (slug) => servicios.find((s) => s.slug === slug);
