import { UserFromApi } from "@types";
import axios, { AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

// Base URL
export const baseURL = process.env.NEXT_PUBLIC_HT_URL;

export const Urls = {
  base: baseURL,
};

type ExtraParams = {
  headers?: { [key in string]: string };
  axiosParams?: { [key in string]: string };
  withAdvanced?: boolean;
  isFlat?: boolean;
  from?: string;
  to?: string;
};

export const withAuth = async (
  $params?: AxiosRequestConfig & ExtraParams
): Promise<AxiosRequestConfig> => {
  const { headers, axiosParams, ...params } = $params || {};
  const session = await getSession();
  const user = session?.user as UserFromApi | undefined;

  return {
    params,
    ...axiosParams,
    headers:
      session && user
        ? {
            Authorization: `Bearer ${user.accessToken}`,
            ...headers,
          }
        : headers,
  };
};

export default axios;
