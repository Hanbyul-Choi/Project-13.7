'use client';
import { createContext, Fragment, type PropsWithChildren, type ReactNode, useCallback, useContext, useMemo, useState } from 'react';

export const OverlayContext = createContext<
  | {
      mount: (id: string, element: ReactNode) => void;
      unmount: (id: string) => void;
    }
  | undefined
>(undefined);

export type CreateOverlayElement = (props: { isOpen: boolean; close: () => void; exit: () => void }) => JSX.Element;

export const OverlayProvider = ({ children }: PropsWithChildren) => {
  const [overlays, setOverlays] = useState<Map<string, ReactNode>>(new Map());

  const mount = useCallback((id: string, element: ReactNode) => {
    setOverlays(_overlays => {
      const overlays = new Map(_overlays);
      overlays.set(id, element);

      return overlays;
    });
  }, []);

  const unmount = useCallback((id: string) => {
    setOverlays(_overlays => {
      const overlays = new Map(_overlays);
      overlays.delete(id);

      return overlays;
    });
  }, []);

  const context = useMemo(
    () => ({
      mount,
      unmount,
    }),
    [mount, unmount],
  );

  return (
    <OverlayContext.Provider value={context}>
      {children}
      {[...overlays.entries()].map(([id, element]) => (
        <Fragment key={id}>{element}</Fragment>
      ))}
    </OverlayContext.Provider>
  );
};

export const useOverlayContext = () => {
  const overlayContext = useContext(OverlayContext);
  if (overlayContext == undefined) {
    throw new Error('useOverlayContext is only available within OverlayProvider');
  }

  return overlayContext;
};
