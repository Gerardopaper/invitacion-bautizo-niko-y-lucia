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

export const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1200&q=80',
    alt: 'Manos sosteniendo a un recién nacido',
    aspect: 'aspect-[3/4]',
  },
  {
    src: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1200&q=80',
    alt: 'Bebé envuelto en lino claro',
    aspect: 'aspect-[4/5]',
  },
  {
    src: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Detalle de pies de bebé',
    aspect: 'aspect-[4/5]',
  },
  {
    src: 'https://images.unsplash.com/photo-1546015720-b8b30df5aa27?auto=format&fit=crop&w=1200&q=80',
    alt: 'Bebé dormido en blanco',
    aspect: 'aspect-[3/4]',
  },
];
