import { AxiosInstance } from 'axios';
import { axiosPublic } from '../api';
import {
  Signin as SigninInterface,
  Signup as SignupInterface,
} from '../interfaces';
import { SigninResponse } from '../model';

export const signup = (data: SignupInterface) =>
  axiosPublic.post('/auth/signup', data);

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
