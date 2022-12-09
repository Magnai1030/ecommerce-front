import {
  CreateShipmentAddressDTO,
  ShipmentAddress,
  UpdateShipmentAddressDTO,
} from '@types';
import { deleteRequest, get, post, put } from './base';
import { Urls } from './base/axios';

/* eslint-disable max-len */
export default {
  list: () => get<ShipmentAddress[]>(`${Urls.base}/addresses`),
  create: (dto: CreateShipmentAddressDTO) =>
    post<ShipmentAddress>(`${Urls.base}/addresses`, dto),
  update: (addressId: string, dto: UpdateShipmentAddressDTO) =>
    put<ShipmentAddress>(`${Urls.base}/addresses/${addressId}`, dto),

  remove: (addressId: string) =>
    deleteRequest<void>(`${Urls.base}/addresses/${addressId}`),
};
