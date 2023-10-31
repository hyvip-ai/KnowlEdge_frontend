import { PropTypes } from '@mui/material';
import { ChatRoomStatus } from '../../utils';

interface PropTypes {
  status: ChatRoomStatus;
}

export function Badge(props: PropTypes) {
  return props.status === ChatRoomStatus.PENDING ? (
    <div className='border border-yellow-500 bg-yellow-500 bg-opacity-5 px-6 py-1 rounded flex items-center justify-center gap-2'>
      <div className='h-[8px] w-[8px] bg-yellow-500 rounded-full'></div>
      <p className='text-yellow-500 font-semibold'>Pending</p>
    </div>
  ) : (
    <div className='border border-green-700 bg-green-600 bg-opacity-5 px-6 py-1 rounded flex items-center justify-center gap-2'>
      <div className='h-[8px] w-[8px] bg-green-700 rounded-full'></div>
      <p className='text-green-700 font-semibold'>Ready</p>
    </div>
  );
}
