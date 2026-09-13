/**
 * Tarifarios publicados. El nombre del terminal es neutro; el resto viene del diccionario.
 *
 * `oculto: true` retira la entrada de la web sin borrarla: el PDF sigue en
 * public/docs/ y basta con quitar la marca para volver a publicarla.
 */
export const tarifarios = {
  aereos: [{ terminal: 'Callao / Lima (LIM)', archivo: '/docs/tarifario-aereo-callao.pdf', codigo: 'LIM' }],
  maritimos: [
    { terminal: 'Callao', archivo: '/docs/tarifario-maritimo-callao.pdf', codigo: 'CLL' },
    { terminal: 'Chancay', archivo: '/docs/tarifario-maritimo-chancay.pdf', codigo: 'CHY' },
    { terminal: 'Paita', archivo: '/docs/tarifario-maritimo-paita.pdf', codigo: 'PAI' },
    { terminal: 'Chimbote', archivo: '/docs/tarifario-maritimo-chimbote.pdf', codigo: 'CHI', oculto: true },
    { terminal: 'Pisco', archivo: '/docs/tarifario-maritimo-pisco.pdf', codigo: 'PIS', oculto: true },
    { terminal: 'Mollendo — Matarani', archivo: '/docs/tarifario-maritimo-mollendo-matarani.pdf', codigo: 'MTA', oculto: true },
    { terminal: 'Ilo', archivo: '/docs/tarifario-maritimo-ilo.pdf', codigo: 'ILO', oculto: true },
  ],
};

/** Solo las entradas visibles de una lista. */
export const visibles = (lista) => lista.filter((t) => !t.oculto);
