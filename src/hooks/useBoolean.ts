import { useMemo, useState } from 'react';

export const useBoolean = (
  initialState = false
): [boolean, { on: () => void; off: () => void; toggle: () => void }] => {
  const [value, setValue] = useState(initialState);

  const controller = useMemo(
    () => ({
      on: () => {
        setValue(true);
      },
      off: () => {
        setValue(false);
      },
      toggle: () => {
        setValue(prev => !prev);
      }
    }),
    []
  );

  return [value, controller];
};
