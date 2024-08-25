export function withLog(fn: Function) {
  return function (...args: any[]) {
    const result = fn(...args);

    return result;
  };
}
