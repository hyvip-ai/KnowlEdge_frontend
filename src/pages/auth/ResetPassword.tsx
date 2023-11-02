import { useForm } from 'react-hook-form';
import { PrimaryButton } from '../../components/common';
import { PasswordInput } from '../../components/form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toastMessage } from '../../utils';
import { SetResetPassword } from '../../interfaces';
import { useResetPassword } from '../../hooks';

const schema = yup.object({
  password: yup
    .string()
    .trim()
    .test(
      'minLength',
      'Password length must be greater than or equal to 6',
      (val) => (val ? val.length >= 6 : false)
    )
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords does not match')
    .required(),
});

const defaultValues = {
  password: '',
  passwordConfirmation: '',
};

export function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { mutateAsync, isLoading } = useResetPassword();

  const onSubmit = async (data: SetResetPassword) => {
    try {
      console.log(data);
      const token = searchParams.get('token');
      if (token) {
        await mutateAsync({
          ...data,
          token,
        });
        toastMessage.success('Password reset successfully');
        reset();
        navigate('/auth/signin');
        return;
      }
      throw new Error('Token not available');
    } catch (error: any) {
      toastMessage.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <PasswordInput
          control={control}
          name='password'
          placeholder='Enter your password'
          label='Password'
        />
      </div>
      <div className='mb-4'>
        <PasswordInput
          control={control}
          name='passwordConfirmation'
          placeholder='Enter your password again'
          label='Password Confirmation'
        />
      </div>

      <PrimaryButton type='submit' isLoading={isLoading} isDisabled={isLoading}>
        Reset Password
      </PrimaryButton>
    </form>
  );
}
