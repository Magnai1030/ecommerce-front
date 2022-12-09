import {
  PaginationResult,
  ProductFromApi,
  UserFromApi,
  UserUpdateDTO,
} from "@types";
import { post, put, get, customGet } from "./base";
import { Urls } from "./base/axios";

/* eslint-disable max-len */
export default {
  loginByPin: (payload: { phone: string; pin: string }) =>
    post<UserFromApi>(`${Urls.base}/users/auth/login-by-pin`, payload),
  requestLoginCode: (payload: { phone: string }) =>
    post(`${Urls.base}/users/auth/request-login-code`, payload),
  loginByCode: (payload: { emailOrPhone: string; verificationCode: string }) =>
    post<UserFromApi>(`${Urls.base}/users/auth/login-by-code`, payload),
  googleLogin: (token: string) =>
    get<UserFromApi>(`${Urls.base}/users/auth/google?id_token=${token}`),
  registerByPhone: (payload: { phone: string }) =>
    post(`${Urls.base}/users/auth/signup-by-phone`, payload),
  verifyRegister: (payload: {
    phone: string;
    firstName: string;
    phoneVerificationCode: string;
    pinCode: string;
  }) =>
    post<UserFromApi>(`${Urls.base}/users/auth/verify-registration`, payload),
  update: (model: UserUpdateDTO) =>
    put<UserFromApi>(`${Urls.base}/users/me`, model),
  avatar: (payload: { image: string }) =>
    put<{ Location: string }>(`${Urls.base}/users/avatar`, payload),
  wishlist: (offset: number, limit: number) =>
    get<PaginationResult<ProductFromApi>>(
      `${Urls.base}/wishlist?paging[offset]=${offset}&paging[limit]=${limit}`
    ),
  createWishlist: (payload: { productId: string }) =>
    post(`${Urls.base}/wishlist`, payload),
  verifyEmail: () =>
    post(`${Urls.base}/users/auth/request-email-verification`, {}),
  verifyEmailCode: (payload: { verificationCode: string }) =>
    post(`${Urls.base}/users/auth/verify-email`, payload),
  verifyPhone: () =>
    post(`${Urls.base}/users/auth/request-phone-verification`, {}),
  verifyPhoneCode: (payload: { verificationCode: string }) =>
    post(`${Urls.base}/users/auth/verify-phone`, payload),
  me: (token: string) => customGet<UserFromApi>(`${Urls.base}/users/me`, token),
};
