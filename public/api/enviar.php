<?php
/**
 * WOLI · Endpoint de formularios para hosting cPanel (Namecheap u otro Apache + PHP).
 *
 * Recibe JSON desde /js/woli-forms.js, valida, envía el correo con mail()
 * y —para el Libro de Reclamaciones— guarda una copia del registro en disco,
 * tal como exige el Código de Protección y Defensa del Consumidor (Ley 29571).
 *
 * Configuración: edita únicamente el bloque CONFIG.
 */

declare(strict_types=1);

/* ----------------------------- CONFIG ----------------------------- */
const DESTINATARIO       = 'gerencia@wlicargo.com';
const DESTINATARIO_LIBRO = 'gerencia@wlicargo.com';
// Debe ser una cuenta del propio dominio para que no la marquen como spam.
const REMITENTE          = 'no-reply@wlicargo.com';
const EMPRESA            = 'World Logistics International';
const CARPETA_REGISTROS  = __DIR__ . '/registros';
/* ------------------------------------------------------------------ */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function responder(int $code, array $payload): void
{
    http_response_code($code);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    responder(405, ['ok' => false, 'error' => 'Método no permitido.']);
}

$raw  = file_get_contents('php://input') ?: '';
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST;
}
if (!is_array($data) || count($data) === 0) {
    responder(400, ['ok' => false, 'error' => 'No se recibieron datos.']);
}

/* Trampa antispam: el campo oculto debe llegar vacío. */
if (!empty($data['hp_website'])) {
    responder(200, ['ok' => true, 'mensaje' => 'Recibido.']);
}

$limpiar = static function ($valor): string {
    $valor = is_scalar($valor) ? (string) $valor : '';
    $valor = str_replace(["\r", "\n", "%0a", "%0d"], ' ', $valor);
    return trim(strip_tags($valor));
};

$tipo   = $limpiar($data['_tipo'] ?? 'contacto');
$pagina = $limpiar($data['_pagina'] ?? '');

$correo = $limpiar($data['email'] ?? '');
if ($correo !== '' && !filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    responder(422, ['ok' => false, 'error' => 'El correo electrónico no es válido.']);
}

/* Campos obligatorios por tipo de formulario */
$obligatorios = [
    'contacto'    => ['nombre', 'email', 'mensaje'],
    'cotizacion'  => ['nombre', 'email', 'servicio'],
    'reclamacion' => ['tipo_registro', 'nombre', 'documento', 'email', 'detalle', 'pedido'],
];
foreach ($obligatorios[$tipo] ?? $obligatorios['contacto'] as $campo) {
    if ($limpiar($data[$campo] ?? '') === '') {
        responder(422, ['ok' => false, 'error' => 'Faltan campos obligatorios.']);
    }
}

$etiquetas = [
    'nombre'          => 'Nombre completo',
    'empresa'         => 'Empresa',
    'ruc'             => 'RUC',
    'email'           => 'Correo electrónico',
    'telefono'        => 'Teléfono',
    'servicio'        => 'Servicio de interés',
    'modalidad'       => 'Modalidad',
    'origen'          => 'Origen',
    'destino'         => 'Destino',
    'carga'           => 'Tipo de carga',
    'peso'            => 'Peso / volumen',
    'incoterm'        => 'Incoterm',
    'mensaje'         => 'Mensaje',
    'tipo_registro'   => 'Tipo de registro',
    'documento'       => 'Documento de identidad',
    'tipo_documento'  => 'Tipo de documento',
    'direccion'       => 'Dirección',
    'menor_edad'      => 'Es menor de edad',
    'apoderado'       => 'Padre o apoderado',
    'tipo_bien'       => 'Tipo de bien contratado',
    'monto'           => 'Monto reclamado',
    'descripcion_bien'=> 'Descripción del bien o servicio',
    'detalle'         => 'Detalle del reclamo o queja',
    'pedido'          => 'Pedido del consumidor',
];

$codigo = strtoupper($tipo === 'reclamacion' ? 'LR' : 'WO') . '-' . date('Ymd') . '-' . strtoupper(substr(bin2hex(random_bytes(3)), 0, 5));

$filas = '';
$texto = '';
foreach ($data as $clave => $valor) {
    if ($clave === 'hp_website' || str_starts_with((string) $clave, '_')) {
        continue;
    }
    $valorLimpio = $limpiar($valor);
    if ($valorLimpio === '') {
        continue;
    }
    $nombreCampo = $etiquetas[$clave] ?? ucfirst(str_replace('_', ' ', (string) $clave));
    $filas .= '<tr><td style="padding:9px 14px;border-bottom:1px solid #e6ecf1;font:600 13px Arial,sans-serif;color:#153F59;white-space:nowrap;vertical-align:top">'
        . htmlspecialchars($nombreCampo, ENT_QUOTES, 'UTF-8')
        . '</td><td style="padding:9px 14px;border-bottom:1px solid #e6ecf1;font:400 14px Arial,sans-serif;color:#10222f">'
        . nl2br(htmlspecialchars($valorLimpio, ENT_QUOTES, 'UTF-8'))
        . '</td></tr>';
    $texto .= $nombreCampo . ': ' . $valorLimpio . "\n";
}

