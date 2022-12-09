import { Cart, CartItem, CreateCartItemDTO, UpdateCartItemDTO } from '@types';
import { deleteRequest, get, post, put } from './base';
import { Urls } from './base/axios';

/* eslint-disable max-len */
export default {
  getCart: () => get<Cart>(`${Urls.base}/cart-items`),
  createItem: (dto: CreateCartItemDTO) =>
    post<CartItem>(`${Urls.base}/cart-items`, dto),
  updateItem: (cartItemId: string, dto: UpdateCartItemDTO) =>
    put<CartItem>(`${Urls.base}/cart-items/${cartItemId}`, dto),

  removeItem: (cartItemId: string) =>
    deleteRequest<void>(`${Urls.base}/cart-items/${cartItemId}`),
};
