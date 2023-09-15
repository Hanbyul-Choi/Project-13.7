import { useOverlayContext } from '..';
import Toast from '../Toast';

export default function useToast() {
  const { mount: _mount, unmount: _unmount } = useOverlayContext();
  const toast = (text: string) => {
    return _mount('Toast', <Toast text={text} unmount={() => _unmount('Toast')} />);
  };
  return { toast };
}
