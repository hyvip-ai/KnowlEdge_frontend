import { useForm } from 'react-hook-form';
import { ModalLayout } from '.';
import {
  CreateChatRoom as CreateChatRoomInterface,
  ModalProps,
} from '../../interfaces';
import { TextAreaInput, TextInput } from '../form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { PrimaryButton } from '../common';
import { removeEmptyValues, toastMessage } from '../../utils';
import { useCreateChatRoom } from '../../hooks/chatRoom.hooks';
import { useQueryClient } from '@tanstack/react-query';

const schema = yup.object().shape({
  name: yup.string().trim().required('Room name is required').defined(),
  description: yup.string().trim().optional(),
});

const defaultValues: CreateChatRoomInterface = {
  name: '',
  description: '',
};

export function CreateChatRoom(props: ModalProps) {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useCreateChatRoom();

  const onSubmit = async (formData: CreateChatRoomInterface) => {
    try {
      const payload = removeEmptyValues(formData);
      await mutateAsync(payload);
      queryClient.invalidateQueries(['chat-rooms']);
      toastMessage.success('Chat room created successfully');
      props.onClose();
    } catch (err) {
      toastMessage.error(err);
    }
  };
  return (
    <ModalLayout
      modalClosing={props.modalClosing}
      open={props.open}
      onClose={props.onClose}
    >
      <div className='bg-secondary shadow-md text-left'>
        <h1 className='text-xl text-primary font-semibold mb-6'>
          Create Chat Room
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <TextInput
              name='name'
              control={control}
              label='Room Name'
              placeholder='Enter room name'
            />
          </div>
          <div className='mb-6'>
            <TextAreaInput
              name='description'
              control={control}
              label='Description (Optional)'
              placeholder='Enter room description'
            />
          </div>
          <PrimaryButton
            type='submit'
            isDisabled={isLoading}
            isLoading={isLoading}
          >
            Create ChatRoom
          </PrimaryButton>
        </form>
      </div>
    </ModalLayout>
  );
}
