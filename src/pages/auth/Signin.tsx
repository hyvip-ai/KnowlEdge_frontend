import { useForm } from 'react-hook-form';
import { TextInput, PasswordInput } from '../../components/form';
import { PrimaryButton } from '../../components/common';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Signin as SigninInterface } from '../../interfaces';

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
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit = (formData: SigninInterface) => {
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-6'>
        <TextInput control={control} name='email' label='Email Address' />
      </div>
      <div>
        <PasswordInput control={control} name='password' label='Password' />
      </div>
      <div className='py-6 flex justify-end'>
        <p className='text-theme cursor-pointer'>Forgot your password?</p>
      </div>
      <PrimaryButton type='button'>Sign In</PrimaryButton>
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