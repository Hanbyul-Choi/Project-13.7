import { useEffect, useRef } from 'react';

export const useMount = (callback: () => void): void => {
  const _callback = useRef<() => void>(callback);

  useEffect(() => {
    _callback.current();
  }, []);
};
