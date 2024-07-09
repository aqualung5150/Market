// const throttle = (func: (...args: any[]) => any, delay: number) => {
//   let waiting = false;

//   return (...args: any[]) => {
//     if (!waiting) {
//       waiting = true;
//       func(...args);
//       setTimeout(() => {
//         waiting = false;
//       }, delay);
//     }
//   };
// };

const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number,
) => {
  let waiting = false;

  return (...args: Parameters<T>) => {
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
