# Celebración de Bautizo — Lucia & Niko

Una experiencia digital sagrada, editorial y cinematográfica. Construida con React + Vite, TailwindCSS, Framer Motion, GSAP, Lenis, tsParticles y Lucide.

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Estructura

```
src/
├── animations/   # variantes Framer Motion centralizadas
├── components/   # piezas reutilizables (particles, cross, dividers, glass cards)
├── config/       # contenido editable (nombres, fechas, fotos, WhatsApp)
├── hooks/        # Lenis smooth scroll, mouse parallax
├── sections/     # 8 secciones cinematográficas
└── styles/       # estilos globales (tipografía, paleta, utilidades)
```

## Personalización

Toda la información editable vive en [`src/config/event.js`](src/config/event.js):

- Nombres de los bebés
- Fecha y hora
- Salón / venue, enlace y mapa de ubicación
- Padrinos
- Número de WhatsApp y mensaje pre-cargado
- Retratos (`public/images/lucia.webp`, `niko.webp`)

Las imágenes son placeholders de Unsplash; reemplaza los `src` por las fotos reales cuando estén listas (manteniendo proporción 3:4 o 4:5 para conservar la composición editorial).

## Deploy a GitHub Pages

1. Asegúrate que `vite.config.js` tiene `base: './'` (ya configurado).
2. Crea el repositorio en GitHub y haz push.
3. Despliega:

```bash
npm run build
npm run deploy
```

`gh-pages` publicará la carpeta `dist/` en la rama `gh-pages`. En la configuración del repositorio activa GitHub Pages apuntando a esa rama.

## Atmósfera & secuencia cinematográfica

La experiencia se compone en capas que viven encima del contenido:

- **LoadingScreen** — cruz dorada respirando sobre marfil; disuelve cuando las fuentes y el primer paint terminan.
- **OpeningVeil** — “Abrir la invitación”. Dos mitades se separan como un velo de seda; el scroll (Lenis) está pausado hasta entonces.
- **CinematicLighting** — tres haloes volumétricos a nivel global que respiran y se desplazan suavemente con el scroll (“luz de catedral cambiando con el día”).
- **ColorGrading** — wash cálido global (soft-light + vignette muy tenue), inspirado en cinematografía Malick / editorial.
- **PaperTexture** — dos capas: fibras de papel + grano fílmico, ambas casi imperceptibles, para profundidad táctil.
- **AmbientAudio** — toggle minimal en la esquina; nunca autoplay. Carga `public/audio/ambience.mp3` (no incluido). Cualquier loop sutil de catedral, coro distante, aire o campanas funciona — apunta a ≈ -24 dBFS. Si el archivo no existe, el botón simplemente no reproduce nada.
- **Mobile parallax** — `useMouseParallax` detecta `pointer: coarse` y usa giroscopio (`deviceorientation`) en móvil, con fallback a touchmove.

## Compartir / Social Preview

El archivo `public/og-image.svg` es la composición editorial 1200×630 que se usa como Open Graph. Algunas plataformas (WhatsApp, iMessage, FB) prefieren PNG/JPG; exporta una vez:

```bash
# usando rsvg-convert (mac/linux: brew install librsvg / apt install librsvg2-bin)
rsvg-convert -w 1200 -h 630 public/og-image.svg -o public/og-image.png

# o con ImageMagick / Inkscape / Figma, exporta a public/og-image.png (1200×630).
```

`index.html` ya apunta a `./og-image.png`. Si solo subes el SVG, cambia la ruta a `./og-image.svg`.

Iconos incluidos:
- `public/favicon.svg` — favicon vectorial (browser tab).
- `public/apple-touch-icon.svg` — icono de pantalla de inicio iOS.

## Notas de diseño

- Paleta: marfil, blanco cálido, champagne, perla, oro tenue.
- Tipografía: Cormorant Garamond (display) + Inter (texto).
- Partículas: muy sutiles, lentas, traslúcidas — “luz pasando por aire de catedral”.
- Animaciones GPU-friendly (transform / opacity / filter); respetan `prefers-reduced-motion`.
- Mobile-first y optimizado para 60 fps.
