import { useEffect, useState } from "react";
import { ReactComponent as AngleLeft } from "../assets/angleLeft.svg";
import { ReactComponent as AngleRight } from "../assets/angleRight.svg";

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
    <div className="overflow-hidden relative w-full h-full">
      <div
        className="w-full h-full flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${cur * 100}%)` }}
      >
        {slides}
      </div>
      {/* <div className="absolute inset-0 flex items-center justify-between p-4"> */}
      <div
        className="absolute top-1/2 translate-y-[-50%] left-4 rounded-full shadow bg-white bg-opacity-50 text-gray-800 hover:bg-white hover:bg-opacity-90"
        onClick={(e) => {
          e.stopPropagation();
          prev();
          setAutoSlideState(false);
        }}
      >
        <AngleLeft width="40px" height="40px" />
      </div>

      <div
        className="absolute top-1/2 translate-y-[-50%] right-4 rounded-full shadow bg-white bg-opacity-50 text-gray-800 hover:bg-white hover:bg-opacity-90"
        onClick={(e) => {
          e.stopPropagation();
          next();
          setAutoSlideState(false);
        }}
      >
        <AngleRight width="40px" height="40px" />
      </div>
      {/* </div> */}

      <div className="absolute bottom-4 inset-x-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`transition-all w-3 h-3 bg-white rounded-full ${
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
