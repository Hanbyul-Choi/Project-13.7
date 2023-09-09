import { useEffect, useState } from 'react';

export const useTakeDeviceSize = () => {
  const isBrowser = typeof window !== 'undefined'; // SSR에서 window 객체 접근 방지
  const [windowSize, setWindowSize] = useState({
    width: isBrowser ? window.innerWidth : 0,
    height: isBrowser ? window.innerHeight : 0,
  });
//width만 사용, height는 나중에 고려
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      console.log()
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);

  return windowSize;
}