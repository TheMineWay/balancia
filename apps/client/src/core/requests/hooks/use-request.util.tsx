import { ENV } from "@constants/env/env.constant";
import { useRequestManagedErrorNotification } from "@core/requests/hooks/use-request-error-notification";
import axios, { AxiosError, type AxiosRequestConfig } from "axios";

export type RequestOptions = AxiosRequestConfig & { url: string };
export type AdditionalRequestOptions = { manage?: boolean };

export const useRequest = () => {
	const { manage: manageFn } = useRequestManagedErrorNotification();

	const request = async (
		options: RequestOptions,
		{ manage = true }: AdditionalRequestOptions = {},
	) => {
		try {
			return await axios.request({
				...options,
				baseURL: ENV.api.host ?? options.baseURL,
			});
		} catch (error) {
			if (error instanceof AxiosError) {
				if (manage) manageFn(error);
				return error;
			}
			throw error;
		}
	};

	return { request };
};