$titulo = $tipo === 'reclamacion'
    ? 'Libro de Reclamaciones — nuevo registro'
    : ($tipo === 'cotizacion' ? 'Nueva solicitud de cotización' : 'Nuevo mensaje de contacto');

$html = '<!doctype html><html lang="es"><body style="margin:0;background:#f4f7f9;padding:26px">'
    . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e6ecf1">'
    . '<tr><td style="background:#153F59;padding:22px 26px">'
    . '<p style="margin:0;font:800 18px Arial,sans-serif;color:#fff">' . htmlspecialchars($titulo, ENT_QUOTES, 'UTF-8') . '</p>'
    . '<p style="margin:6px 0 0;font:400 13px Arial,sans-serif;color:#F2561D">Código ' . $codigo . ' · ' . date('d/m/Y H:i') . '</p>'
    . '</td></tr>'
    . '<tr><td style="padding:8px 12px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">' . $filas . '</table></td></tr>'
    . '<tr><td style="padding:16px 26px;background:#f4f7f9;font:400 12px Arial,sans-serif;color:#7a8f9c">'
    . 'Enviado desde ' . htmlspecialchars($pagina !== '' ? $pagina : 'wlicargo.com', ENT_QUOTES, 'UTF-8')
    . ' · IP ' . htmlspecialchars($_SERVER['REMOTE_ADDR'] ?? '—', ENT_QUOTES, 'UTF-8')
    . '</td></tr></table></body></html>';

$para     = $tipo === 'reclamacion' ? DESTINATARIO_LIBRO : DESTINATARIO;
$cabeceras = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: ' . EMPRESA . ' <' . REMITENTE . '>',
    'X-Mailer: WOLI-Web',
];
if ($correo !== '') {
    $cabeceras[] = 'Reply-To: ' . $correo;
}

$asunto  = '=?UTF-8?B?' . base64_encode('[' . $codigo . '] ' . $titulo) . '?=';
$enviado = @mail($para, $asunto, $html, implode("\r\n", $cabeceras));

/* Copia de cortesía al usuario para el Libro de Reclamaciones (obligatorio por ley). */
if ($tipo === 'reclamacion' && $correo !== '') {
    $copia = '<!doctype html><html lang="es"><body style="margin:0;background:#f4f7f9;padding:26px">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#fff;border-radius:14px;border:1px solid #e6ecf1;overflow:hidden">'
        . '<tr><td style="background:#153F59;padding:22px 26px"><p style="margin:0;font:800 18px Arial,sans-serif;color:#fff">Constancia de registro</p>'
        . '<p style="margin:6px 0 0;font:400 13px Arial,sans-serif;color:#F2561D">Código ' . $codigo . '</p></td></tr>'
        . '<tr><td style="padding:24px 26px;font:400 14px/1.6 Arial,sans-serif;color:#10222f">'
        . '<p style="margin:0 0 12px">Hemos registrado tu solicitud en el Libro de Reclamaciones de ' . EMPRESA . '.</p>'
        . '<p style="margin:0 0 12px">Conserva el código <b>' . $codigo . '</b> como constancia. Daremos respuesta dentro del plazo de treinta (30) días calendario establecido por el Código de Protección y Defensa del Consumidor.</p>'
        . '<p style="margin:0">Gracias por ayudarnos a mejorar.</p></td></tr></table></body></html>';
    @mail(
        $correo,
        '=?UTF-8?B?' . base64_encode('Constancia de tu registro ' . $codigo . ' · ' . EMPRESA) . '?=',
        $copia,
        implode("\r\n", array_filter($cabeceras, static fn($h) => !str_starts_with($h, 'Reply-To')))
    );
}

/* Registro en disco: respaldo obligatorio del Libro de Reclamaciones. */
if ($tipo === 'reclamacion') {
    if (!is_dir(CARPETA_REGISTROS)) {
        @mkdir(CARPETA_REGISTROS, 0750, true);
    }
    $guard = CARPETA_REGISTROS . '/.htaccess';
    if (!file_exists($guard)) {
        @file_put_contents($guard, "Require all denied\nOptions -Indexes\n");
    }
    @file_put_contents(
        CARPETA_REGISTROS . '/' . date('Y-m') . '.jsonl',
        json_encode(
            [
                'codigo' => $codigo,
                'fecha'  => date('c'),
                'ip'     => $_SERVER['REMOTE_ADDR'] ?? null,
                'datos'  => array_map($limpiar, array_diff_key($data, ['hp_website' => 1])),
            ],
            JSON_UNESCAPED_UNICODE
        ) . PHP_EOL,
        FILE_APPEND | LOCK_EX
    );
}

if (!$enviado) {
    responder(500, ['ok' => false, 'error' => 'El servidor de correo no aceptó el envío.']);
}

responder(200, [
    'ok'      => true,
    'codigo'  => $codigo,
    'mensaje' => $tipo === 'reclamacion'
        ? 'Registro recibido. Te enviamos la constancia a tu correo y responderemos dentro del plazo de ley.'
        : 'Mensaje enviado. Nuestro equipo comercial te responderá en un plazo máximo de 48 horas.',
]);
