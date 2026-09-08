# WOLI — World Logistics International

Sitio web corporativo de **World Logistics International (WOLI)**, operador logístico peruano
con más de 20 años de experiencia en carga marítima, aérea, consolidada, agenciamiento de aduana
y logística médica internacional.

> Sitio **bilingüe** (español / inglés), estático y de carga rápida, preparado para desplegarse
> **tanto en Vercel como en cPanel** sin cambiar una línea de código.

---

## Stack

| Pieza | Decisión | Motivo |
|---|---|---|
| Framework | **Astro 5** con `output: 'static'` | Genera HTML plano: se sirve igual en Vercel que en un Apache de cPanel. |
| Estilos | CSS propio con *design tokens* (`src/styles/global.css`) | Sin dependencias ni build de CSS; identidad visual a medida y sin plantilla. |
| JavaScript | *Vanilla*, en línea y mínimo | Sin framework de cliente; la web funciona incluso si el JS falla. |
| Idiomas | Rutas separadas y diccionario propio (`src/i18n/`) | Español en `/`, inglés en `/en/`, con slugs traducidos y `hreflang`. |
| Formularios | PHP (cPanel) + función serverless (Vercel), con salida por WhatsApp siempre disponible | Un mismo formulario funciona en los dos hostings. |
| Tipografías | Exo 2 (display) + Schibsted Grotesk (texto) | Geométrica técnica para titulares; grotesca neutra para lectura. |

Paleta corporativa: `#F2561D` · `#115D8C` · `#153F59` · blanco · negro.

---

## Lenguaje visual: la geometría del contenedor

Toda la maqueta sale de una idea: **losas de color que sangran hasta el borde de la página con
una sola esquina muy redondeada**, como la esquina de un contenedor visto de canto.

```css
--rc: clamp(30px, 6.4vw, 96px);   /* radio grande, el gesto principal */
--rc-sm: clamp(20px, 3.4vw, 48px); /* el mismo gesto en tarjetas */
```

Clases disponibles: `.slab` más `.slab--tr`, `.slab--tl`, `.slab--left`, `.slab--right`,
`.slab--top`, `.slab--tl-br`. Para sangrar hasta el borde de la ventana desde dentro de `.wrap`,
`.bleed-l` y `.bleed-r`.

Otros recursos del sistema:

- **`.ital`** — la palabra enfatizada del titular, en itálica contorneada. El color del trazo se
  controla con la variable `--ital` (blanco sobre fondos oscuros, tinta sobre claros,
  `.ital--orange` para el acento).
- **`.feature`** — losa de color con una imagen que se sale de ella.
- **`.marquee`** — marquesinas continuas; `variante="ticker"` para la banda estrecha.
- **`.acc`** — acordeón; con `data-single="true"` solo queda uno abierto.
- **`.sticker`** — sello circular giratorio del hero.

---

## Estructura

```
├── api/enviar.js                 Función serverless de formularios (solo Vercel)
├── astro.config.mjs
├── public/
│   ├── .htaccess                 Reglas de Apache para cPanel
│   ├── api/enviar.php            Endpoint de formularios (solo cPanel)
│   ├── brand/                    Logotipos, isotipos y favicons
│   ├── docs/                     Tarifarios en PDF
│   ├── img/                      Fotografía curada y optimizada
│   ├── js/woli-forms.js          Validación y envío de formularios
│   └── video/                    Vídeo de portada (ver LEEME.txt)
├── src/
│   ├── components/               Header, Footer, Hero, Preloader, Marquee, ServiceCard…
│   ├── data/                     site.js · servicios.js · tarifarios.js
│   ├── i18n/                     config.js (rutas) · ui.js (textos) · privacidad.js
│   ├── layouts/Base.astro        SEO, hreflang, datos estructurados, scripts globales
│   ├── paginas/                  El cuerpo de cada página, compartido por los dos idiomas
│   ├── pages/                    Rutas: raíz en español, /en en inglés
│   └── styles/global.css         Sistema de diseño completo
└── vercel.json
```

### Rutas

