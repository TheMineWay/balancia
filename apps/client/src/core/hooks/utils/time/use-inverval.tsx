import { useEffect } from "react";

export type UseIntervalOptions = {
  fn?: () => void;
  interval?: number;
};

export const useInterval = ({
  interval = 1000,
  fn,
}: Readonly<UseIntervalOptions> = {}) => {
  useEffect(() => {
    const timeout = setInterval(() => {
      fn?.();
    }, interval);

    return () => clearInterval(timeout);
  }, [fn, interval]);
};

export type UseInterval = ReturnType<typeof useInterval>;
