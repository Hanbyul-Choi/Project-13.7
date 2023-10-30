import  {  useState } from "react";

export default function useSlideThrottle():[number, () => void, (direction: string) => void] {
  const [currentSlide , setCurrentSlide ] = useState<number>(0);
  const [throttle, setThrottle] = useState(false);

  const handleClick = (direction:string):void => {
    if (throttle) return;
    if (!throttle) {
      direction === "next" ? setCurrentSlide((currentSlide ) => currentSlide +1) : setCurrentSlide((currentSlide ) => currentSlide -1)
      setThrottle(true);
      setTimeout(async () => {
        setThrottle(false);
      }, 500);
    }
  };

  const initCurrentSlide = () => {
    setCurrentSlide(0)
  }
  return [currentSlide, initCurrentSlide , handleClick]
}