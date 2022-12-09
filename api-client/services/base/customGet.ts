import axios from './axios';

export default <T>(url: string, token: string) =>
  axios.get<T>(url, { headers: { Authorization: `Bearer ${token}` } });
