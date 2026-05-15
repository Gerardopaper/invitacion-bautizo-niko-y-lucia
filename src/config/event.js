// Single source of truth for editable event content.
// Replace placeholder values with real ones when ready.

export const event = {
  babies: ['Sofía', 'Mateo'],
  date: new Date('2026-09-12T12:00:00-06:00'),
  dateLabel: '12 · Septiembre · 2026',
  timeLabel: '12:00 h',
  church: {
    name: 'Catedral de Nuestra Señora',
    address: 'Plaza de la Constitución 1, Centro Histórico',
    mapsUrl: 'https://maps.google.com/?q=Catedral+Metropolitana+CDMX',
    embedUrl:
      'https://www.google.com/maps?q=Catedral+Metropolitana+CDMX&output=embed',
  },
  reception: {
    name: 'Salón Casa Veluna',
    address: 'Av. de los Olivos 240, Lomas Verdes',
    timeLabel: '14:30 h',
  },
  parents: ['Isabella & Andrés Castaño'],
  godparents: ['Lucía Montenegro & Tomás Vergara'],
  whatsapp: {
    phone: '525555555555', // formato internacional, sin signos
    message:
      '✦ Confirmo mi presencia al bautismo de Sofía & Mateo. Con cariño,',
  },
};

// Two real portraits — one cinematic moment each. Resolved through
// Vite's BASE_URL so they load under the GitHub Pages subpath too.
const img = (file) => `${import.meta.env.BASE_URL}images/${file}`;

export const portraits = [
  {
    name: 'Lucía',
    eyebrow: 'La niña',
    src: img('lucia.webp'),
    alt: 'Retrato de Lucía',
    aspect: 'aspect-[4/5]',
    verse: 'Tejida en silencio, nombrada en la luz.',
    side: 'left',
  },
  {
    name: 'Niko',
    eyebrow: 'El niño',
    src: img('niko.webp'),
    alt: 'Retrato de Niko',
    aspect: 'aspect-[4/5]',
    verse: 'Un pequeño cielo aprendiendo a respirar.',
    side: 'right',
  },
];
