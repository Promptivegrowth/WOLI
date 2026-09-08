/**
 * WOLI · Función serverless de formularios para Vercel.
 *
 * En cPanel el formulario usa /api/enviar.php; en Vercel se usa este archivo.
 * El envío real de correo requiere una variable de entorno RESEND_API_KEY
 * (https://resend.com). Sin ella, la función responde con un error controlado
 * y el formulario ofrece automáticamente la vía de WhatsApp o correo directo.
 *
 * Variables de entorno (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY   Clave de API de Resend                (obligatoria)
 *   MAIL_TO          Destino de los avisos                 (por defecto gerencia@wlicargo.com)
 *   MAIL_FROM        Remitente verificado en el dominio    (por defecto no-reply@wlicargo.com)
 */

const ETIQUETAS = {
  nombre: 'Nombre completo',
  empresa: 'Empresa',
  ruc: 'RUC',
  email: 'Correo electrónico',
  telefono: 'Teléfono',
  servicio: 'Servicio de interés',
  modalidad: 'Modalidad',
  origen: 'Origen',
  destino: 'Destino',
  carga: 'Tipo de carga',
  peso: 'Peso / volumen',
  incoterm: 'Incoterm',
  mensaje: 'Mensaje',
  tipo_registro: 'Tipo de registro',
  documento: 'Documento de identidad',
  tipo_documento: 'Tipo de documento',
  direccion: 'Dirección',
  menor_edad: 'Es menor de edad',
  apoderado: 'Padre o apoderado',
  tipo_bien: 'Tipo de bien contratado',
  monto: 'Monto reclamado',
  descripcion_bien: 'Descripción del bien o servicio',
  detalle: 'Detalle del reclamo o queja',
  pedido: 'Pedido del consumidor',
};

const OBLIGATORIOS = {
  contacto: ['nombre', 'email', 'mensaje'],
  cotizacion: ['nombre', 'email', 'servicio'],
  reclamacion: ['tipo_registro', 'nombre', 'documento', 'email', 'detalle', 'pedido'],
};

const escapar = (v) =>
  String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const limpiar = (v) => (typeof v === 'string' ? v.replace(/[\r\n]+/g, ' ').trim() : v == null ? '' : String(v));

function codigoRegistro(tipo) {
  const rand = Math.random().toString(16).slice(2, 7).toUpperCase();
  const hoy = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  return `${tipo === 'reclamacion' ? 'LR' : 'WO'}-${hoy}-${rand}`;
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Método no permitido.' });
  }

  let data = req.body;
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch {
      data = null;
    }
  }
  if (!data || typeof data !== 'object') {
    return res.status(400).json({ ok: false, error: 'No se recibieron datos.' });
  }

  // Trampa antispam
  if (data.hp_website) return res.status(200).json({ ok: true, mensaje: 'Recibido.' });

  const tipo = limpiar(data._tipo) || 'contacto';
  const correo = limpiar(data.email);
  if (correo && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo)) {
    return res.status(422).json({ ok: false, error: 'El correo electrónico no es válido.' });
  }
  for (const campo of OBLIGATORIOS[tipo] || OBLIGATORIOS.contacto) {
    if (!limpiar(data[campo])) {
      return res.status(422).json({ ok: false, error: 'Faltan campos obligatorios.' });
    }
  }

  const codigo = codigoRegistro(tipo);
  const titulo =
    tipo === 'reclamacion'
      ? 'Libro de Reclamaciones — nuevo registro'
      : tipo === 'cotizacion'
        ? 'Nueva solicitud de cotización'
        : 'Nuevo mensaje de contacto';

  const filas = Object.entries(data)
    .filter(([k, v]) => !k.startsWith('_') && k !== 'hp_website' && limpiar(v))
    .map(
      ([k, v]) =>
        `<tr><td style="padding:9px 14px;border-bottom:1px solid #e6ecf1;font:600 13px Arial,sans-serif;color:#153F59;white-space:nowrap;vertical-align:top">${escapar(
          ETIQUETAS[k] || k
        )}</td><td style="padding:9px 14px;border-bottom:1px solid #e6ecf1;font:400 14px Arial,sans-serif;color:#10222f">${escapar(
          limpiar(v)
        )}</td></tr>`
    )
    .join('');

  const html = `<!doctype html><html lang="es"><body style="margin:0;background:#f4f7f9;padding:26px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e6ecf1"><tr><td style="background:#153F59;padding:22px 26px"><p style="margin:0;font:800 18px Arial,sans-serif;color:#fff">${escapar(
    titulo
  )}</p><p style="margin:6px 0 0;font:400 13px Arial,sans-serif;color:#F2561D">Código ${codigo} · ${new Date().toLocaleString(
    'es-PE'
  )}</p></td></tr><tr><td style="padding:8px 12px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${filas}</table></td></tr><tr><td style="padding:16px 26px;background:#f4f7f9;font:400 12px Arial,sans-serif;color:#7a8f9c">Enviado desde ${escapar(
    limpiar(data._pagina) || 'wlicargo.com'
  )}</td></tr></table></body></html>`;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      ok: false,
      error: 'El envío por correo no está configurado en este despliegue.',
    });
  }

  const destino = process.env.MAIL_TO || 'gerencia@wlicargo.com';
  const remitente = process.env.MAIL_FROM || 'World Logistics International <no-reply@wlicargo.com>';

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: remitente,
        to: [destino],
        reply_to: correo || undefined,
        subject: `[${codigo}] ${titulo}`,
        html,
      }),
    });

    if (!r.ok) {
      const detalle = await r.text();
      console.error('Resend respondió con error:', detalle);
      return res.status(502).json({ ok: false, error: 'El servidor de correo rechazó el envío.' });
    }

    if (tipo === 'reclamacion' && correo) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: remitente,
          to: [correo],
          subject: `Constancia de tu registro ${codigo} · World Logistics International`,
          html: `<!doctype html><html lang="es"><body style="margin:0;background:#f4f7f9;padding:26px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#fff;border-radius:14px;border:1px solid #e6ecf1;overflow:hidden"><tr><td style="background:#153F59;padding:22px 26px"><p style="margin:0;font:800 18px Arial,sans-serif;color:#fff">Constancia de registro</p><p style="margin:6px 0 0;font:400 13px Arial,sans-serif;color:#F2561D">Código ${codigo}</p></td></tr><tr><td style="padding:24px 26px;font:400 14px/1.6 Arial,sans-serif;color:#10222f"><p style="margin:0 0 12px">Hemos registrado tu solicitud en el Libro de Reclamaciones de World Logistics International.</p><p style="margin:0 0 12px">Conserva el código <b>${codigo}</b> como constancia. Daremos respuesta dentro del plazo de treinta (30) días calendario establecido por el Código de Protección y Defensa del Consumidor.</p><p style="margin:0">Gracias por ayudarnos a mejorar.</p></td></tr></table></body></html>`,
        }),
      });
    }

    return res.status(200).json({
      ok: true,
      codigo,
      mensaje:
        tipo === 'reclamacion'
          ? 'Registro recibido. Te enviamos la constancia a tu correo y responderemos dentro del plazo de ley.'
          : 'Mensaje enviado. Nuestro equipo comercial te responderá en un plazo máximo de 48 horas.',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: 'No se pudo procesar el envío.' });
  }
}
