import axios, { withAuth } from "./axios";

export default async <T>(
  url: string,
  params?: Parameters<typeof withAuth>[0]
) => axios.get<T>(url, await withAuth(params));
