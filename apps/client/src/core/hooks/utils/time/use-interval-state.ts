import {
  useInterval,
  type UseIntervalOptions,
} from "@core/hooks/utils/time/use-inverval";
import { useState } from "react";

export type UseIntervalStateOptions<T> = Omit<UseIntervalOptions, "fn"> & {
  fn: () => T;
  initialState: T;
};

export const useIntervalState = <T>({
  fn,
  initialState,
  ...useIntervalOptions
}: UseIntervalStateOptions<T>) => {
  const [state, setState] = useState<T>(initialState);

  useInterval({
    ...useIntervalOptions,
    fn: () => {
      const newState = fn();
      setState(newState);
    },
  });

  return { state, setState };
};

export type UseIntervalState<T> = ReturnType<typeof useIntervalState<T>>;
