import {
  CategoryFromApi,
  PaginationResult,
  Search,
} from '@types';
import { get } from './base';
import { Urls } from './base/axios';
import { generateSearchParams } from './helpers';

/* eslint-disable max-len */
export default {
  find: (search?: Partial<Search>, isFlat?: boolean) =>
    get<PaginationResult<CategoryFromApi>>(`${Urls.base}/categories`, {
      ...generateSearchParams(search),
      isFlat,
    }),
  findOne: (categoryId: string) =>
    get<CategoryFromApi>(`${Urls.base}/categories/${categoryId}`),
};
