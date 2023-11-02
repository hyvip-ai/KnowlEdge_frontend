import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSetBasic } from '../../hooks';
import * as yup from 'yup';
import { SetBasic } from '../../interfaces';
import { toastMessage } from '../../utils';
import { PasswordInput, TextInput } from '../../components/form';
import { PrimaryButton } from '../../components/common';

const schema = yup.object({
  name: yup.string().trim().required('Name is required'),
  password: yup
    .string()
    .trim()
    .test(
      'minLength',
      'Password length must be greater than or equal to 6',
      (val) => (val ? val.length >= 6 : false)
    )
    .required('Password is required'),
});

const defaultValues: SetBasic = {
  name: '',
  password: '',
};

export function AcceptInvite() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { mutateAsync, isLoading } = useSetBasic();

  const onSubmit = async (formData: SetBasic) => {
    try {
      const token = searchParams.get('token');
      if (token) {
        await mutateAsync({ ...formData, token });
        toastMessage.success('Basic profile updated successfully');
        reset();
        navigate(`/auth/signin`);
        return;
      }
      throw new Error('Token not available');
    } catch (err) {
      toastMessage.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <TextInput
          control={control}
          name='name'
          placeholder='Enter your name'
          label='Name'
        />
      </div>
      <div className='mb-4'>
        <PasswordInput
          control={control}
          name='password'
          placeholder='Enter your password'
          label='Password'
        />
      </div>

      <PrimaryButton type='submit' isLoading={isLoading} isDisabled={isLoading}>
        Update Basic Profile
      </PrimaryButton>
    </form>
  );
}
