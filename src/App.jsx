import { lazy, Suspense, useEffect, useState } from 'react';
import useLenis from './hooks/useLenis';
import Hero from './sections/Hero';
import InvitationMessage from './sections/InvitationMessage';
import Interlude from './sections/Interlude';
import CinematicLighting from './components/CinematicLighting';
import ColorGrading from './components/ColorGrading';
import PaperTexture from './components/PaperTexture';
import DepthLayers from './components/DepthLayers';
import LoadingScreen from './components/LoadingScreen';
import OpeningVeil from './components/OpeningVeil';
import AmbientAudio from './components/AmbientAudio';

const Gallery = lazy(() => import('./sections/Gallery'));
const EventDetails = lazy(() => import('./sections/EventDetails'));
const Location = lazy(() => import('./sections/Location'));
const Parents = lazy(() => import('./sections/Parents'));
const Family = lazy(() => import('./sections/Family'));
const Guests = lazy(() => import('./sections/Guests'));
const RSVP = lazy(() => import('./sections/RSVP'));
const FinalBlessing = lazy(() => import('./sections/FinalBlessing'));

/**
 * Cinematic sequence:
 *   LoadingScreen → OpeningVeil → page (Lenis active)
 *
 * Interlude sections are deliberate breaths between content moments,
 * giving the journey ebb and flow rather than constant activity.
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
      <DepthLayers />
      <ColorGrading />
      <PaperTexture />

      <LoadingScreen visible={loading} />
      {!loading && <OpeningVeil open={opened} onOpen={() => setOpened(true)} />}

      <main className="relative bg-ivory text-ink">
        <Hero />
        <InvitationMessage />

        <Interlude>
          Hay momentos que merecen quedarse para siempre.
        </Interlude>

        <Suspense fallback={<div className="h-[50vh]" />}>
          <Gallery />
          <EventDetails />

          <Interlude>
            Lo más importante siempre se comparte.
          </Interlude>

          <Location />
          <Parents />
          <Family />
          <Guests />
          <RSVP />
          <FinalBlessing />
        </Suspense>

        <footer className="relative py-12 text-center"
          style={{ paddingBottom: 'calc(3rem + env(safe-area-inset-bottom))' }}
        >
          <p className="eyebrow text-[0.7rem] text-ink/65">
            Gracias por acompañarnos
          </p>
        </footer>
      </main>

      <AmbientAudio active={opened} />
    </>
  );
}
