import { useEffect, useState } from "react";

type Options = {
  startsAt?: number;
  increment?: number;
  autoplay?: boolean;
  limit?: number | null;
  limitDetectFn?: (
    current: number,
    limit: number | null,
    options?: Omit<Options, "limitDetectFn">
  ) => boolean;
  onLimit?: CallableFunction;
};

export const useCounter = ({
  startsAt = 0,
  increment = 1,
  autoplay = false,
  limit = null,
  limitDetectFn = DEFAULT_LIMIT_DETECT_FN,
  onLimit,
}: Options = {}) => {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [current, setCurrent] = useState(startsAt);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const newTime = current + increment;

      /* Calculate if time can keep going */
      if (limitDetectFn?.(current, limit, { increment })) {
        onLimit?.();
        setIsPlaying(false);
      }

      setCurrent(newTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const play = () => {
    if (limitDetectFn?.(current, limit, { increment })) return;
    setIsPlaying(true);
  };
  const pause = () => setIsPlaying(false);
  const reset = () => setCurrent(startsAt);
  const clear = () => {
    reset();
    if (autoplay) play();
  };

  const toString = (): string => {
    const totalSeconds = Math.floor(current / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return hours > 0
      ? `${hours}:${formattedMinutes}:${formattedSeconds}`
      : `${formattedMinutes}:${formattedSeconds}`;
  };

  return {
    /* Time state */
    current,
    setCurrent,

    /* Actions */
    play,
    pause,
    reset,
    clear,

    /* States */
    isPlaying,

    /* Utils */
    toString,
  };
};

export type UseCounter = ReturnType<typeof useCounter>;

/* Internal utils */

const DEFAULT_LIMIT_DETECT_FN: Options["limitDetectFn"] = (
  current,
  limit,
  options
) => {
  if (limit === null) return false;
  const increment = options?.increment ?? 1;
  const comparer: (a: number, b: number) => boolean =
    increment > 0 ? (a, b) => a > b : (a, b) => a < b;
  return comparer(current, limit);
};
