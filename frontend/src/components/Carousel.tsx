import { useEffect, useState } from "react";
import { ReactComponent as AngleLeft } from "assets/angleLeft.svg";
import { ReactComponent as AngleRight } from "assets/angleRight.svg";

const Carousel = ({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
  initialIndex = 0,
}: CarouselProps) => {
  const [cur, setCur] = useState(initialIndex);
  const [autoSlideState, setAutoSlideState] = useState(autoSlide);

  const prev = () => setCur((cur) => (cur === 0 ? slides.length - 1 : cur - 1));
  const next = () => setCur((cur) => (cur === slides.length - 1 ? 0 : cur + 1));

  useEffect(() => {
    if (!autoSlideState) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlideState]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        className="flex h-full w-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${cur * 100}%)` }}
      >
        {slides}
      </div>
      <div
        className="absolute left-4 top-1/2 translate-y-[-50%] rounded-full bg-white bg-opacity-50 text-gray-800 shadow hover:bg-white hover:bg-opacity-90"
        onClick={(e) => {
          e.stopPropagation();
          prev();
          setAutoSlideState(false);
        }}
      >
        <AngleLeft width="40px" height="40px" />
      </div>
      <div
        className="absolute right-4 top-1/2 translate-y-[-50%] rounded-full bg-white bg-opacity-50 text-gray-800 shadow hover:bg-white hover:bg-opacity-90"
        onClick={(e) => {
          e.stopPropagation();
          next();
          setAutoSlideState(false);
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
  );
};

export default Carousel;
