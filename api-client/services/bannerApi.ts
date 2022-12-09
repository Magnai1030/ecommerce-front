import { BannerFromApi, PaginationResult, Search } from '@types';
import { get } from './base';
import { Urls } from './base/axios';
import { generateSearchParams } from './helpers';

/* eslint-disable max-len */
export default {
  find: (search?: Partial<Search>) =>
    get<PaginationResult<BannerFromApi>>(
      `${Urls.base}/banners`,
      generateSearchParams(search),
    ),
};
