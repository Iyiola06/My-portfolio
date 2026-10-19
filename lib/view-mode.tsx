'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type ViewMode = 'human' | 'dev';

const STORAGE_KEY = 'portfolio-view-mode';

type ViewModeContextValue = {
  mode: ViewMode;
  setMode: (mode: ViewMode) => void;
};

const ViewModeContext = createContext<ViewModeContextValue>({
  mode: 'human',
  setMode: () => {},
});

const isViewMode = (value: string | null): value is ViewMode => value === 'human' || value === 'dev';

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ViewMode>('human');

  // Resolve the saved mode after mount so server and client render the same first frame.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('view');
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // Storage can be blocked; fall back to the default.
    }
    const initial = isViewMode(fromUrl) ? fromUrl : isViewMode(saved) ? saved : 'human';
    // eslint-disable-next-line react-hooks/set-state-in-effect -- must wait for mount to avoid a hydration mismatch
    setModeState(initial);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.view = mode;
  }, [mode]);

  const setMode = useCallback((next: ViewMode) => {
    setModeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage failures.
    }
    const url = new URL(window.location.href);
    url.searchParams.set('view', next);
    window.history.replaceState(null, '', url);
    window.scrollTo({ top: 0 });
  }, []);

  const value = useMemo(() => ({ mode, setMode }), [mode, setMode]);

  return <ViewModeContext.Provider value={value}>{children}</ViewModeContext.Provider>;
}

export const useViewMode = () => useContext(ViewModeContext);
