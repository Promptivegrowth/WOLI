"""
Genera la imagen de vista previa de cada tarjeta (1200x630).

Es lo que se ve al pegar el enlace en WhatsApp, LinkedIn o un correo, así que
decide la primera impresión antes de que nadie abra la tarjeta.

    python scripts/og-tarjetas.py

Las tipografías de marca se descargan una vez a scripts/fuentes/. Las imágenes
resultantes se suben al repositorio: así no dependen de las fuentes que haya
instaladas en el servidor de despliegue.
"""
import io
import json
import os
import re
import sys
import urllib.request
from PIL import Image, ImageDraw, ImageFont

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIR_FUENTES = os.path.join(RAIZ, 'scripts', 'fuentes')
DIR_SALIDA = os.path.join(RAIZ, 'public', 'qr')

NAVY = (7, 26, 38)
NAVY_MED = (21, 63, 89)
AZUL = (17, 93, 140)
NARANJA = (242, 86, 29)
BLANCO = (255, 255, 255)

W, H = 1200, 630

FUENTES = {
    'Exo_2.ttf': 'https://fonts.googleapis.com/css2?family=Exo+2:wght@700',
    'Schibsted_Grotesk.ttf': 'https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@600',
}


def asegurar_fuentes():
    os.makedirs(DIR_FUENTES, exist_ok=True)
    for nombre, css_url in FUENTES.items():
        destino = os.path.join(DIR_FUENTES, nombre)
        if os.path.exists(destino):
            continue
        req = urllib.request.Request(css_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        css = urllib.request.urlopen(req, timeout=30).read().decode('utf8')
        url = re.search(r'https://fonts\.gstatic\.com[^)]*\.ttf', css).group(0)
        urllib.request.urlretrieve(url, destino)
        sys.stdout.write('  fuente descargada: %s\n' % nombre)


def leer_equipo():
    """Lee src/data/equipo.js sin necesitar Node."""
    ruta = os.path.join(RAIZ, 'src', 'data', 'equipo.js')
    txt = io.open(ruta, encoding='utf-8').read()
    personas = []
    for bloque in re.findall(r'\{\s*slug:.*?\n  \}', txt, re.S):
        def campo(nombre):
            m = re.search(nombre + r":\s*'([^']*)'", bloque)
            return m.group(1) if m else None
        foto = campo('foto')
        if foto is None and 'foto: null' in bloque:
            foto = None
        personas.append({
            'slug': campo('slug'),
            'nombre': campo('nombre'),
            'cargo': campo('cargo'),
            'iniciales': campo('iniciales'),
            'movil': campo('movil'),
            'email': campo('email'),
            'foto': foto,
        })
    return personas


def degradado(ancho, alto):
    """Fondo diagonal de marca, de azul a navy."""
    base = Image.new('RGB', (ancho, alto), NAVY)
    d = ImageDraw.Draw(base)
    for y in range(alto):
        t = y / alto
        c = tuple(round(AZUL[i] * (1 - t) ** 1.4 + NAVY[i] * (1 - (1 - t) ** 1.4)) for i in range(3))
        d.line([(0, y), (ancho, y)], fill=c)
    # Retícula técnica, la misma del sitio
    rej = Image.new('RGBA', (ancho, alto), (0, 0, 0, 0))
    dr = ImageDraw.Draw(rej)
    for x in range(0, ancho, 62):
        dr.line([(x, 0), (x, alto)], fill=(255, 255, 255, 12))
    for y in range(0, alto, 62):
        dr.line([(0, y), (ancho, y)], fill=(255, 255, 255, 12))
    return Image.alpha_composite(base.convert('RGBA'), rej)


def esquina_contenedor(im, radio):
    """Recorta con la geometría de la marca: dos esquinas muy redondeadas."""
    mascara = Image.new('L', im.size, 0)
    d = ImageDraw.Draw(mascara)
    d.rounded_rectangle([0, 0, im.width - 1, im.height - 1], radius=radio, fill=255)
    # Se devuelven a ángulo recto la superior derecha y la inferior izquierda
    d.rectangle([im.width - radio, 0, im.width - 1, radio], fill=255)
    d.rectangle([0, im.height - radio - 1, radio, im.height - 1], fill=255)
    im = im.convert('RGBA')
    im.putalpha(mascara)
    return im


def ajustar(texto, fuente, ancho_max, draw):
    """Reduce el cuerpo hasta que el texto quepa en el ancho dado."""
    tam = fuente.size
    f = fuente
    while tam > 20:
        if draw.textlength(texto, font=f) <= ancho_max:
            return f
        tam -= 2
        f = ImageFont.truetype(f.path, tam)
    return f


def generar(p):
    lienzo = degradado(W, H)

    # Halo naranja en la esquina superior derecha
    halo = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    dh = ImageDraw.Draw(halo)
    for r in range(420, 0, -6):
        a = int(26 * (1 - r / 420))
        dh.ellipse([W - 180 - r, -220 - r, W - 180 + r, -220 + r], fill=(*NARANJA, a))
    lienzo = Image.alpha_composite(lienzo, halo)

    d = ImageDraw.Draw(lienzo)
    exo = os.path.join(DIR_FUENTES, 'Exo_2.ttf')
    grot = os.path.join(DIR_FUENTES, 'Schibsted_Grotesk.ttf')

    MARGEN = 70
    # ---------------- Retrato o monograma ----------------
    lado_x, lado_y = 300, 375
    caja_x, caja_y = MARGEN, (H - lado_y) // 2

    if p['foto']:
        ruta = os.path.join(RAIZ, 'public', p['foto'].lstrip('/'))
        retrato = Image.open(ruta).convert('RGB')
        # recorte que llena la caja
        escala = max(lado_x / retrato.width, lado_y / retrato.height)
        retrato = retrato.resize((round(retrato.width * escala), round(retrato.height * escala)), Image.LANCZOS)
        ox = (retrato.width - lado_x) // 2
        oy = (retrato.height - lado_y) // 2
        retrato = retrato.crop((ox, oy, ox + lado_x, oy + lado_y))
    else:
        retrato = Image.new('RGB', (lado_x, lado_y), NAVY_MED)
        dr = ImageDraw.Draw(retrato)
        for y in range(lado_y):
            t = y / lado_y
            c = tuple(round(NARANJA[i] * (1 - t) * 0.32 + AZUL[i] * (0.4 + t * 0.4)) for i in range(3))
            dr.line([(0, y), (lado_x, y)], fill=c)
        f_ini = ImageFont.truetype(exo, 132)
        w_ini = dr.textlength(p['iniciales'], font=f_ini)
        dr.text(((lado_x - w_ini) / 2, lado_y / 2 - 88), p['iniciales'], font=f_ini, fill=BLANCO)

    retrato = esquina_contenedor(retrato, 46)
    lienzo.alpha_composite(retrato, (caja_x, caja_y))

    # ---------------- Columna de texto ----------------
    x = caja_x + lado_x + 56
    ancho = W - x - MARGEN

    logo = Image.open(os.path.join(RAIZ, 'public', 'brand', 'logo-woli-blanco.png')).convert('RGBA')
    logo.thumbnail((250, 90), Image.LANCZOS)
    lienzo.alpha_composite(logo, (x, caja_y - 6))

    y = caja_y + 104

    f_nombre = ajustar(p['nombre'], ImageFont.truetype(exo, 62), ancho, d)
    d.text((x, y), p['nombre'], font=f_nombre, fill=BLANCO)
    y += f_nombre.size + 20

    f_cargo = ajustar(p['cargo'].upper(), ImageFont.truetype(grot, 25), ancho, d)
    d.text((x, y), p['cargo'].upper(), font=f_cargo, fill=NARANJA)
    y += f_cargo.size + 34

    d.line([(x, y), (x + 92, y)], fill=(*NARANJA, 255), width=4)
    y += 30

    f_dato = ImageFont.truetype(grot, 25)
    for linea in [p['movil'], p['email']]:
        f = ajustar(linea, f_dato, ancho, d)
        d.text((x, y), linea, font=f, fill=(226, 236, 244))
        y += f.size + 14

    salida = os.path.join(DIR_SALIDA, '%s-og.jpg' % p['slug'])
    lienzo.convert('RGB').save(salida, quality=88, optimize=True, progressive=True)
    return salida


if __name__ == '__main__':
    asegurar_fuentes()
    os.makedirs(DIR_SALIDA, exist_ok=True)
    for persona in leer_equipo():
        ruta = generar(persona)
        sys.stdout.write('  %-26s %s KB\n' % (persona['nombre'], os.path.getsize(ruta) // 1024))
    sys.stdout.write('\nVistas previas en public/qr/\n')
