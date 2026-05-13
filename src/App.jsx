import { lazy, Suspense, useEffect, useState } from 'react';
import useLenis from './hooks/useLenis';
import Hero from './sections/Hero';
import InvitationMessage from './sections/InvitationMessage';
import CinematicLighting from './components/CinematicLighting';
import ColorGrading from './components/ColorGrading';
import PaperTexture from './components/PaperTexture';
import LoadingScreen from './components/LoadingScreen';
import OpeningVeil from './components/OpeningVeil';
import AmbientAudio from './components/AmbientAudio';

const Gallery = lazy(() => import('./sections/Gallery'));
const EventDetails = lazy(() => import('./sections/EventDetails'));
const Location = lazy(() => import('./sections/Location'));
const Family = lazy(() => import('./sections/Family'));
const RSVP = lazy(() => import('./sections/RSVP'));
const FinalBlessing = lazy(() => import('./sections/FinalBlessing'));

/**
 * Entry sequence: LoadingScreen → OpeningVeil → page.
 * Lenis is paused while the veil is closed so wheel/touch events
 * don't accumulate behind the curtain.
 */
export default function App() {
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);

  useLenis(!opened);

  useEffect(() => {
    const ready = document.fonts?.ready ?? Promise.resolve();
    const minHold = new Promise((r) => setTimeout(r, 1600));
    Promise.all([ready, minHold]).then(() => setLoading(false));
  }, []);

  return (
    <>
      <CinematicLighting />
      <ColorGrading />
      <PaperTexture />

      <LoadingScreen visible={loading} />
      {!loading && <OpeningVeil open={opened} onOpen={() => setOpened(true)} />}

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

      <AmbientAudio active={opened} />
    </>
  );
}
