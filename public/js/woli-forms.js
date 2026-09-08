/* ==========================================================================
   WOLI · Manejo de formularios
   Funciona en los dos entornos de despliegue:
     1. cPanel / Namecheap  -> POST a /api/enviar.php   (PHP mail + registro)
     2. Vercel              -> POST a /api/enviar       (función serverless)
   Se intenta el primero y, si no existe, se usa el segundo automáticamente.
   Si ninguno responde, se ofrece siempre la salida por WhatsApp o correo.
   ========================================================================== */
(function () {
  'use strict';

  var ENDPOINTS = ['/api/enviar.php', '/api/enviar'];
  var WA_NUMBER = '51997059212';

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
          setError(field, 'Ingresa un correo electrónico válido.');
          ok = false;
          first = first || field;
          return;
        }
      }

      if (valid && field.dataset.minlength && field.value.trim().length < Number(field.dataset.minlength)) {
        setError(field, 'Necesitamos un poco más de detalle (mínimo ' + field.dataset.minlength + ' caracteres).');
        ok = false;
        first = first || field;
        return;
      }

      if (!valid) {
        setError(field, field.type === 'checkbox' ? 'Debes aceptar para continuar.' : 'Este campo es obligatorio.');
        ok = false;
        first = first || field;
      }
    });

    if (first && first.focus) first.focus();
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
    window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
  }

  async function post(url, payload) {
    var res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    var text = await res.text();
    var json = null;
    try {
      json = JSON.parse(text);
    } catch (e) {
      /* respuesta no JSON: el endpoint no existe en este hosting */
    }
    if (!json) throw new Error('no-endpoint');
    if (!res.ok || json.ok !== true) throw new Error(json.error || 'error');
    return json;
  }

  async function send(form) {
    var payload = collect(form);
    payload._tipo = form.dataset.woliForm || 'contacto';
    payload._pagina = window.location.href;

    var lastError = null;
    for (var i = 0; i < ENDPOINTS.length; i++) {
      try {
        return await post(ENDPOINTS[i], payload);
      } catch (err) {
        lastError = err;
        if (err.message !== 'no-endpoint') throw err; // error real del servidor
      }
    }
    throw lastError || new Error('sin-endpoint');
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
        var okText =
          res.mensaje ||
          (form.dataset.woliForm === 'reclamacion'
            ? 'Registro recibido. Te enviamos una copia a tu correo y responderemos en el plazo de ley.'
            : 'Mensaje enviado. Nuestro equipo comercial te responderá en un plazo máximo de 48 horas.');
        if (res.codigo) okText += ' Código de registro: ' + res.codigo + '.';
        message(form, 'ok', okText);
        form.reset();
      } catch (err) {
        message(
          form,
          'err',
          'No pudimos enviar el formulario desde el servidor. Usa el botón de WhatsApp o escríbenos a gerencia@wlicargo.com y te atendemos de inmediato.'
        );
        if (waBtn) waBtn.focus();
      } finally {
        if (submit) submit.dataset.loading = 'false';
      }
    });
  }

  document.querySelectorAll('form[data-woli-form]').forEach(init);
})();
