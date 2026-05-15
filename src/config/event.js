// Single source of truth for editable event content.
// Replace placeholder values with real ones when ready.

export const event = {
  babies: ['Lucia', 'Niko'],
  // El bautismo (ceremonia religiosa) ya se celebró; esta es la
  // reunión familiar posterior. 13 de junio, 3:00 PM (zona Querétaro).
  date: new Date('2026-06-13T15:00:00-06:00'),
  dateLabel: '13 · Junio · 2026',
  timeLabel: '3:00 PM',
  venue: {
    name: 'Salón de fiestas Centenario',
    mapsUrl: 'https://maps.app.goo.gl/KsAHEsS5YaHpRTqd6',
    // Embed sin API key, centrado en las coordenadas del salón
    embedUrl:
      'https://www.google.com/maps?q=20.49220635066738,-100.13782641937057&z=16&output=embed',
  },
  parents: ['Lucerito Botello González', 'Gerardo Palma Perrusquia'],
  godparents: ['Mayra Carol Palma Perrusquia', 'Jorge Luis Botello González'],
  whatsapp: {
    phone: '525621170314', // formato internacional, sin signos
    message:
      'Confirmamos nuestra presencia en la celebración de Lucia & Niko.',
  },
};

// Two real portraits — one cinematic moment each. Resolved through
// Vite's BASE_URL so they load under the GitHub Pages subpath too.
const img = (file) => `${import.meta.env.BASE_URL}images/${file}`;

export const portraits = [
  {
    name: 'Lucia',
    src: img('lucia.webp'),
    alt: 'Retrato de Lucia',
    aspect: 'aspect-[4/5]',
    side: 'left',
  },
  {
    name: 'Niko',
    src: img('niko.webp'),
    alt: 'Retrato de Niko',
    aspect: 'aspect-[4/5]',
    side: 'right',
  },
];
