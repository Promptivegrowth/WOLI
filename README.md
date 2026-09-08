# WOLI — World Logistics International

Sitio web corporativo de **World Logistics International (WOLI)**, operador logístico peruano
con más de 20 años de experiencia en carga marítima, aérea, consolidada, agenciamiento de aduana
y logística médica internacional.

> Reemplaza al sitio anterior de una sola página (`wlicargo.com`) por un sitio multipágina,
> estático y de carga rápida, preparado para desplegarse **tanto en Vercel como en cPanel**.

---

## Stack

| Pieza | Decisión | Motivo |
|---|---|---|
| Framework | **Astro 5** con `output: 'static'` | Genera HTML plano: se sirve igual en Vercel que en un Apache de cPanel. |
| Estilos | CSS propio con *design tokens* (`src/styles/global.css`) | Sin dependencias ni build de CSS; identidad visual a medida y sin plantilla. |
| JavaScript | *Vanilla*, en línea y mínimo | Sin framework de cliente; la web funciona incluso si el JS falla. |
| Formularios | PHP (cPanel) + función serverless (Vercel), con salida por WhatsApp siempre disponible | Un mismo formulario funciona en los dos hostings. |
| Tipografías | Manrope + Inter (Google Fonts) | Geométrica moderna, afín al logotipo. |

Paleta corporativa: `#F2561D` · `#115D8C` · `#153F59` · blanco · negro.

---

## Estructura

```
├── api/enviar.js                 Función serverless de formularios (solo Vercel)
├── astro.config.mjs
├── public/
│   ├── .htaccess                 Reglas de Apache para cPanel (URLs limpias, caché, seguridad)
│   ├── api/enviar.php            Endpoint de formularios (solo cPanel)
│   ├── brand/                    Logotipos, isotipos y favicons
│   ├── docs/                     Tarifarios en PDF
│   ├── img/                      Fotografía curada y optimizada
│   ├── js/woli-forms.js          Validación y envío de formularios
│   ├── robots.txt, site.webmanifest
├── src/
│   ├── components/               Header, Footer, Preloader, ServiceCard, Icon, CtaBand, PageHead
│   ├── data/                     site.js · servicios.js · tarifarios.js  ← contenido editable
│   ├── layouts/Base.astro        SEO, datos estructurados, scripts globales
│   ├── pages/                    Rutas del sitio
│   └── styles/global.css         Sistema de diseño completo
└── vercel.json
```

### Páginas

`/` · `/nosotros` · `/servicios` · `/servicios/[10 servicios]` · `/tarifarios` · `/tracking`
`/cotizacion` · `/contacto` · `/libro-de-reclamaciones` · `/privacidad` · `404`

---

## Desarrollo

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera dist/
npm run preview   # sirve dist/ localmente
```

Requiere Node 18 o superior.

---

## Editar el contenido

Casi todo el texto vive en tres archivos, sin tocar el maquetado:

- **`src/data/site.js`** — dirección, correo, WhatsApp, horario, redes sociales, cifras,
  diferenciales, valores, testimonios, pasos del proceso y enlace del panel de tracking.
- **`src/data/servicios.js`** — los 10 servicios: nombre, resumen, introducción, beneficios,
  qué incluye e imagen. Añadir un objeto aquí crea automáticamente su página en `/servicios/<slug>`.
- **`src/data/tarifarios.js`** — los PDF por terminal. Sube el archivo a `public/docs/` y añade la entrada.

### Pendiente de completar

`site.ruc` está vacío en `src/data/site.js`. Al llenarlo, el RUC aparece automáticamente en la
cabecera del Libro de Reclamaciones, como exige la normativa.

---

## Despliegue

Ver **[DEPLOY.md](DEPLOY.md)** para las instrucciones detalladas de Vercel y de cPanel.

Resumen:

- **Vercel** — conectar el repositorio; Astro se detecta solo. Sin configuración adicional.
- **cPanel** — `npm run build` y subir **el contenido de `dist/`** a `public_html/`.

---

## Preloader

La pantalla de carga **es el seguimiento de un envío**. Un contenedor recorre una ruta ascendente
—el mismo gesto de la flecha del isotipo— mientras se encienden los cuatro hitos de la operación:
**Recojo → Embarque → Tránsito → Entrega**. La posición del contenedor, el tramo naranja de la ruta,
el porcentaje y el rótulo de estado están atados al progreso real de carga de la página.

- Versión clara sobre fondo blanco, para que el concepto se lea de inmediato.
- Se muestra completo solo en la primera visita de cada sesión (`sessionStorage`).
- Respeta `prefers-reduced-motion`.
- Salvaguarda de 6 segundos: nunca deja el contenido bloqueado.

---

## Accesibilidad y rendimiento

- HTML semántico, un único `<h1>` por página y textos alternativos en todas las imágenes.
- Navegación por teclado, `:focus-visible` visible y enlace de salto al contenido.
- Todas las animaciones se desactivan con `prefers-reduced-motion`.
- Imágenes optimizadas y con carga diferida; tipografías con `display=swap`.
- Responsive verificado de 320 px a 1920 px: sin desborde horizontal en ninguna página y áreas
  táctiles de al menos 34 px en los controles interactivos.
- Datos estructurados JSON-LD (`LogisticsBusiness`, `Service`, `ItemList`, `ContactPage`) y
  `sitemap-index.xml` generado en cada compilación.
