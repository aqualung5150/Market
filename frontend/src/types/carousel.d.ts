interface CarouselProps {
  children: React.ReactNode[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
  initialIndex?: number;
  onClick?: () => void;
  setCurIndex?: React.Dispatch<SetStateAction<number>>;
}

