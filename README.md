# Invitación de Bautismo — Sofía & Mateo

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
- Iglesia, dirección, mapa
- Padres, padrinos
- Número de WhatsApp y mensaje pre-cargado
- Galería (URLs de imágenes)

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

## Notas de diseño

- Paleta: marfil, blanco cálido, champagne, perla, oro tenue.
- Tipografía: Cormorant Garamond (display) + Inter (texto).
- Partículas: muy sutiles, lentas, traslúcidas — “luz pasando por aire de catedral”.
- Animaciones GPU-friendly (transform / opacity / filter); respetan `prefers-reduced-motion`.
- Mobile-first y optimizado para 60 fps.
