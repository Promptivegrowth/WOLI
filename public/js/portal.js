/* ==========================================================================
   Conexión con el portal del Grupo Pacheco
   - Lectura de datos publicados (contacto) desde Supabase con la clave
     publicable: pública por diseño, la base solo deja leer lo visible.
   - Envío de formularios (contacto, cotización, libro de reclamaciones) a la
     API del portal, que guarda, numera y avisa por correo.
   En local (localhost) usa el portal de desarrollo.
   ========================================================================== */
(function () {
  'use strict';

  var local = /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname);
  var cfg = {
    empresa: 'woli',
    supabaseUrl: 'https://youlxcpbffsvokhygubh.supabase.co',
    clave: 'sb_publishable_ldYnYlLuvA4fVu8Hnlh-nw_M2C2Hkui',
    portal: local ? 'http://localhost:3100' : 'https://panel-grupo-pacheco.vercel.app',
  };

  cfg.endpoint = function (tipo) {
    return cfg.portal + '/api/publico/' + cfg.empresa + '/' + tipo;
  };

  /** Consulta de solo lectura; null si falla (la página se queda como está). */
  cfg.leer = function (tabla, consulta) {
    var control = typeof AbortController === 'function' ? new AbortController() : null;
    var reloj = control && setTimeout(function () { control.abort(); }, 7000);
    return fetch(cfg.supabaseUrl + '/rest/v1/' + tabla + '?' + consulta, {
      headers: { apikey: cfg.clave },
      signal: control ? control.signal : undefined,
    })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) { return Array.isArray(d) ? d : null; })
      .catch(function () { return null; })
      .finally(function () { if (reloj) clearTimeout(reloj); });
  };

  window.GrupoPacheco = cfg;
})();
