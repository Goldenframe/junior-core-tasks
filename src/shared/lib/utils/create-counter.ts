export function createCounter<T extends (...args: never[]) => unknown>(
  fn: T
): T & { getCount: () => number } {
  let count = 0;
  
  const wrapped = ((...args: Parameters<T>) => {
    count++;
    return fn(...args);
  }) as T & { getCount: () => number };
  
  wrapped.getCount = () => count;
  
  return wrapped;
}