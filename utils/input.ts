export function inputDebounce(fn: (value: any) => void, interval: number) {
  let timer: NodeJS.Timeout;

  return function (value: any) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => fn(value), interval);
  };
}
