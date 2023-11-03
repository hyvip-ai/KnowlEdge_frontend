import { useForm } from 'react-hook-form';
import { useOrganization, useUpdateOrganization } from '../../hooks';
import { TextInput } from '../../components/form';
import { PrimaryButton } from '../../components/common';
import { UpdateOrganization } from '../../interfaces';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { removeEmptyValues, toastMessage } from '../../utils';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

const schema = yup.object().shape({
  openAIApiKey: yup.string().trim().optional(),
});

const defaultValues: UpdateOrganization = {
  openAIApiKey: '',
};

export function Settings() {
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const queryClient = useQueryClient();
  const { data, isFetching } = useOrganization();
  const { mutateAsync, isLoading } = useUpdateOrganization();

  const onSubmit = async (formData: any) => {
    try {
      const payload = removeEmptyValues(formData);
      await mutateAsync(payload);
      queryClient.invalidateQueries(['organization']);
      toastMessage.success('Updated organization details successfully');
    } catch (err) {
      toastMessage.error(err);
    }
  };

  useEffect(() => {
    if (data && !isFetching) {
      reset({
        openAIApiKey: data.data.openAIApiKey || '',
      });
    }
  }, [isFetching, data, reset]);

  return (
    <div className='p-4'>
      <div>
        <h1 className='text-2xl text-primary font-bold '>Settings</h1>
      </div>
      <form className='mt-6 mb-5' onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4'>
          <TextInput
            name='openAIApiKey'
            control={control}
            label='Open AI API key'
            placeholder='Enter Open AI API key'
          />
        </div>

        <div className='mb-4 cursor-not-allowed'>
          <p className='text-secondary border border-border rounded px-3 py-2 select-none'>
            {data?.data.name}
          </p>
        </div>
        <div className='mb-4 cursor-not-allowed'>
          <p className='text-secondary border border-border rounded px-3 py-2 select-none'>
            {data?.data.email || 'Organization Email'}
          </p>
        </div>

        <div className='mb-4 cursor-not-allowed'>
          <p className='text-secondary border border-border rounded px-3 py-2 select-none'>
            {data?.data.subscription || 'Subscription'}
          </p>
        </div>

        <div className='ml-auto w-[160px]'>
          <PrimaryButton
            type='submit'
            isDisabled={isFetching || isLoading}
            isLoading={isFetching || isLoading}
          >
            Update Settings
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}
