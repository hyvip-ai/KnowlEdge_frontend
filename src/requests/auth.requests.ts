import { AxiosInstance } from 'axios';
import { axiosPublic } from '../api';
import {
  ForgotPassword as ForgotPasswordInterface,
  SetResetPasswordWithToken,
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

export const forgotPassword = (
  axiosPrivate: AxiosInstance,
  data: ForgotPasswordInterface
) => axiosPrivate.post('/auth/forgot-password', data);

export const resetPassword = (
  axiosPrivate: AxiosInstance,
  data: SetResetPasswordWithToken
) => axiosPrivate.post('/auth/reset-password', data);

export const signout = (axiosPrivate: AxiosInstance) =>
  axiosPrivate.post(
    '/auth/signout',
    {},
    {
      withCredentials: true,
    }
  );
