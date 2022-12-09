import { PaginationResult, Search, ProductFromApi, ProductIndex } from "@types";
import { customGet, get } from "./base";
import { Urls } from "./base/axios";
import { generateSearchParams } from "./helpers";

/* eslint-disable max-len */
export default {
  find: (search?: Partial<Search>, collectionId?: string) =>
    get<PaginationResult<ProductFromApi>>(`${Urls.base}/products`, {
      ...generateSearchParams(search),
      ...(collectionId ? ({ collectionId } as any) : {}),
    }),
  findOne: (productId: string, token?: string) =>
    get<ProductFromApi>(
      `${Urls.base}/products/${productId}`,
      token ? { headers: { Authorization: `Bearer ${token}` } } : {}
    ),
  getRelatedItems: (productId: string) =>
    get<{ hits: ProductIndex[] }>(
      `${Urls.base}/products/${productId}/related-items`
    ),
  visits: (from: string, to: string) =>
    get<PaginationResult<ProductFromApi>>(
      `${Urls.base}/products/visits?from=${from}&to=${to}`
    ),
  customVisits: (from: string, to: string, token: string) =>
    customGet<PaginationResult<ProductFromApi>>(
      `${Urls.base}/products/visits?from=${from}&to=${to}`,
      token
    ),
};
