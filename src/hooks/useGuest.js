import { useEffect, useState } from 'react';

/**
 * Personalized invitation lookup.
 *
 * Reads `?gid=` from the URL and resolves it against a local JSON
 * file (public/data/guests.json). The file is fetched at most once
 * per session — the promise is cached at module scope so multiple
 * components (the Invitados section, the guest-aware RSVP wording)
 * share a single request.
 *
 * Status:
 *   'loading' — request in flight
 *   'found'   — gid matched a record (`guest` is populated)
 *   'private' — no gid, or gid not found (graceful private state)
 *
 * No backend, no validation semantics — purely a way to make each
 * link feel prepared for one family.
 */
let guestsPromise = null;

function loadGuests() {
  if (!guestsPromise) {
    // The guest list changes between deploys, but it's a static file
    // on GitHub Pages — Android Chrome / the WhatsApp in-app browser
    // will happily serve a stale cached copy and show the wrong
    // family. A per-load timestamp query + `no-store` defeats both
    // the browser HTTP cache and any intermediary proxy cache so the
    // freshest list is always fetched. The file is a few KB, so
    // skipping the cache costs nothing.
    const bust = `?t=${Date.now()}`;
    guestsPromise = fetch(
      `${import.meta.env.BASE_URL}data/guests.json${bust}`,
      { cache: 'no-store' }
    )
      .then((r) => (r.ok ? r.json() : []))
      .catch(() => []);
  }
  return guestsPromise;
}

export default function useGuest() {
  const [state, setState] = useState({ status: 'loading', guest: null });

  useEffect(() => {
    const gid = new URLSearchParams(window.location.search).get('gid');
    if (!gid) {
      setState({ status: 'private', guest: null });
      return;
    }

    let alive = true;
    loadGuests().then((list) => {
      if (!alive) return;
      const guest = Array.isArray(list)
        ? list.find((g) => String(g.gid) === String(gid).trim())
        : null;
      setState(
        guest
          ? { status: 'found', guest }
          : { status: 'private', guest: null }
      );
    });

    return () => {
      alive = false;
    };
  }, []);

  return state;
}
