import { useForm } from 'react-hook-form';
import { useOrganization } from '../../hooks';
import { TextInput } from '../../components/form';
import { PrimaryButton } from '../../components/common';
import { UpdateOrganization } from '../../interfaces';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { removeEmptyValues, toastMessage } from '../../utils';

const schema = yup.object().shape({
  openAIAPiKey: yup.string().trim().optional(),
});

const defaultValues: UpdateOrganization = {
  openAIAPiKey: '',
};

export function Settings() {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const { data, isFetching } = useOrganization();

  const onSubmit = async (formData: any) => {
    try {
      const payload = removeEmptyValues(formData);
      console.log(payload);
    } catch (err) {
      toastMessage.error(err);
    }
  };
  return (
    <div className='p-4'>
      <div>
        <h1 className='text-2xl text-primary font-bold '>Settings</h1>
      </div>
      <form className='mt-6 mb-5' onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4'>
          <TextInput
            name='openAIAPiKey'
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
            isDisabled={isFetching}
            isLoading={isFetching}
          >
            Edit ChatRoom
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}
