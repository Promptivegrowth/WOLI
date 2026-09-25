# Guía de despliegue — WOLI

El proyecto compila a HTML estático, por lo que el **mismo código** se publica en Vercel o en un
hosting cPanel sin cambios.

Los formularios (contacto, cotización y Libro de Reclamaciones) se envían al **portal del Grupo
Pacheco** (`public/js/portal.js`), que guarda cada registro, numera las hojas de reclamación,
genera su PDF y envía los correos. La web no necesita PHP, funciones propias ni claves de correo.
Los datos de contacto (WhatsApp, correo, dirección, horario y redes) se editan desde el portal y se
aplican en vivo (`public/js/datos-vivos.js`); el HTML conserva los valores de `src/data/site.js`
como respaldo.

El sitio es bilingüe: **español en la raíz** e **inglés bajo `/en/`**. Son páginas HTML reales,
no traducción por JavaScript, así que ambas versiones se indexan por separado.

---

## Antes de publicar

1. **Sube el vídeo de portada** a `public/video/hero.mp4` (ver `public/video/LEEME.txt`).
   No hay que tocar código: si el archivo está, el hero lo usa; si no, muestra la imagen de respaldo.
2. **Confirma el RUC** en `src/data/site.js` (`site.ruc`). Está puesto como `20608160061`,
   tomado del parámetro `ruc` de las URL del sistema de embarques. Aparece en la cabecera del
   Libro de Reclamaciones y en el PDF de cada hoja (tabla `empresas` del portal).
3. **Redes sociales**: se configuran en el portal (Datos de la web). Las de `src/data/site.js`
   solo se ven si el portal no responde.

---

## Opción A — Vercel (a través de GitHub)

1. En [vercel.com](https://vercel.com) → **Add New… → Project** → importa `Promptivegrowth/WOLI`.
2. Vercel detecta Astro automáticamente. No cambies nada:
   - Framework Preset: `Astro`
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Deploy**. Cada `git push` a la rama principal vuelve a publicar el sitio.

### Dominio propio

**Settings → Domains → Add** `wlicargo.com` y `www.wlicargo.com`, y crea en el DNS los registros
exactos que indique Vercel.

---

## Opción B — cPanel de Namecheap

### 1. Compilar

En tu computadora:

```bash
npm install
npm run build
```

Se genera la carpeta **`dist/`** con todo el sitio ya resuelto, incluidas las dos versiones de idioma.

### 2. Subir

1. cPanel → **Administrador de archivos** → entra a `public_html`.
2. Haz una copia de seguridad del sitio anterior y bórralo **excepto `api/registros/`** (ver abajo).
3. Comprime **el contenido de `dist/`** en un `.zip` — el zip debe contener `index.html` en la raíz,
   no una carpeta `dist` dentro.
4. Sube el `.zip` a `public_html` y usa **Extraer**.
5. Verifica que `.htaccess` haya quedado en `public_html`. El Administrador de archivos oculta los
   archivos que empiezan con punto: activa **Configuración → Mostrar archivos ocultos**.

El `.htaccess` incluido ya sirve las URLs limpias de los dos idiomas (`/servicios` y `/en/services`).

### 3. Registros antiguos del Libro de Reclamaciones

La versión anterior del sitio guardaba cada hoja en `public_html/api/registros/AAAA-MM.jsonl`.
Si existe esa carpeta, **descárgala y consérvala**: las hojas de reclamación deben guardarse al
menos dos años. Desde esta versión, las hojas nuevas quedan en el portal del Grupo Pacheco.

### 4. HTTPS y dominio

1. cPanel → **SSL/TLS Status** → emite el certificado gratuito (AutoSSL) para el dominio.
2. Con el certificado activo, edita `public_html/.htaccess` y descomenta el bloque de HTTPS:

```apache
RewriteCond %{HTTPS} !=on
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
```

3. Si quieres forzar la versión sin `www`, descomenta también ese bloque.

---

## Después de publicar

- [ ] Probar el formulario de **contacto** y confirmar que el mensaje aparece en el portal.
- [ ] Probar el formulario de **cotización**.
- [ ] Probar el **Libro de Reclamaciones**: la constancia con su número debe verse en la web, la
      hoja debe aparecer en el portal y, con el correo configurado, llegar al usuario en PDF.
- [ ] Revisar la versión en inglés: `/en` y el cambio de idioma desde cualquier página interior.
- [ ] Comprobar que el vídeo de portada carga y se reproduce en silencio.
- [ ] Enviar `https://wlicargo.com/sitemap-index.xml` a Google Search Console, y declarar allí las
      dos versiones de idioma.
- [ ] Revisar que los dos accesos abran correctamente desde `/tracking`:
      **Seguimiento** (búsqueda pública por Nro. de Orden o HBL) y **Zona Cliente** (login).

---

## Actualizar el sitio más adelante

**Datos de contacto y redes:** desde el portal, sin publicar de nuevo.

**En Vercel:** edita, `git commit`, `git push`. Se publica solo.

**En cPanel:** edita, `npm run build`, y vuelve a subir el contenido de `dist/`.
Si solo cambiaste un PDF, una imagen o el vídeo, basta con reemplazar ese archivo dentro de
`public_html/docs/`, `public_html/img/` o `public_html/video/`.
