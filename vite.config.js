import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/invitacion-bautizo-niko-y-lucia/',
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['framer-motion', 'gsap'],
          particles: ['@tsparticles/engine', '@tsparticles/react', '@tsparticles/slim'],
        },
      },
    },
  },
});
