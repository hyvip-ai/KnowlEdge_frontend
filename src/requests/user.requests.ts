import { AxiosInstance } from 'axios';
import { AllUsersResponse, BasicResponse } from '../model';
import { InviteUser, UpdateBasic } from '../interfaces';

export const basic = (axiosPrivate: AxiosInstance) =>
  axiosPrivate.get<BasicResponse>(`/user/me`);

export const updateBasic = (
  axiosPrivate: AxiosInstance,
  data: Partial<UpdateBasic>
) => axiosPrivate.patch(`/user/me`, data);

export const inviteUsers = (axiosPrivate: AxiosInstance, data: InviteUser) =>
  axiosPrivate.post(`/user/invite`, data);

export const allUsers = (axiosPrivate: AxiosInstance) =>
  axiosPrivate.get<AllUsersResponse>(`/user/all`);
