import { useNavigate } from 'react-router-dom';
import { toastMessage } from '../../utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ForgotPassword as ForgotPasswordInterface } from '../../interfaces';
import { TextInput } from '../../components/form';
import { PrimaryButton } from '../../components/common';
import { useForgotPassword } from '../../hooks';

const schema = yup.object({
  email: yup
    .string()
    .email('Email must be a valid')
    .required('Email is required'),
});

export function ForgotPassword() {
  const navigate = useNavigate();

  const { mutateAsync: forgotPassword, isLoading } = useForgotPassword();

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordInterface) => {
    try {
      await forgotPassword(data);
      reset();
      toastMessage.success('Mail sent successfully');
    } catch (err: any) {
      toastMessage.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <TextInput
          control={control}
          name='email'
          placeholder='Enter your email address'
          label='Email Address'
        />
      </div>

      <PrimaryButton type='submit' isLoading={isLoading} isDisabled={isLoading}>
        Send Reset Link
      </PrimaryButton>
      <div className='py-6 flex justify-center'>
        <p
          className='text-theme cursor-pointer'
          onClick={() => navigate('/auth/signin')}
        >
          Return to Signin?
        </p>
      </div>
    </form>
  );
}
