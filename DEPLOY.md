# Guía de despliegue — WOLI

El proyecto compila a HTML estático, por lo que el **mismo código** se publica en Vercel o en un
hosting cPanel sin cambios. Lo único que difiere es el endpoint que procesa los formularios, y eso
se resuelve solo: el navegador intenta primero `/api/enviar.php` (cPanel) y, si no existe, usa
`/api/enviar` (Vercel).

El sitio es bilingüe: **español en la raíz** e **inglés bajo `/en/`**. Son páginas HTML reales,
no traducción por JavaScript, así que ambas versiones se indexan por separado.

---

## Antes de publicar

1. **Sube el vídeo de portada** a `public/video/hero.mp4` (ver `public/video/LEEME.txt`).
   No hay que tocar código: si el archivo está, el hero lo usa; si no, muestra la imagen de respaldo.
2. **Completa el RUC** en `src/data/site.js` (`site.ruc`). Aparece en el Libro de Reclamaciones.
3. **Reemplaza los enlaces de redes sociales** en `src/data/site.js` por los perfiles reales.

---

## Opción A — Vercel (a través de GitHub)

1. En [vercel.com](https://vercel.com) → **Add New… → Project** → importa `Promptivegrowth/WOLI`.
2. Vercel detecta Astro automáticamente. No cambies nada:
   - Framework Preset: `Astro`
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Deploy**. Cada `git push` a la rama principal vuelve a publicar el sitio.

### Dominio propio

**Settings → Domains → Add** `wlicargo.com` y `www.wlicargo.com`. Vercel indica los registros DNS
a crear en Namecheap (normalmente un `A` a `76.76.21.21` y un `CNAME` de `www` a `cname.vercel-dns.com`).

### Correo de los formularios en Vercel

PHP no se ejecuta en Vercel, así que la función `api/enviar.js` envía el correo a través de
[Resend](https://resend.com). En **Settings → Environment Variables** agrega:

| Variable | Valor | Obligatoria |
|---|---|---|
| `RESEND_API_KEY` | Clave de API de Resend | Sí |
| `MAIL_TO` | `gerencia@wlicargo.com` | No (es el valor por defecto) |
| `MAIL_FROM` | `World Logistics International <no-reply@wlicargo.com>` | No (es el valor por defecto) |

El dominio del remitente debe estar verificado en Resend.

> **Sin esta clave los formularios no envían correo**, pero el sitio no se rompe: muestra un aviso
> y ofrece el botón de WhatsApp y el correo directo, que siempre funcionan.

---

## Opción B — cPanel de Namecheap

Esta es la opción recomendada si se quiere mantener el correo del propio hosting, porque
`mail()` de PHP funciona sin servicios externos.

### 1. Compilar

En tu computadora:

```bash
npm install
npm run build
```

Se genera la carpeta **`dist/`** con todo el sitio ya resuelto, incluidas las dos versiones de idioma.

### 2. Subir

1. cPanel → **Administrador de archivos** → entra a `public_html`.
2. Borra el contenido del sitio anterior (haz una copia de seguridad antes).
3. Comprime **el contenido de `dist/`** en un `.zip` — el zip debe contener `index.html` en la raíz,
   no una carpeta `dist` dentro.
4. Sube el `.zip` a `public_html` y usa **Extraer**.
5. Verifica que `.htaccess` haya quedado en `public_html`. El Administrador de archivos oculta los
   archivos que empiezan con punto: activa **Configuración → Mostrar archivos ocultos**.

El `.htaccess` incluido ya sirve las URLs limpias de los dos idiomas (`/servicios` y `/en/services`).

### 3. Configurar el correo

1. cPanel → **Cuentas de correo** → crea `no-reply@wlicargo.com`.
2. Edita `public_html/api/enviar.php` y revisa el bloque `CONFIG` del inicio:

```php
const DESTINATARIO       = 'gerencia@wlicargo.com';
const DESTINATARIO_LIBRO = 'gerencia@wlicargo.com';
const REMITENTE          = 'no-reply@wlicargo.com';  // debe ser del propio dominio
```

El remitente **tiene que pertenecer al dominio** o los proveedores marcarán los correos como spam.

3. Comprueba que PHP esté en 8.0 o superior en **Select PHP Version** (el archivo usa
   `str_starts_with`, disponible desde PHP 8.0).

### 4. Registros del Libro de Reclamaciones

Cada registro se guarda además en `public_html/api/registros/AAAA-MM.jsonl` como respaldo, tal como
exige el Código de Protección y Defensa del Consumidor. El propio script crea ahí un `.htaccess`
que impide su acceso desde la web. **Descarga esa carpeta periódicamente** y no la borres.

### 5. HTTPS y dominio

1. cPanel → **SSL/TLS Status** → emite el certificado gratuito (AutoSSL) para el dominio.
2. Con el certificado activo, edita `public_html/.htaccess` y descomenta el bloque de HTTPS:

```apache
RewriteCond %{HTTPS} !=on
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
```

3. Si quieres forzar la versión sin `www`, descomenta también ese bloque.

---

## Después de publicar

- [ ] Probar el formulario de **contacto** y confirmar que llega el correo.
- [ ] Probar el formulario de **cotización**.
- [ ] Probar el **Libro de Reclamaciones** y verificar que llegue la constancia al correo del usuario.
- [ ] Revisar la versión en inglés: `/en` y el cambio de idioma desde cualquier página interior.
- [ ] Comprobar que el vídeo de portada carga y se reproduce en silencio.
- [ ] Enviar `https://wlicargo.com/sitemap-index.xml` a Google Search Console, y declarar allí las
      dos versiones de idioma.
- [ ] Revisar que el panel de tracking abra correctamente desde `/tracking`.

---

## Actualizar el sitio más adelante

**En Vercel:** edita, `git commit`, `git push`. Se publica solo.

**En cPanel:** edita, `npm run build`, y vuelve a subir el contenido de `dist/`.
Si solo cambiaste un PDF, una imagen o el vídeo, basta con reemplazar ese archivo dentro de
`public_html/docs/`, `public_html/img/` o `public_html/video/`.
