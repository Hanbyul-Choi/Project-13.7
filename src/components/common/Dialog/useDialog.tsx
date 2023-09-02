'use client';

import { Dialog, useOverlayContext } from '.';

export const useDialog = () => {
  const { mount: _mount, unmount: _unmount } = useOverlayContext();
  const Confirm = async (mainText: string, subText?: string) => {
    return await new Promise(resolve => {
      _mount(
        'Confirm',
        <Dialog
          type="Confirm"
          onClose={() => {
            resolve(false);
            _unmount('Confirm');
          }}
          onSuccess={() => {
            resolve(true);
            _unmount('Confirm');
          }}
          mainText={mainText}
          subText={subText}
        />,
      );
    });
  };

  const Alert = async (mainText: string, subText?: string) => {
    return await new Promise(resolve => {
      _mount(
        'Alert',
        <Dialog
          type="Alert"
          onClose={() => {
            resolve(true);
            _unmount('Alert');
          }}
          mainText={mainText}
          subText={subText}
        />,
      );
    });
  };

  return { Alert, Confirm };
};
