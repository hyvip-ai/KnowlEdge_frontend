import { useForm } from 'react-hook-form';
import { PasswordInput, TextInput } from '../../components/form';
import { PrimaryButton } from '../../components/common';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Signup as SignupInterface } from '../../interfaces';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  name: yup.string().trim().required('Name is required'),
  email: yup
    .string()
    .trim()
    .email('Must be a valid email address')
    .required('Email is required'),
  organizationName: yup.string().trim().required('Name is required'),
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
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit = (formData: SignupInterface) => {
    console.log(formData);
  };

  return (
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
      <PrimaryButton type='button'>Sign Up</PrimaryButton>
      <div className='pt-6 mb-8 flex gap-2 justify-center'>
        <p className='text-center text-secondary'>Already have an account??</p>{' '}
        <p
          className='text-center text-theme cursor-pointer'
          onClick={() => navigate(`/auth/signin`)}
        >
          Log In
        </p>
      </div>
    </form>
  );
}
