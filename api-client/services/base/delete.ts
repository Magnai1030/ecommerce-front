import axios, { withAuth } from "./axios";

export default async <T, R = T>(
  url: string,
  body?: { [key: string]: any },
  params?: Parameters<typeof withAuth>[0]
) => axios.delete<T, R>(url, await withAuth({ data: body, ...params }));
