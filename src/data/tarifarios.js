export const tarifarios = {
  aereos: [
    {
      titulo: 'Tarifario Aéreo — Importación y Exportación',
      terminal: 'Callao / Lima (LIM)',
      archivo: '/docs/tarifario-aereo-callao.pdf',
      codigo: 'LIM',
    },
  ],
  maritimos: [
    { titulo: 'Tarifario Marítimo — Importación y Exportación', terminal: 'Callao', archivo: '/docs/tarifario-maritimo-callao.pdf', codigo: 'CLL' },
    { titulo: 'Tarifario Marítimo — Importación y Exportación', terminal: 'Chancay', archivo: '/docs/tarifario-maritimo-chancay.pdf', codigo: 'CHY' },
    { titulo: 'Tarifario Marítimo — Importación y Exportación', terminal: 'Paita', archivo: '/docs/tarifario-maritimo-paita.pdf', codigo: 'PAI' },
    { titulo: 'Tarifario Marítimo — Importación y Exportación', terminal: 'Chimbote', archivo: '/docs/tarifario-maritimo-chimbote.pdf', codigo: 'CHI' },
    { titulo: 'Tarifario Marítimo — Importación y Exportación', terminal: 'Pisco', archivo: '/docs/tarifario-maritimo-pisco.pdf', codigo: 'PIS' },
    { titulo: 'Tarifario Marítimo — Importación y Exportación', terminal: 'Mollendo — Matarani', archivo: '/docs/tarifario-maritimo-mollendo-matarani.pdf', codigo: 'MTA' },
    { titulo: 'Tarifario Marítimo — Importación y Exportación', terminal: 'Ilo', archivo: '/docs/tarifario-maritimo-ilo.pdf', codigo: 'ILO' },
  ],
};

export const datosTarifario = [
  'Tipo de operación, modalidad de transporte y tipo de documento de transporte',
  'País de origen y destino, junto con el puerto o aeropuerto correspondiente',
  'Tipo de carga y denominación del servicio',
  'Descripción del servicio, precio sin IGV, moneda y unidad de cobro',
  'Afectación al IGV, rango de cobro y fecha de vigencia',
  'Tiempo promedio del servicio, clasificación y observaciones',
];
