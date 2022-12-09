import { PaginationResult, Search, OrderFromApi, CreateOrderDTO } from "@types";
import { post, get, put } from "./base";
import { Urls } from "./base/axios";
import { generateSearchParams } from "./helpers";

/* eslint-disable max-len */
export default {
  find: (search?: Partial<Search>) =>
    get<PaginationResult<OrderFromApi>>(`${Urls.base}/orders/myorders`, {
      ...generateSearchParams(search),
    }),
  findOne: (orderId: string) =>
    get<OrderFromApi>(`${Urls.base}/orders/myorders/${orderId}`),
  create: (model: CreateOrderDTO) =>
    post<OrderFromApi>(`${Urls.base}/orders`, model),
  myOrders: (offset: number, limit: number) =>
    get<PaginationResult<OrderFromApi>>(
      `${Urls.base}/orders/myOrders?paging[offset]=${offset}&paging[limit]=${limit}`
    ),
  cancelMyOrder: (id: string) =>
    put(`${Urls.base}/orders/myorders/${id}/cancel`, {}),
};
