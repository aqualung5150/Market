import { useEffect, useRef, useState } from "react";
import { ReactComponent as AngleLeft } from "assets/angleLeft.svg";
import { ReactComponent as AngleRight } from "assets/angleRight.svg";
import registDragAndDrop from "utils/registDragAndDrop";

const Carousel = ({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
  initialIndex = 0,
  onClick,
  setCurIndex,
}: CarouselProps) => {
  const [cur, setCur] = useState(initialIndex);
  const [animateOn, setAnimateOn] = useState(false);
  const [autoSlideOn, setAutoSlideOn] = useState(autoSlide);

  const prev = () => {
    setAnimateOn(true);
    setCurIndex?.(cur === 0 ? slides.length - 1 : cur - 1);
    setCur((cur) => (cur === 0 ? slides.length - 1 : cur - 1));
  };
  const next = () => {
    setAnimateOn(true);
    setCurIndex?.(cur === slides.length - 1 ? 0 : cur + 1);
    setCur((cur) => (cur === slides.length - 1 ? 0 : cur + 1));
  };

  useEffect(() => {
    if (!autoSlideOn) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlideOn]);

  const [offsetX, setOffsetX] = useState(0);
  const slider = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (slider.current) setWidth(slider.current.offsetWidth);
  }, [slider.current]);

  return (
    <>
      <div className="relative h-full w-full overflow-hidden">
        <div
          {...registDragAndDrop({
            onClick: () => {
              setAutoSlideOn(false);
              onClick?.();
            },
            onDragChange: (offsetX) => {
              setAutoSlideOn(false);
              setAnimateOn(true);
              setOffsetX(offsetX);
            },
            onDragEnd: (offsetX) => {
              if (Math.abs(offsetX) > width / 3) {
                if (offsetX > 0) prev();
                else next();
              }
              setOffsetX(0);
            },
            stopPropagation: true,
          })}
          ref={slider}
          className={`flex h-full w-full ${animateOn && "transition-transform duration-300 ease-out"}`}
          style={{
            transform: `translateX(-${(cur - offsetX / width) * 100 + 100}%)`,
          }}
        >
          <>
            <div className="w-full flex-shrink-0" />
            {slides}
          </>
        </div>
        <div
          className="absolute left-4 top-1/2 translate-y-[-50%] rounded-full bg-white bg-opacity-50 text-gray-800 shadow hover:bg-white hover:bg-opacity-90"
          onClick={() => {
            prev();
            setAutoSlideOn(false);
          }}
        >
          <AngleLeft width="40px" height="40px" />
        </div>
        <div
          className="absolute right-4 top-1/2 translate-y-[-50%] rounded-full bg-white bg-opacity-50 text-gray-800 shadow hover:bg-white hover:bg-opacity-90"
          onClick={() => {
            next();
            setAutoSlideOn(false);
          }}
        >
          <AngleRight width="40px" height="40px" />
        </div>
        <div className="absolute inset-x-0 bottom-4">
          <div className="flex items-center justify-center gap-2">
            {slides.map((_, idx) => (
              <div
                key={idx}
                className={`h-3 w-3 rounded-full bg-white shadow transition-all ${
                  cur === idx ? "p-2" : "bg-opacity-50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;