| Página | Español | Inglés |
|---|---|---|
| Inicio | `/` | `/en` |
| Nosotros | `/nosotros` | `/en/about` |
| Servicios | `/servicios` | `/en/services` |
| Ficha de servicio | `/servicios/carga-maritima` | `/en/services/ocean-freight` |
| Tarifarios | `/tarifarios` | `/en/rates` |
| Tracking | `/tracking` | `/en/tracking` |
| Cotización | `/cotizacion` | `/en/quote` |
| Contacto | `/contacto` | `/en/contact` |
| Libro de Reclamaciones | `/libro-de-reclamaciones` | `/en/complaints-book` |
| Privacidad | `/privacidad` | `/en/privacy` |

39 páginas en total. El selector de idioma de la cabecera lleva siempre a **la misma página** en
el otro idioma, no al inicio.

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

Nada de texto vive en el maquetado. Todo está en cuatro archivos:

- **`src/i18n/ui.js`** — todos los textos de interfaz y de página, en `es` y `en`. Es el archivo
  que más se toca.
- **`src/i18n/config.js`** — la tabla de rutas por idioma y el menú principal.
- **`src/data/site.js`** — dirección, correo, WhatsApp, horario, redes, cifras, valores,
  testimonios y pasos del proceso.
- **`src/data/servicios.js`** — los 10 servicios, con sus textos y su slug en cada idioma.
  Añadir un objeto aquí crea automáticamente sus dos fichas.
- **`src/data/tarifarios.js`** — los PDF por terminal.

### Vídeo de portada

Deja `hero.mp4` (y opcionalmente `hero.webm`) en `public/video/`. **No hay que tocar código**:
al compilar, el hero comprueba si el archivo existe y lo usa; si no está, muestra la imagen de
respaldo. Las recomendaciones de formato están en `public/video/LEEME.txt`.

### Pendiente de completar

- `site.ruc` está puesto como `20608160061`, tomado del parámetro `ruc` de las URL del sistema de
  embarques. **Conviene confirmarlo**: se muestra en la cabecera del Libro de Reclamaciones.
- Los enlaces de redes sociales apuntan a los dominios genéricos: reemplázalos por los perfiles reales.

### Accesos al sistema de embarques

Son dos, y viven en `src/data/site.js`:

| Campo | Qué es | Necesita credenciales |
|---|---|---|
| `site.seguimiento` | Búsqueda pública por Nro. de Orden o HBL | No |
| `site.zonaCliente` | Área privada con toda la operación | Sí (el RUC va precargado en la URL) |

Ambos aparecen en la barra de utilidad y en `/tracking`.

---

## Despliegue

Ver **[DEPLOY.md](DEPLOY.md)**. Resumen:

- **Vercel** — conectar el repositorio; Astro se detecta solo.
- **cPanel** — `npm run build` y subir **el contenido de `dist/`** a `public_html/`.

---

## Preloader

La pantalla de carga **es el seguimiento de un envío**. Un contenedor recorre una ruta ascendente
—el mismo gesto de la flecha del isotipo— mientras se encienden los cuatro hitos de la operación:
**Recojo → Embarque → Tránsito → Entrega**. La posición del contenedor, el tramo naranja de la
ruta, el porcentaje y el rótulo de estado están atados al progreso real de carga de la página.

- Traducido a los dos idiomas.
- Se muestra completo solo en la primera visita de cada sesión (`sessionStorage`).
- Respeta `prefers-reduced-motion`.
- Salvaguarda de 6 segundos: nunca deja el contenido bloqueado.

---

## Accesibilidad y rendimiento

- HTML semántico, un único `<h1>` por página y textos alternativos en todas las imágenes.
- Navegación por teclado, `:focus-visible` visible y enlace de salto al contenido.
- El acordeón usa `aria-expanded` y `aria-controls`; el menú móvil se cierra con `Escape`.
- Todas las animaciones se desactivan con `prefers-reduced-motion`, incluidas las marquesinas.
- Imágenes optimizadas y con carga diferida; tipografías con `display=swap`.
- Responsive verificado de 320 px a 1920 px en las 21 rutas: sin desborde horizontal.
- `hreflang` recíproco entre idiomas, datos estructurados JSON-LD y `sitemap-index.xml`.
