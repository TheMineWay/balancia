import { ENV } from "@core/constants/env/env.constant";
import axios, { AxiosRequestConfig } from "axios";

export type RequestOptions = AxiosRequestConfig & { url: string };

export const useRequest = () => {
    const request = async (options: RequestOptions) => await axios.request({
        ...options,
        baseURL: ENV.api.host ?? options.baseURL
    });

    return { request }
}