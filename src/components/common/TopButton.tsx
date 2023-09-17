'use client';
import { useEffect, useState } from 'react';

function TopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    showButton && (
      <button className="fixed bottom-20 right-5 w-10 h-10 z-50 bg-sub3 rounded-full" onClick={scrollToTop}>
        ↑
      </button>
    )
  );
}

export default TopButton;
