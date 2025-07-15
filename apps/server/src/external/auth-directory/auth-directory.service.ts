import { ENV } from "@constants/conf/env.constant";
import { Injectable } from "@nestjs/common";
import axios, { AxiosRequestConfig, Method } from "axios";
import z from "zod";

/**
 * This service is designed for Authentik.
 */

@Injectable()
export class AuthDirectoryService {
  async getUsers(options: Options = {}) {
    const url = getApiUrl(API_CONFIG.usersEndpoint);
    const response = await axios.request(getRequestConfig(url, options));
    const data = PAGINATED_RESPONSE_SCHEMA(USER_SCHEMA).parse(response.data);
    return data;
  }
}

/* Types */
type ApiConfig = {
  baseApiPath?: string;
  usersEndpoint: string;
  authHeaderName: string;
};

type Options = {
  pageSize?: number;
  page?: number;
};

const USER_SCHEMA = z.object({
  pk: z.number(),
  username: z.string(),
  name: z.string(),
  is_active: z.boolean(),
  last_login: z.string().nullable(),
  date_joined: z.string(),
  is_superuser: z.boolean(),
  email: z.string(),
  avatar: z.string(),
  uid: z.string(),
  path: z.string(),
  type: z.enum([
    "internal_service_account",
    "service_account",
    "internal",
    "external",
  ]),
  uuid: z.string(),
  password_change_date: z.string(), // ISO date
});

const PAGINATED_RESPONSE_SCHEMA = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    pagination: z.object({
      next: z.number(),
      previous: z.number(),
      count: z.number(),
      current: z.number(),
      total_pages: z.number(),
      start_index: z.number(),
      end_index: z.number(),
    }),
    results: z.array(itemSchema),
  });

/* Configs */
const API_CONFIG: ApiConfig = {
  baseApiPath: ENV.authDirectory.apiUrl,
  usersEndpoint: "/core/users/",
  authHeaderName: "Authorization",
};

/* Utils */
const getApiUrl = (path: string): string => {
  return `${API_CONFIG.baseApiPath}${path}`;
};

const getHeaders = () => {
  return {
    [API_CONFIG.authHeaderName]: `Bearer ${process.env.AUTH_DIRECTORY_API_KEY}`,
  };
};

type GetRequestConfigOptions = {
  method?: Method;
  params?: Record<string, string | number>;
} & Options;
const getRequestConfig = (
  url: string,
  {
    method = "GET",
    page = 1,
    pageSize = 20,
    params = {},
  }: GetRequestConfigOptions = {},
): AxiosRequestConfig => {
  return {
    url,
    headers: getHeaders(),
    method,
    params: {
      ...params,
      page,
      page_size: pageSize,
    },
  };
};
