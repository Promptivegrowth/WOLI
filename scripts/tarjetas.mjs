/**
 * Genera los códigos QR de las tarjetas virtuales.
 *
 *   npm run tarjetas
 *
 * Produce, por cada persona de src/data/equipo.js:
 *   public/qr/<slug>.svg          vectorial, el que se ve en la propia tarjeta
 *   public/qr/<slug>-print.png    2400 px con el isotipo al centro, para imprimir
 *   entregables/tarjetas/<Nombre>/…  la carpeta que se le pasa al cliente
 *
 * Los archivos se generan aquí y se suben al repositorio a propósito: así el
 * resultado es siempre el mismo y no depende de las fuentes ni de las
 * librerías que haya en el servidor de despliegue.
 *
 * IMPORTANTE: el QR apunta al dominio definitivo (site.dominio). Un QR impreso
 * dura años, así que nunca debe apuntar a la URL temporal de Vercel.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import QRCode from 'qrcode';
import sharp from 'sharp';
import { equipo, rutaTarjeta } from '../src/data/equipo.js';
import { site } from '../src/data/site.js';

const RAIZ = process.cwd();
const DIR_QR = path.join(RAIZ, 'public', 'qr');
const DIR_ENTREGA = path.join(RAIZ, 'entregables', 'tarjetas');
const ISOTIPO = path.join(RAIZ, 'public', 'brand', 'icon-512.png');

const COLOR = { dark: '#153F59', light: '#FFFFFF' };
const LADO = 2400; // píxeles del PNG de impresión

await fs.mkdir(DIR_QR, { recursive: true });
await fs.rm(DIR_ENTREGA, { recursive: true, force: true });
await fs.mkdir(DIR_ENTREGA, { recursive: true });

for (const persona of equipo) {
  const url = site.dominio + rutaTarjeta(persona.slug);

  // --- SVG para la web -------------------------------------------------
  const svg = await QRCode.toString(url, {
    type: 'svg',
    errorCorrectionLevel: 'H', // tolera el logotipo encima sin dejar de leerse
    margin: 1,
    color: COLOR,
  });
  await fs.writeFile(path.join(DIR_QR, `${persona.slug}.svg`), svg, 'utf8');

  // --- PNG de impresión, con el isotipo al centro ----------------------
  const base = await QRCode.toBuffer(url, {
    type: 'png',
    errorCorrectionLevel: 'H',
    margin: 2,
    width: LADO,
    color: COLOR,
  });

  // El isotipo tapa como mucho un 18% del lado: por debajo del 30% que el
  // nivel H puede reconstruir, así que el código sigue siendo legible.
  const ladoLogo = Math.round(LADO * 0.18);
  const placa = Math.round(ladoLogo * 1.34);
  const fondoLogo = await sharp({
    create: { width: placa, height: placa, channels: 4, background: '#FFFFFF' },
  })
    .png()
    .toBuffer();
  const logo = await sharp(ISOTIPO).resize(ladoLogo, ladoLogo, { fit: 'contain', background: '#00000000' }).png().toBuffer();
  const centro = await sharp(fondoLogo)
    .composite([{ input: logo, gravity: 'center' }])
    .png()
    .toBuffer();

  const png = await sharp(base)
    .composite([{ input: centro, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toBuffer();
  await fs.writeFile(path.join(DIR_QR, `${persona.slug}-print.png`), png);

  // --- Carpeta para entregar al cliente --------------------------------
  const carpeta = path.join(DIR_ENTREGA, persona.nombre);
  await fs.mkdir(carpeta, { recursive: true });
  await fs.writeFile(path.join(carpeta, `QR - ${persona.nombre}.png`), png);
  await fs.writeFile(path.join(carpeta, `QR - ${persona.nombre}.svg`), svg, 'utf8');
  await fs.writeFile(
    path.join(carpeta, 'LEEME.txt'),
    [
      `TARJETA DIGITAL — ${persona.nombre}`,
      '='.repeat(40),
      '',
      `Cargo:  ${persona.cargo}`,
      `Enlace: ${url}`,
      '',
      'QUÉ HAY EN ESTA CARPETA',
      '-----------------------',
      `QR - ${persona.nombre}.png   ${LADO} x ${LADO} px. Para imprimir en tarjetas,`,
      '                             folletos, credenciales o vinilos.',
      `QR - ${persona.nombre}.svg   Vectorial. Se amplía a cualquier tamaño sin`,
      '                             perder definición: úsalo si la imprenta lo admite.',
      '',
      'CÓMO USARLO',
      '-----------',
      '· Imprímelo a 2 cm de lado como mínimo; por debajo cuesta escanearlo.',
      '· Deja un margen blanco alrededor: el QR necesita ese aire para leerse.',
      '· No lo recolorees ni lo estires. El isotipo del centro ya está calculado',
      '  para que el código siga siendo válido.',
      '· Comprueba siempre el impreso con la cámara del teléfono antes del tiraje.',
      '',
      'NFC',
      '---',
      'Para una tarjeta con chip NFC, graba en el tag exactamente este enlace:',
      url,
      '',
      'COMPARTIR POR WHATSAPP',
      '----------------------',
      'Basta con enviar el enlace. WhatsApp muestra una vista previa con la',
      'foto, el nombre y el cargo.',
      '',
    ].join('\n'),
    'utf8'
  );

  console.log(`  ${persona.nombre.padEnd(26)} ${url}`);
}

console.log(`\n${equipo.length} tarjetas · QR en public/qr/ · entregables en entregables/tarjetas/`);
