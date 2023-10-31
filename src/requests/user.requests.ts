import { AxiosInstance } from 'axios';
import { BasicResponse } from '../model';
import { UpdateBasic } from '../interfaces';

export const basic = (axiosPrivate: AxiosInstance) =>
  axiosPrivate.get<BasicResponse>(`/user/me`);

export const updateBasic = (
  axiosPrivate: AxiosInstance,
  data: Partial<UpdateBasic>
) => axiosPrivate.patch(`/user/me`, data);
