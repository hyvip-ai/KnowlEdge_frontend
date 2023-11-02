import {
  DeleteOutline,
  FileCopyOutlined,
  RemoveRedEyeOutlined,
} from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { useDeleteFile, useSignedURL } from '../../hooks';
import { useParams } from 'react-router-dom';
import { toastMessage } from '../../utils';
import { Loader } from '.';
import { useQueryClient } from '@tanstack/react-query';

interface PropTypes {
  file: { name: string; id: string };
  hideDelete?: boolean;
}

export function File(props: PropTypes) {
  const { id } = useParams();

  const queryClient = useQueryClient();
  const { mutateAsync: signedURL, isLoading: gettingSignedURL } =
    useSignedURL();
  const { mutateAsync: deleteFile, isLoading: deletingFile } = useDeleteFile();

  const handleViewFile = async (fileName: string) => {
    try {
      const data = await signedURL({ fileName, chatRoomId: id! });
      window.open(data.data.signedUrl);
    } catch (err) {
      toastMessage.error(err);
    }
  };

  const handleDeleteFile = async (fileName: string) => {
    try {
      await deleteFile({ fileName, chatRoomId: id! });
      queryClient.invalidateQueries(['files-by-chat-room', id]);
      toastMessage.success('File deleted successfully');
    } catch (err) {
      toastMessage.error(err);
    }
  };

  return (
    <div className='border border-border rounded bg-secondary overflow-hidden h-[200px] p-4 w-[200px] flex justify-center items-center'>
      <div className='w-full text-center'>
        <FileCopyOutlined className='text-primary' sx={{ fontSize: '40px' }} />
        <div>
          <h1 className='text-secondary text-[14px] font-semibold break-words mt-2'>
            {props.file.name
              .split('_')
              .filter((_item, index) => index !== 0)
              .join('_')}
          </h1>
        </div>
        <div className='mt-4 flex justify-center items-center gap-4'>
          {props.hideDelete ? null : (
            <Tooltip title='Delete the file'>
              <button
                onClick={() => handleDeleteFile(props.file.name)}
                disabled={deletingFile}
                className='p-2 rounded-full border border-border bg-primary flex justify-center items-center'
              >
                {deletingFile ? (
                  <Loader />
                ) : (
                  <DeleteOutline className='text-primary' fontSize='small' />
                )}
              </button>
            </Tooltip>
          )}
          <Tooltip title='Open the file in new tab'>
            <button
              disabled={gettingSignedURL}
              onClick={() => handleViewFile(props.file.name)}
              className='p-2 rounded-full border border-border bg-primary flex justify-center items-center'
            >
              {gettingSignedURL ? (
                <Loader />
              ) : (
                <RemoveRedEyeOutlined
                  className='text-primary'
                  fontSize='small'
                />
              )}
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
