import type { ICallback } from "@core-fts/callbacks/lib/callback";
import { CALLBACKS } from "@core-fts/callbacks/lib/callbacks";

const CALLBACK_PREFIX = "/_callback/";

export const getCallbackByUrl = (url: string): ICallback | null => {
  const path = new URL(url).pathname;
  if (!path.startsWith(CALLBACK_PREFIX)) return null;
  const callbackPath = path.slice(CALLBACK_PREFIX.length);

  const callback = Object.values(CALLBACKS).find((cb) => {
    const regexp = cb.urlMatcher;
    return regexp.test(callbackPath);
  });

  if (!callback) return null;

  return callback;
};
