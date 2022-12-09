import {
  CollectionFromApi,
  PaginationResult,
  ProductFromApi,
  Search,
} from "@types";
import { get, customGet } from "./base";
import { Urls } from "./base/axios";
import { generateSearchParams } from "./helpers";

/* eslint-disable max-len */
export default {
  find: () => get<CollectionFromApi[]>(`${Urls.base}/collections`),
  findOne: (collectionId: string) =>
    get<CollectionFromApi>(`${Urls.base}/collections/${collectionId}`),
  getItems: (collectionId: string, search?: Partial<Search>) =>
    get<PaginationResult<ProductFromApi>>(
      `${Urls.base}/collections/${collectionId}/items`,
      {
        ...generateSearchParams(search),
      }
    ),
};
