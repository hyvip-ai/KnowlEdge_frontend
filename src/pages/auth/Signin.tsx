import { useForm } from 'react-hook-form';
import { TextInput, PasswordInput } from '../../components/form';
import { PrimaryButton } from '../../components/common';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Signin as SigninInterface } from '../../interfaces';
import { toastMessage } from '../../utils';
import { useAuth, useRefreshToken, useSignin } from '../../hooks';
import { useCallback, useEffect, useState } from 'react';

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email('Must be a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .test(
      'minLength',
      'Password length must be greater than or equal to 6',
      (val) => (val ? val.length >= 6 : false)
    )
    .required('Password is required'),
});

const defaultValues: SigninInterface = {
  email: '',
  password: '',
};

export function Signin() {
  const [isLoading, setIsLoading] = useState(true);

  const { auth, setAuth } = useAuth();
  const refresh = useRefreshToken();
  const navigate = useNavigate();
  const { state } = useLocation();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { mutateAsync, isLoading: signinIn } = useSignin();

  const onSubmit = async (formData: SigninInterface) => {
    try {
      const response = await mutateAsync(formData);
      setAuth({
        accessToken: response.data.accessToken,
        role: response.data.role,
      });
      toastMessage.success('Signed in successfully');
      navigate(state?.from.pathname || '/dashboard');
    } catch (err) {
      toastMessage.error(err);
    }
  };

  const handleRefresh = useCallback(async () => {
    try {
      await refresh();
    } catch (err) {
      // Do Something
    } finally {
      setIsLoading(false);
    }
  }, [refresh]);

  useEffect(() => {
    if (auth.accessToken) {
      navigate(state?.from.pathname || '/dashboard');
    } else if (!auth.accessToken) {
      setIsLoading(true);
      handleRefresh();
    }
  }, [auth.accessToken, navigate, handleRefresh, state]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-6'>
        <TextInput
          control={control}
          name='email'
          label='Email Address'
          placeholder='Enter you email address'
        />
      </div>
      <div>
        <PasswordInput control={control} name='password' label='Password' />
      </div>
      <div className='py-6 flex justify-end'>
        <p className='text-theme cursor-pointer'>Forgot your password?</p>
      </div>
      <PrimaryButton
        isLoading={signinIn || isLoading}
        isDisabled={signinIn || isLoading}
        type='button'
      >
        Sign In
      </PrimaryButton>
      <div className='pt-6 mb-8 flex gap-2 justify-center'>
        <p className='text-center text-secondary'>Want to create an account?</p>{' '}
        <p
          className='text-center text-theme cursor-pointer'
          onClick={() => navigate(`/auth/signup`)}
        >
          Sign Up
        </p>
      </div>
    </form>
  );
}
