const throttle = (
  func: (...arg: any[]) => any,
  delay: number,
): ((...arg: any[]) => any) => {
  let waiting = false;

  return (...args: any[]) => {
    if (!waiting) {
      waiting = true;
      func(...args);
      setTimeout(() => {
        waiting = false;
      }, delay);
    }
  };
};

export default throttle;
