import { ComponentPropsWithoutRef, ReactNode, useEffect, useRef } from "react";

interface InfiniteScrollProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  fetchNextPage: () => void;
  reverse: Boolean;
}

const InfiniteScroll = ({
  children,
  fetchNextPage,
  reverse,
  ...props
}: InfiniteScrollProps) => {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) fetchNextPage();
    });

    if (observerTarget.current) observer.observe(observerTarget.current);

    return () => {
      if (observerTarget.current) observer.unobserve(observerTarget.current);
    };
  }, [fetchNextPage]);

  return (
    <div
      {...props}
      style={{
        display: "flex",
        flexDirection: reverse ? "column-reverse" : "column",
        overflow: "auto",
        overflowAnchor: "none",
      }}
    >
      {children}
      <div style={{ flex: "0 0 1px" }} ref={observerTarget}/>
    </div>
  );
};

export default InfiniteScroll;
