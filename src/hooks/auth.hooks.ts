import { useMutation } from '@tanstack/react-query';
import {
  ForgotPassword as ForgotPasswordInterface,
  SetResetPasswordWithToken,
  Signin as SigninInterface,
  Signup as SignupInterface,
} from '../interfaces';
import {
  forgotPassword,
  resetPassword,
  signin,
  signout,
  signup,
} from '../requests';
import useAxiosPrivate from './useAxiosPrivate.hook';

export const useSignup = () =>
  useMutation(async (data: SignupInterface) => {
    const res = await signup(data);
    return res.data;
  });

export const useSignin = () =>
  useMutation(async (data: SigninInterface) => {
    const res = await signin(data);
    return res.data;
  });

export const useForgotPassword = () => {
  const axiosPrivate = useAxiosPrivate();
  return useMutation(async (data: ForgotPasswordInterface) => {
    const res = await forgotPassword(axiosPrivate, data);
    return res.data;
  });
};

export const useResetPassword = () => {
  const axiosPrivate = useAxiosPrivate();
  return useMutation(async (data: SetResetPasswordWithToken) => {
    const res = await resetPassword(axiosPrivate, data);
    return res.data;
  });
};

export const useSignout = () => {
  const axiosPrivate = useAxiosPrivate();
  return useMutation(async () => {
    const res = await signout(axiosPrivate);
    return res.data;
  });
};
