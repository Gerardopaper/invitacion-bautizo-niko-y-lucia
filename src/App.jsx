import { lazy, Suspense } from 'react';
import useLenis from './hooks/useLenis';
import Hero from './sections/Hero';
import InvitationMessage from './sections/InvitationMessage';

// Lazy-load below-the-fold sections to keep first paint feather-light
const Gallery = lazy(() => import('./sections/Gallery'));
const EventDetails = lazy(() => import('./sections/EventDetails'));
const Location = lazy(() => import('./sections/Location'));
const Family = lazy(() => import('./sections/Family'));
const RSVP = lazy(() => import('./sections/RSVP'));
const FinalBlessing = lazy(() => import('./sections/FinalBlessing'));

export default function App() {
  useLenis();

  return (
    <main className="relative bg-ivory text-ink">
      <Hero />
      <InvitationMessage />
      <Suspense fallback={<div className="h-[50vh]" />}>
        <Gallery />
        <EventDetails />
        <Location />
        <Family />
        <RSVP />
        <FinalBlessing />
      </Suspense>
      <footer className="relative py-12 text-center">
        <p className="eyebrow text-[0.55rem] text-ink/40">
          Hecho con amor · MMXXVI
        </p>
      </footer>
    </main>
  );
}
