import { Filter, LocationDictionary, Operator } from '@types';
import { get } from './base';
import { Urls } from './base/axios';
import { generateSearchParams } from './helpers';

/* eslint-disable max-len */
export default {
  getListByType: (
    locationType: LocationDictionary['locationType'],
    parentId?: string,
  ) =>
    get<LocationDictionary[]>(
      `${Urls.base}/addresses/dictionary`,
      generateSearchParams({
        filters: [
          {
            field: 'locationType',
            operator: Operator.EQUAL,
            value: locationType,
          },
          parentId
            ? {
                field: 'parentId',
                operator: Operator.EQUAL,
                value: parentId,
              }
            : ({} as Filter),
        ],
      }),
    ),
};
