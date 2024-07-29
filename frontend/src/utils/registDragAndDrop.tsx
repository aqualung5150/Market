const registDragAndDrop = ({
  onClick,
  onDragChange,
  onDragEnd,
  stopPropagation,
}: {
  onClick?: () => void;
  onDragChange?: (offsetX: number, offsetY: number) => void;
  onDragEnd?: (offsetX: number, offsetY: number) => void;
  stopPropagation?: boolean;
}) => {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );

  if (isMobile) {
    return {
      onTouchStart: (startEvent: React.TouchEvent<HTMLDivElement>) => {
        if (stopPropagation) startEvent.stopPropagation();

        const touchEndhandler = () => {
          onClick?.();
          // remove DRAG event
          document.removeEventListener("touchmove", dragChangeHandler);
        };

        const dragChangeHandler = (moveEvent: TouchEvent) => {
          if (moveEvent.cancelable) moveEvent.preventDefault();

          const offsetX =
            moveEvent.changedTouches[0].pageX -
            startEvent.changedTouches[0].pageX;
          const offsetY =
            moveEvent.changedTouches[0].pageY -
            startEvent.changedTouches[0].pageY;
          onDragChange?.(offsetX, offsetY);
          // remove CLICK event
          document.removeEventListener("touchend", touchEndhandler);
          // add DRAG_END event
          document.addEventListener("touchend", dragEndHandler, { once: true });
        };

        const dragEndHandler = (endEvent: TouchEvent) => {
          const offsetX =
            endEvent.changedTouches[0].pageX -
            startEvent.changedTouches[0].pageX;
          const offsetY =
            endEvent.changedTouches[0].pageY -
            startEvent.changedTouches[0].pageY;
          onDragEnd?.(offsetX, offsetY);
          document.removeEventListener("touchmove", dragChangeHandler);
        };

        document.addEventListener("touchend", touchEndhandler, { once: true });
        document.addEventListener("touchmove", dragChangeHandler, {
          passive: false,
        });
      },
    };
  }

  return {
    onMouseDown: (downEvent: React.MouseEvent<Element, MouseEvent>) => {
      if (stopPropagation) downEvent.stopPropagation();

      const mouseUphandler = () => {
        onClick?.();
        // remove DRAG event
        document.removeEventListener("mousemove", dragChangeHandler);
      };

      const dragChangeHandler = (moveEvent: MouseEvent) => {
        const offsetX = moveEvent.pageX - downEvent.pageX;
        const offsetY = moveEvent.pageY - downEvent.pageY;
        onDragChange?.(offsetX, offsetY);
        // remove CLICK event
        document.removeEventListener("mouseup", mouseUphandler);
        // add DRAG_END event
        document.addEventListener("mouseup", dragEndHandler, { once: true });
      };

      const dragEndHandler = (upEvent: MouseEvent) => {
        const offsetX = upEvent.pageX - downEvent.pageX;
        const offsetY = upEvent.pageY - downEvent.pageY;
        onDragEnd?.(offsetX, offsetY);
        document.removeEventListener("mousemove", dragChangeHandler);
      };

      document.addEventListener("mouseup", mouseUphandler, { once: true });
      document.addEventListener("mousemove", dragChangeHandler);
    },
  };
};

export default registDragAndDrop;
