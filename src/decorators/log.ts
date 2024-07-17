export function withLog(fn: Function) {
  return function (...args: any[]) {
    console.log(`Function called with arguments: ${JSON.stringify(args)}`);
    const result = fn(...args);
    console.log(`Function returned: ${JSON.stringify(result)}`);
    return result;
  };
}
