/* ==========================================================================
   WOLI · Manejo de formularios
   Los formularios se envían al portal del Grupo Pacheco (public/js/portal.js),
   que guarda cada registro, numera el Libro de Reclamaciones, genera su PDF y
   avisa por correo. Funciona igual con la web en Vercel o en cPanel.
   Si el portal no responde, se ofrece siempre la salida por WhatsApp o correo.
   ========================================================================== */
(function () {
  'use strict';

  // portal.js se carga al final del documento: se consulta al enviar.
  var EN = /^en\b/i.test(document.documentElement.lang || '');

  // El número sale del primer enlace de WhatsApp de la página, que ya trae
  // el valor del portal (datos-vivos.js).
  function numeroWhatsApp() {
    var a = document.querySelector('a[href*="wa.me/"]');
    var m = a && a.getAttribute('href').match(/wa\.me\/(\d+)/);
    return m ? m[1] : '51912507555';
  }

  // Campo del formulario ← nombre del campo en la API del portal
  var CAMPO_FORM = {
    numero_documento: 'documento',
    domicilio: 'direccion',
    correo: 'email',
    bien_descripcion: 'descripcion_bien',
    tipo: 'tipo_registro',
    bien_tipo: 'tipo_bien',
    acepta: 'declaracion',
    asunto: 'servicio',
  };

  function label(form, name) {
    var el = form.elements[name];
    if (!el) return name;
    var node = form.querySelector('label[for="' + (el.id || '') + '"]');
    return node ? node.textContent.replace('*', '').trim() : name;
  }

  function setError(field, msg) {
    var wrap = field.closest('.field') || field.closest('.radio-cards') || field.parentElement;
    if (!wrap) return;
    wrap.classList.add('field--error');
    var err = wrap.querySelector('.field__err');
    if (!err) {
      err = document.createElement('p');
      err.className = 'field__err';
      wrap.appendChild(err);
    }
    err.textContent = msg;
  }

  function clearErrors(form) {
    form.querySelectorAll('.field--error').forEach(function (el) {
      el.classList.remove('field--error');
    });
    form.querySelectorAll('.field__err').forEach(function (el) {
      el.remove();
    });
  }

  function validate(form) {
    clearErrors(form);
    var ok = true;
    var first = null;

    form.querySelectorAll('[required]').forEach(function (field) {
      var valid = true;
      if (field.type === 'checkbox') valid = field.checked;
      else if (field.type === 'radio') valid = !!form.querySelector('input[name="' + field.name + '"]:checked');
      else valid = String(field.value || '').trim() !== '';

      if (valid && field.type === 'email') {
        valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(field.value.trim());
        if (!valid) {
          setError(field, EN ? 'Enter a valid email address.' : 'Ingresa un correo electrónico válido.');
          ok = false;
          first = first || field;
          return;
        }
      }

      if (valid && field.dataset.minlength && field.value.trim().length < Number(field.dataset.minlength)) {
        setError(
          field,
          EN
            ? 'Please add a little more detail (at least ' + field.dataset.minlength + ' characters).'
            : 'Necesitamos un poco más de detalle (mínimo ' + field.dataset.minlength + ' caracteres).'
        );
        ok = false;
        first = first || field;
        return;
      }

      if (!valid) {
        setError(
          field,
          field.type === 'checkbox'
            ? EN ? 'You must accept to continue.' : 'Debes aceptar para continuar.'
            : EN ? 'This field is required.' : 'Este campo es obligatorio.'
        );
        ok = false;
        first = first || field;
      }
    });

    if (first && first.focus && !first.disabled) first.focus();
    return ok;
  }

  function collect(form) {
    var data = {};
    new FormData(form).forEach(function (value, key) {
      if (key.indexOf('_') === 0) return; // campos internos
      data[key] = typeof value === 'string' ? value.trim() : value;
    });
    return data;
  }

  function message(form, type, text) {
    var box = form.querySelector('.form__msg');
    if (!box) return;
    box.className = 'form__msg ' + (type === 'ok' ? 'is-ok' : 'is-err');
    box.textContent = text;
    box.setAttribute('role', 'status');
    box.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function toWhatsApp(form) {
    var data = collect(form);
    var titulo = form.dataset.waTitle || 'Nueva consulta desde la web';
    var lines = ['*' + titulo + '*', ''];
    Object.keys(data).forEach(function (k) {
      if (!data[k] || k === 'hp_website') return;
      lines.push('*' + label(form, k) + ':* ' + data[k]);
    });
    window.open('https://wa.me/' + numeroWhatsApp() + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
  }

  /** Traduce el formulario al formato de la API del portal. */
  function carga(form) {
    var d = collect(form);
    var tipo = form.dataset.woliForm || 'contacto';
    if (tipo === 'reclamacion') {
      return {
        ruta: 'reclamo',
        cuerpo: {
          tipo: d.tipo_registro,
          nombre: d.nombre,
          tipo_documento: d.tipo_documento,
          numero_documento: d.documento,
          domicilio: d.direccion,
          ubigeo: d.ubigeo,
          telefono: d.telefono,
          correo: d.email,
          menor_edad: !!d.menor_edad,
          apoderado: d.menor_edad ? d.apoderado : undefined,
          bien_tipo: d.tipo_bien,
          moneda: d.moneda || 'PEN',
          monto: d.monto || undefined,
          bien_descripcion: d.descripcion_bien,
          detalle: d.detalle,
          pedido: d.pedido,
          acepta: !!d.declaracion,
          hp_website: d.hp_website,
        },
      };
    }
    var extra = {};
    ['ruc', 'modalidad', 'origen', 'destino', 'carga', 'peso', 'incoterm'].forEach(function (k) {
      if (d[k]) extra[k] = d[k];
    });
    return {
      ruta: 'contacto',
      cuerpo: {
        tipo: tipo === 'cotizacion' ? 'cotizacion' : 'contacto',
        nombre: d.nombre,
        empresa: d.empresa,
        correo: d.email,
        telefono: d.telefono,
        asunto: d.servicio,
        mensaje: d.mensaje,
        pagina: window.location.href,
        datos: extra,
        hp_website: d.hp_website,
      },
    };
  }

  function errorPortal(mensaje, campo, conexion, estado) {
    var e = new Error(mensaje);
    e.campo = campo;
    e.conexion = conexion;
    e.estado = estado;
    return e;
  }

  // El portal responde en español: en las páginas /en se muestra en inglés.
  function traducir(err) {
    if (!EN) return err.message;
    if (err.estado === 429) return 'Too many submissions in a row. Please try again in a few minutes.';
    return 'Please check the highlighted field and try again.';
  }

  async function send(form) {
    var gp = window.GrupoPacheco;
    if (!gp) throw errorPortal('sin-portal', null, true);
    var c = carga(form);
    var res;
    try {
      res = await fetch(gp.endpoint(c.ruta), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(c.cuerpo),
      });
    } catch (e) {
      throw errorPortal('sin-conexion', null, true);
    }
    var json = null;
    try {
      json = await res.json();
    } catch (e) {
      /* respuesta no JSON */
    }
    if (res.ok && json && json.ok) return json;
    if (json && (res.status === 422 || res.status === 429)) throw errorPortal(json.error, json.campo, false, res.status);
    throw errorPortal('servidor', null, true);
  }

  function fechaLarga(iso) {
    return new Intl.DateTimeFormat(EN ? 'en-GB' : 'es-PE', { timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric' }).format(
      new Date(iso + 'T00:00:00Z')
    );
  }

  function textoExito(form, res) {
    if (form.dataset.woliForm === 'reclamacion' && res.codigo) {
      var correo = (form.elements.email && form.elements.email.value) || '';
      return EN
        ? 'Record No. ' + res.codigo + ' filed. ' +
            (res.correoEnviado ? 'We have emailed the complaint form (PDF) to ' + correo + '. ' : 'Please keep this number as proof. ') +
            'We will reply no later than ' + fechaLarga(res.vence) + '.'
        : 'Registro N.º ' + res.codigo + ' recibido. ' +
            (res.correoEnviado ? 'Te enviamos la hoja de reclamación en PDF a ' + correo + '. ' : 'Conserva este número como constancia. ') +
            'Te responderemos a más tardar el ' + fechaLarga(res.vence) + '.';
    }
    return EN
      ? 'Message sent. Our sales team will get back to you within 24 hours.'
      : 'Mensaje enviado. Nuestro equipo comercial te responderá en un plazo máximo de 24 horas.';
  }

  function init(form) {
    var submit = form.querySelector('[type="submit"]');
    var waBtn = form.querySelector('[data-wa-submit]');

    if (waBtn) {
      waBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (validate(form)) toWhatsApp(form);
      });
    }

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (form.elements.hp_website && form.elements.hp_website.value) return; // bot
      if (!validate(form)) return;

      if (submit) submit.dataset.loading = 'true';
      var box = form.querySelector('.form__msg');
      if (box) box.className = 'form__msg';

      try {
        var res = await send(form);
        message(form, 'ok', textoExito(form, res));
        form.reset();
        var ub = form.querySelector('[data-ubigeo]');
        if (ub && ub.reiniciarUbigeo) ub.reiniciarUbigeo();
        var apo = form.querySelector('#campo-apoderado');
        if (apo) apo.hidden = true;
      } catch (err) {
        if (!err.conexion) {
          // Dato rechazado por el portal: se marca el campo correspondiente.
          var nombre = CAMPO_FORM[err.campo] || err.campo;
          var campo =
            nombre === 'ubigeo'
              ? form.querySelector('[data-ubigeo-nivel="departamento"]')
              : nombre && form.elements[nombre];
          var texto = traducir(err);
          if (campo && campo.nodeType === 1) {
            setError(campo, EN ? 'Please check this field.' : err.message);
            if (campo.focus) campo.focus();
          }
          message(form, 'err', texto);
        } else {
          var enlace = document.querySelector('[data-vivo="correo-principal"]');
          var correo = ((enlace && enlace.textContent) || 'cotizaciones@wlicargo.com').trim();
          message(
            form,
            'err',
            EN
              ? 'We could not send the form. Use the WhatsApp button or email ' + correo + ' and we will help you right away.'
              : 'No pudimos enviar el formulario. Usa el botón de WhatsApp o escríbenos a ' + correo + ' y te atendemos de inmediato.'
          );
          if (waBtn) waBtn.focus();
        }
      } finally {
        if (submit) submit.dataset.loading = 'false';
      }
    });
  }

  document.querySelectorAll('form[data-woli-form]').forEach(init);
})();
