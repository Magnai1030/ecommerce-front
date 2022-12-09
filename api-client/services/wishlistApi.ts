import { PaginationResult, Search, ProductFromApi } from "@types";
import { deleteRequest, get, post } from "./base";
import { Urls } from "./base/axios";
import { generateSearchParams } from "./helpers";

/* eslint-disable max-len */
export default {
  find: (search?: Partial<Search>) =>
    get<PaginationResult<ProductFromApi>>(`${Urls.base}/wishlist`, {
      ...generateSearchParams(search),
    }),
  remove: (productId: string) =>
    deleteRequest<void>(`${Urls.base}/wishlist/${productId}`),
  create: (productId: string) =>
    post<void>(`${Urls.base}/wishlist`, { productId }),
  isProductAdded: (productId: string) =>
    get<boolean>(`${Urls.base}/wishlist/${productId}/is-product-added/`)
};
