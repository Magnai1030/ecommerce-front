import { AxiosResponse } from 'axios';
import axios, { withAuth } from './axios';

export default async <T, R = T>(url: string, body: { [key: string]: any }, params?: Parameters<typeof withAuth>[0]) =>
  axios.put<T, AxiosResponse<R>>(url, body, await withAuth(params));
