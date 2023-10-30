import { AxiosInstance } from 'axios';
import { BasicResponse } from '../model';

export const basic = (axiosPrivate: AxiosInstance) =>
  axiosPrivate.get<BasicResponse>(`/user/me`);
