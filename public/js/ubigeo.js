/* ==========================================================================
   Ubigeo del Perú en cascada: departamento → provincia → distrito.
   Datos: INEI 2026 (/data/ubigeo-peru.json, generado por el portal del
   Grupo Pacheco). El distrito lleva el código de 6 dígitos como valor.

   Marcado:
     <div data-ubigeo data-txt-seleccione="Seleccione" …>
       <select data-ubigeo-nivel="departamento"> …
       <select data-ubigeo-nivel="provincia"> …
       <select data-ubigeo-nivel="distrito" name="ubigeo"> …
   Textos (opcionales, para inglés): data-txt-seleccione, data-txt-elija-departamento,
   data-txt-elija-provincia, data-txt-error.
   Cada bloque expone bloque.reiniciarUbigeo() para dejarlo como al inicio.
   ========================================================================== */
(function () {
  'use strict';

  var bloques = document.querySelectorAll('[data-ubigeo]');
  if (!bloques.length) return;

  var datos = fetch('/data/ubigeo-peru.json')
    .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(function (j) { return j.d; });

  function opciones(select, lista, vacio) {
    select.innerHTML = '';
    select.appendChild(new Option(vacio, ''));
    lista.forEach(function (x) { select.appendChild(new Option(x[1], x[0])); });
  }

  Array.prototype.forEach.call(bloques, function (bloque) {
    var t = function (k, porDefecto) { return bloque.getAttribute('data-txt-' + k) || porDefecto; };
    var nivel = function (n) { return bloque.querySelector('[data-ubigeo-nivel="' + n + '"]'); };
    var dep = nivel('departamento');
    var prov = nivel('provincia');
    var dist = nivel('distrito');

    function vaciar(select, texto) {
      opciones(select, [], texto);
      select.disabled = true;
    }

    datos.then(function (arbol) {
      function reiniciar() {
        opciones(dep, arbol, t('seleccione', 'Seleccione'));
        dep.disabled = false;
        vaciar(prov, t('elija-departamento', 'Elija el departamento'));
        vaciar(dist, t('elija-provincia', 'Elija la provincia'));
      }

      dep.addEventListener('change', function () {
        var d = arbol.filter(function (x) { return x[0] === dep.value; })[0];
        vaciar(dist, t('elija-provincia', 'Elija la provincia'));
        if (!d) return vaciar(prov, t('elija-departamento', 'Elija el departamento'));
        opciones(prov, d[2], t('seleccione', 'Seleccione'));
        prov.disabled = false;
        // Departamentos de una sola provincia (Callao): se elige sola.
        if (d[2].length === 1) {
          prov.value = d[2][0][0];
          prov.dispatchEvent(new Event('change'));
        }
      });

      prov.addEventListener('change', function () {
        var d = arbol.filter(function (x) { return x[0] === dep.value; })[0];
        var p = d && d[2].filter(function (x) { return x[0] === prov.value; })[0];
        if (!p) return vaciar(dist, t('elija-provincia', 'Elija la provincia'));
        opciones(dist, p[2], t('seleccione', 'Seleccione'));
        dist.disabled = false;
      });

      bloque.reiniciarUbigeo = reiniciar;
      reiniciar();
    }).catch(function () {
      opciones(dep, [], t('error', 'No se pudo cargar la lista'));
      dep.disabled = true;
    });
  });
})();
