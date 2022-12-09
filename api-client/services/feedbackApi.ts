import { post } from "./base";
import { Urls } from "./base/axios";

/* eslint-disable max-len */
export default {
  create: (body: { contact: string; message: string }) =>
    post(`${Urls.base}/feedbacks`, body),
};
