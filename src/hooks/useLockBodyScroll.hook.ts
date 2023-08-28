import { useEffect } from 'react';

export const useLockBodyScroll = (trigger = false) => {
  useEffect(() => {
    if (trigger) {
      const originalStyle = getComputedStyle(document.body).overflow;

      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [trigger]);
};
