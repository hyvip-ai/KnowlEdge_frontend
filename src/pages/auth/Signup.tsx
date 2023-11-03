import { useForm } from 'react-hook-form';
import { PasswordInput, TextInput } from '../../components/form';
import { PrimaryButton } from '../../components/common';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Signup as SignupInterface } from '../../interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSignup } from '../../hooks';
import { toastMessage } from '../../utils';
import Lottie from 'react-lottie';
import confetti from '../../lotties/confetti.json';
import { useMemo, useState } from 'react';

const schema = yup.object().shape({
  name: yup.string().trim().required('Name is required'),
  email: yup
    .string()
    .trim()
    .email('Must be a valid email address')
    .required('Email is required'),
  organizationName: yup
    .string()
    .trim()
    .required('Organization name is required'),
  password: yup
    .string()
    .test(
      'minLength',
      'Password length must be greater than or equal to 6',
      (val) => (val ? val.length >= 6 : false)
    )
    .required('Password is required'),
});

const defaultValues: SignupInterface = {
  name: '',
  email: '',
  organizationName: '',
  password: '',
};

export function Signup() {
  const [playLottie, setPlayLottie] = useState(false);
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const defaultOptions = useMemo(
    () => ({
      loop: false,
      autoplay: playLottie,
      animationData: confetti,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    }),
    [playLottie]
  );

  const { mutateAsync, isLoading } = useSignup();

  const onSubmit = async (formData: SignupInterface) => {
    try {
      await mutateAsync(formData);
      toastMessage.success('Signed up successfully');
      setPlayLottie(true);
      reset();
      setTimeout(() => {
        navigate(`/auth/signin`);
      }, 2500);
    } catch (err) {
      toastMessage.error(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-6'>
          <TextInput control={control} name='name' label='Name' />
        </div>
        <div className='mb-6'>
          <TextInput control={control} name='email' label='Email Address' />
        </div>
        <div className='mb-6'>
          <TextInput
            control={control}
            name='organizationName'
            label='Organization Name'
          />
        </div>
        <div className='mb-6'>
          <PasswordInput control={control} name='password' label='Password' />
        </div>
        <PrimaryButton
          isLoading={isLoading}
          isDisabled={isLoading}
          type='button'
        >
          Sign Up
        </PrimaryButton>
        <div className='pt-6 mb-8 flex gap-2 justify-center'>
          <p className='text-center text-secondary'>Already have an account?</p>{' '}
          <p
            className='text-center text-theme cursor-pointer'
            onClick={() => navigate(`/auth/signin`)}
          >
            Log In
          </p>
        </div>
      </form>
      {playLottie ? (
        <div className='absolute bottom-0 left-0 right-0 !cursor-default pointer-events-none'>
          <Lottie
            options={defaultOptions}
            style={{ width: '70%', cursor: 'default' }}
            isClickToPauseDisabled
          />
        </div>
      ) : null}
    </>
  );
}
