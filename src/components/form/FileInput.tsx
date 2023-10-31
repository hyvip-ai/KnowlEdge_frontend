import { UploadFile } from '@mui/icons-material';
import { ChangeEvent, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { toastMessage } from '../../utils';
import { useUploadFile } from '../../hooks';
import { Loader } from '../common';
import { useQueryClient } from '@tanstack/react-query';

interface PropTypes {
  disabled: boolean;
}

export function FileInput(props: PropTypes) {
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
          isLoading || props.disabled ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
        onClick={() => {
          if (!isLoading && !props.disabled) {
            fileRef.current?.click();
          }
        }}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <div className='flex flex-col justify-center items-center gap-2'>
            <UploadFile className='text-primary' sx={{ fontSize: '56px' }} />
            <p className='text-primary font-semibold text-[16px]'>
              Upload File
            </p>
          </div>
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
