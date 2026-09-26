/* ==========================================================================
   Datos de contacto en vivo (portal del Grupo Pacheco)

   El HTML ya trae los datos actuales; este script los sustituye por los que
   haya en el portal. Si la consulta falla, la página no cambia.

   Enganches:
     a[href*="wa.me/"]              número de todos los enlaces de WhatsApp
     [data-vivo="whatsapp-numero"]  número de WhatsApp como texto
     [data-vivo="telefono-principal"]
     [data-vivo="correo-principal"]
     [data-vivo="direccion"]        texto (y enlace al mapa si es <a>)
     [data-vivo="horario"]          usa la versión en inglés en páginas /en
     a[data-red]                    redes sociales (enlace y visibilidad); si su
                                    padre lleva data-red-envoltura, se oculta el padre
     [data-vivo-lista="correo|telefono"]
                                    lista hecha con su <template> hijo: por cada dato
                                    se clona y se rellenan [data-campo="etiqueta"] y
                                    [data-campo="valor"] (enlace mailto:/tel: incluido)
   Con data-vivo-icono solo se cambia el <span> interno (el icono se queda).
   Formato del número: data-vivo-formato="internacional" → +51 912 507 555.
   ========================================================================== */
(function () {
  'use strict';

  var gp = window.GrupoPacheco;
  if (!gp) return;

  var $$ = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };
  var ingles = /^en\b/i.test(document.documentElement.lang || '');

  function nacional(n) {
    var d = String(n).replace(/\D/g, '');
    return d.length > 9 && d.indexOf('51') === 0 ? d.slice(2) : d;
  }

  function formato(n, internacional) {
    var d = nacional(n);
    var local = d;
    if (/^9\d{8}$/.test(d)) local = d.slice(0, 3) + ' ' + d.slice(3, 6) + ' ' + d.slice(6);
    else if (/^01\d{7}$/.test(d)) local = internacional ? '1 ' + d.slice(2, 5) + ' ' + d.slice(5) : '(01) ' + d.slice(2, 5) + '-' + d.slice(5);
    return internacional ? '+51 ' + local : local;
  }

  function hrefTel(n) {
    var d = nacional(n);
    return 'tel:+51' + (d.charAt(0) === '0' ? d.slice(1) : d);
  }

  var esHttps = function (u) { return /^https:\/\/[^\s"'<>]+$/.test(u || ''); };
  var esCorreo = function (c) { return /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(c || ''); };

  function poner(el, texto) {
    var destino = el.hasAttribute('data-vivo-icono') ? el.querySelector('span') : el;
    if (destino) destino.textContent = texto;
  }

  gp.leer(
    'datos_contacto',
    'empresa_id=eq.' + gp.empresa + '&visible=is.true&select=tipo,etiqueta,etiqueta_en,valor,valor_en,detalle,red,orden&order=orden.asc'
  ).then(function (filas) {
    if (!filas || !filas.length) return;
    var de = function (t) { return filas.filter(function (f) { return f.tipo === t; }); };
    var wa = de('whatsapp')[0];
    var tel = de('telefono')[0];
    var correo = de('correo')[0];
    var dir = de('direccion')[0];
    var horario = de('horario')[0];
    var redes = de('red');

    if (wa && /^\d{9,15}$/.test(wa.valor)) {
      $$('a[href*="wa.me/"]').forEach(function (a) {
        try {
          var url = new URL(a.href);
          url.pathname = '/' + wa.valor;
          if (!url.searchParams.get('text') && wa.detalle) url.searchParams.set('text', wa.detalle);
          a.href = url.toString();
        } catch (e) { /* enlace mal formado: se deja */ }
      });
      $$('[data-vivo="whatsapp-numero"]').forEach(function (el) {
        poner(el, formato(wa.valor, el.getAttribute('data-vivo-formato') !== 'nacional'));
      });
    }

    if (tel) {
      $$('[data-vivo="telefono-principal"]').forEach(function (el) {
        poner(el, formato(tel.valor, el.getAttribute('data-vivo-formato') === 'internacional'));
        if (el.tagName === 'A' && /^tel:/.test(el.getAttribute('href') || '')) el.href = hrefTel(tel.valor);
      });
    }

    if (correo && esCorreo(correo.valor)) {
      $$('[data-vivo="correo-principal"]').forEach(function (el) {
        poner(el, correo.valor);
        if (el.tagName === 'A') el.href = 'mailto:' + correo.valor;
      });
    }

    if (dir) {
      $$('[data-vivo="direccion"]').forEach(function (el) {
        poner(el, dir.valor);
        if (el.tagName === 'A' && esHttps(dir.detalle)) el.href = dir.detalle;
      });
    }

    if (horario) {
      $$('[data-vivo="horario"]').forEach(function (el) {
        poner(el, (ingles && horario.valor_en) || horario.valor);
      });
    }

    if (redes.length) {
      var porRed = {};
      redes.forEach(function (r) { if (esHttps(r.valor)) porRed[r.red] = r.valor; });
      $$('a[data-red]').forEach(function (a) {
        var url = porRed[a.getAttribute('data-red')];
        var objetivo = a.parentElement && a.parentElement.hasAttribute('data-red-envoltura') ? a.parentElement : a;
        if (url) a.href = url;
        objetivo.hidden = !url;
      });
    }

    // Listas con plantilla (correos o teléfonos por área).
    $$('[data-vivo-lista]').forEach(function (lista) {
      var tipo = lista.getAttribute('data-vivo-lista');
      var plantilla = lista.querySelector('template');
      var filasTipo = de(tipo).filter(function (f) { return tipo !== 'correo' || esCorreo(f.valor); });
      if (!plantilla || !filasTipo.length) return;
      var nuevos = filasTipo.map(function (f) {
        var nodo = plantilla.content.firstElementChild.cloneNode(true);
        nodo.setAttribute('data-vivo-item', '');
        var et = nodo.querySelector('[data-campo="etiqueta"]');
        var va = nodo.querySelector('[data-campo="valor"]');
        if (et) et.textContent = (ingles && f.etiqueta_en) || f.etiqueta;
        if (va) {
          va.textContent = tipo === 'telefono' ? formato(f.valor, false) : f.valor;
          if (va.tagName === 'A') va.href = tipo === 'telefono' ? hrefTel(f.valor) : 'mailto:' + f.valor;
        }
        return nodo;
      });
      Array.prototype.slice.call(lista.querySelectorAll(':scope > [data-vivo-item]')).forEach(function (v) { v.remove(); });
      nuevos.forEach(function (n) { lista.appendChild(n); });
    });
  });
})();
