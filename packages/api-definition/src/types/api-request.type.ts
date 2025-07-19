import type { AxiosRequestConfig } from "axios";

export type ApiRequest<R> = {
  // Axios request config
  request: AxiosRequestConfig;

  // Hooks
  onResponse: (response: object) => R extends object ? R : null;
};
