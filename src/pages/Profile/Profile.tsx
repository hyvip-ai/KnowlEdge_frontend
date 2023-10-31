import { useForm } from 'react-hook-form';
import { TextInput } from '../../components/form';
import { useBasic, useUpdateBasic } from '../../hooks';
import { UpdateBasic } from '../../interfaces';
import * as yup from 'yup';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { PrimaryButton } from '../../components/common';
import { removeEmptyValues, toastMessage } from '../../utils';
import { useQueryClient } from '@tanstack/react-query';

const schema = yup.object().shape({
  name: yup.string().trim().optional(),
});

const defaultValues: UpdateBasic = {
  name: '',
};

export function Profile() {
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const queryClient = useQueryClient();
  const { data, isFetching } = useBasic();
  const { mutateAsync, isLoading } = useUpdateBasic();

  const onSubmit = async (formData: UpdateBasic) => {
    try {
      const payload = removeEmptyValues(formData);
      await mutateAsync(payload);
      queryClient.invalidateQueries(['user-basic-profile']);
      toastMessage.success('Profile updated successfully');
    } catch (err) {
      toastMessage.error(err);
    }
  };

  useEffect(() => {
    if (!isFetching && data) {
      reset({ name: data.data.name });
    }
  }, [reset, isFetching, data]);

  return (
    <div className='p-4'>
      <div>
        <h1 className='text-2xl text-primary font-bold '>Profile</h1>
      </div>
      <div className='mt-4'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <TextInput
              control={control}
              name='name'
              label='Name'
              placeholder='Enter Your Name'
            />
          </div>
          <div className='mb-4 cursor-not-allowed'>
            <p className='text-secondary select-none border border-border rounded px-3 py-2'>
              {data?.data.email || 'Email'}
            </p>
          </div>
          <div className='mb-4 cursor-not-allowed'>
            <p className='text-secondary border border-border rounded px-3 py-2 select-none'>
              {data?.data.organization.name || 'Organization Name'}
            </p>
          </div>
          <div className='ml-auto w-[150px]'>
            <PrimaryButton
              type='submit'
              isLoading={isFetching || isLoading}
              isDisabled={isFetching || isLoading}
            >
              Update
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
}
