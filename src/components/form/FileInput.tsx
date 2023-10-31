import { UploadFile } from '@mui/icons-material';
import { ChangeEvent, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { toastMessage } from '../../utils';
import { useUploadFile } from '../../hooks';
import { Loader } from '../common';
import { useQueryClient } from '@tanstack/react-query';

export function FileInput() {
  const { id } = useParams();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useUploadFile();

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const [file] = (e.target! as HTMLInputElement).files!;
    if (!file) {
      toastMessage.error('File not found');
      return;
    }

    const fd = new FormData();
    fd.append('file', file);

    try {
      await mutateAsync({ data: fd, chatRoomId: id! });
      queryClient.invalidateQueries(['files-by-chat-room', id]);
      toastMessage.success('File uploaded successfully');
    } catch (err) {
      toastMessage.error(err);
    } finally {
      if (fileRef.current) {
        fileRef.current.value = '';
      }
    }
  };
  return (
    <>
      <div
        className={`flex justify-center items-center bg-secondary h-[200px] w-[200px] rounded border border-border hover:shadow-lg transition-all ${
          isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
        onClick={() => {
          if (!isLoading) {
            fileRef.current?.click();
          }
        }}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <UploadFile className='text-primary' sx={{ fontSize: '56px' }} />
        )}
      </div>
      <input
        type='file'
        onChange={handleFileUpload}
        ref={fileRef}
        className='hidden'
      />
    </>
  );
}
