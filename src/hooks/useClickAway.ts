import { useEffect, useRef } from 'react';

const defaultEvents = ['mousedown', 'touchstart'];

interface UseClickAwayType {
  ref: React.RefObject<HTMLElement>;
  callback: (event: Event) => void; // Specify the event type here
  events?: string[];
}

export const useClickAway = ({ ref, callback, events = defaultEvents }: UseClickAwayType) => {
  const _callback = useRef(callback);

  useEffect(() => {
    _callback.current = callback;
  }, [callback]);

  useEffect(() => {
    const onClickAway = (event: Event) => {
      event.stopPropagation();

      if (ref.current != undefined && !ref.current.contains(event.target as Node)) {
        _callback.current(event);
      }
    };

    events.forEach(event => {
      document.addEventListener(event, onClickAway);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, onClickAway);
      });
    };
  }, [events, ref]);
};
