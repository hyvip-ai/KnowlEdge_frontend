import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { CreateChatRoom as CreateChatRoomInterface } from '../../interfaces';
import { FileInput, TextAreaInput, TextInput } from '../../components/form';
import { Badge, File, PrimaryButton } from '../../components/common';
import { useChatRoom, useEditChatRoom, useFilesByChatRoom } from '../../hooks';
import { useParams } from 'react-router-dom';
import { ChatRoomStatus, removeEmptyValues, toastMessage } from '../../utils';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Divider, Skeleton, Tooltip } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';

const schema = yup.object().shape({
  name: yup.string().trim().required('Room name is required').defined(),
  description: yup.string().trim().optional(),
});

const defaultValues: CreateChatRoomInterface = {
  name: '',
  description: '',
};

export function EditChatRoom() {
  const { id } = useParams();

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const queryClient = useQueryClient();
  const { data, isFetching } = useChatRoom(id!, !!id);
  const { mutateAsync, isLoading: editingChatRoom } = useEditChatRoom();
  const { data: files, isLoading: loadingFiles } = useFilesByChatRoom(
    id!,
    !!id
  );

  const onSubmit = async (formData: CreateChatRoomInterface) => {
    try {
      const payload = removeEmptyValues(formData);
      await mutateAsync({ data: payload, chatRoomId: id! });
      queryClient.invalidateQueries(['chat-room', id]);
      toastMessage.success('Chat Room updated successfully');
    } catch (err) {
      toastMessage.error(err);
    }
  };

  useEffect(() => {
    if (data && !isFetching) {
      reset({
        name: data.data.name,
        description: data.data.description,
      });
    }
  }, [data, isFetching, reset]);

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl text-primary font-bold '>Edit Chat Room</h1>
        <Badge status={data?.data.status || ChatRoomStatus.PENDING} />
      </div>
      <form className='mt-6 mb-5' onSubmit={handleSubmit(onSubmit)}>
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
        <div className='ml-auto w-[160px]'>
          <PrimaryButton
            type='submit'
            isDisabled={isFetching || editingChatRoom}
            isLoading={isFetching || editingChatRoom}
          >
            Edit ChatRoom
          </PrimaryButton>
        </div>
      </form>
      <Divider className='bg-secondary h-[2px]' />
      <div className='flex mt-5 justify-between items-center'>
        <div className='flex justify-start gap-2 items-center'>
          <h1 className='text-2xl text-primary font-bold '>Files</h1>
          <Tooltip title='Currently you can only upload a pdf file, and size limit is 5MB'>
            <InfoOutlined className='text-secondary cursor-pointer' />
          </Tooltip>
        </div>
      </div>
      <div className='flex items-center mt-6 gap-4 flex-wrap'>
        <FileInput />
        {loadingFiles ? (
          <>
            {Array(4)
              .fill(0)
              .map((_item, index) => (
                <div
                  key={index}
                  className='border border-border rounded bg-secondary overflow-hidden'
                >
                  <Skeleton
                    sx={{ bgcolor: '#ffffff15' }}
                    variant='rectangular'
                    width={200}
                    height={200}
                    animation='wave'
                  />
                </div>
              ))}
          </>
        ) : (
          <>
            {files?.data
              .filter((file) => file.name !== '.emptyFolderPlaceholder')
              .map((file) => (
                <File file={file} key={file.id} />
              ))}
          </>
        )}
      </div>
    </div>
  );
}
