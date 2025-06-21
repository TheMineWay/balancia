import { ENV } from "@core/constants/env/env.constant";
import type { AxiosRequestConfig } from "axios";
import axios from "axios";

export type RequestOptions = AxiosRequestConfig & { url: string };

export const useRequest = () => {
    const request = async (options: RequestOptions) => await axios.request({
        ...options,
        baseURL: ENV.api.host ?? options.baseURL
    });

    return { request }
}