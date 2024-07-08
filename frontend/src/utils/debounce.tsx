const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number,
  leading = false,
) => {
  let timer: ReturnType<typeof setTimeout> | null;
  return (...args: Parameters<T>) => {
    if (leading && !timer) {
      func(...args);
    }

    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      if (!leading) func(...args);
    }, delay);
  };
};

export default debounce;
