import {
  BrandFromApi,
  PaginationResult,
  Search,
} from '@types';
import {  get } from './base';
import { Urls } from './base/axios';
import { generateSearchParams } from './helpers';

/* eslint-disable max-len */
export default {
  find: (search?: Partial<Search>) =>
    get<PaginationResult<BrandFromApi>>(
      `${Urls.base}/brands`,
      generateSearchParams(search),
    ),
  findOne: (brandIdOrSlug: string) =>
    get<BrandFromApi>(`${Urls.base}/brands/${brandIdOrSlug}`),
};
