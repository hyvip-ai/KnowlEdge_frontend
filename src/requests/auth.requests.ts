import { AxiosInstance } from 'axios';
import { axiosPublic } from '../api';
import {
  Signin as SigninInterface,
  Signup as SignupInterface,
} from '../interfaces';

export const signup = (data: SignupInterface) =>
  axiosPublic.post<SignupResponse>('/auth/signup', data);

export const signin = (data: SigninInterface) =>
  axiosPublic.post<SigninResponse>('/auth/signin', data, {
    withCredentials: true,
  });

export const signout = (axiosPrivate: AxiosInstance) =>
  axiosPrivate.post(
    '/auth/signout',
    {},
    {
      withCredentials: true,
    }
  );
