import { useEffect, useState } from 'react';

/**
 * True on devices whose primary pointer is coarse (phones, most tablets).
 *
 * Used as the single gate for mobile-specific simplifications:
 * fewer concurrent animations, reduced blur radii, dropped masks,
 * and lighter compositing.
 *
 * SSR-safe and re-evaluates if the user docks/undocks a device.
 */
export default function useCoarsePointer() {
  const [coarse, setCoarse] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(pointer: coarse)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const onChange = (e) => setCoarse(e.matches);
    // Safari < 14 uses deprecated addListener
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  return coarse;
}
