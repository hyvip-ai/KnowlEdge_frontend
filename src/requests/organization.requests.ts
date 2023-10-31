import { AxiosInstance } from 'axios';

export const organization = (axiosPrivate: AxiosInstance) =>
  axiosPrivate.get(`/organization`);
