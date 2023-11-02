import { useParams } from 'react-router-dom';
import { useFilesByChatRoom } from '../../hooks';
import { Skeleton } from '@mui/material';
import { File } from '../common';

export function Files() {
  const { id } = useParams();
  const { data: allfiles, isLoading } = useFilesByChatRoom(id!, !!id);

  return (
    <div className='flex items-center mt-6 gap-4 flex-wrap'>
      {isLoading ? (
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
          {allfiles?.data
            .filter((file) => file.name !== '.emptyFolderPlaceholder')
            .map((file) => (
              <File file={file} key={file.id} hideDelete />
            ))}
        </>
      )}
    </div>
  );
}
