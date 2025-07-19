import type { AxiosRequestConfig } from "axios";

export type ApiRequest<R> = {
  // Axios request config
  request: AxiosRequestConfig & { url: string };

  // Hooks
  onResponse: (response: object) => R extends object ? R : null;
};
