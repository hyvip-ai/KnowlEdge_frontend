import { DashboardCustomize } from '@mui/icons-material';
import { PrimaryButton, SecondaryButton } from '../../components/common';
import { useModal } from '../../hooks';
import { CreateChatRoom } from '../../components/modals';
import { serialize, toastMessage } from '../../utils';
import { useChatRooms } from '../../hooks/chatRoom.hooks';
import { Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function ChatRooms() {
  const modal = useModal();
  const navigate = useNavigate();

  const { data, isLoading } = useChatRooms();

  const handleCreateChatRoom = async () => {
    try {
      await modal({ Component: CreateChatRoom, errorMessage: '' });
    } catch (err) {
      toastMessage.error(err);
    }
  };
  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl text-primary font-bold '>Chat Rooms</h1>
        <div>
          <PrimaryButton type='button' onClick={handleCreateChatRoom}>
            <div className='flex items-center justify-between'>
              <DashboardCustomize fontSize='small' className='mr-1' />
              Add New
            </div>
          </PrimaryButton>
        </div>
      </div>
      <div>
        {isLoading ? (
          <div className='flex gap-4 flex-wrap justify-center items-center mt-4'>
            {Array(10)
              .fill(0)
              .map((_item, index) => (
                <div
                  key={index}
                  className='border border-border rounded bg-secondary'
                >
                  <Skeleton
                    sx={{ bgcolor: '#ffffff15' }}
                    variant='rectangular'
                    width={210}
                    height={118}
                    animation='wave'
                  />
                </div>
              ))}
          </div>
        ) : (
          <div className='flex gap-4 flex-wrap items-stretch mt-4'>
            {data?.data.length ? (
              <>
                {data.data.map((chatRoom) => (
                  <div
                    className='bg-secondary py-4 px-8 min-w-[360px] border border-border rounded'
                    key={chatRoom.id}
                  >
                    <div className='flex gap-4 items-center'>
                      <div className='h-15 w-15 rounded-full overflow-hidden'>
                        <img
                          src={`https://api.dicebear.com/7.x/thumbs/svg?${serialize(
                            { seed: chatRoom.name }
                          )}`}
                          alt='room-icon'
                          height={60}
                          width={60}
                        />
                      </div>
                      <div>
                        <h1 className='text-xl text-primary font-bold'>
                          {chatRoom.name}
                        </h1>
                        {chatRoom.description ? (
                          <p className='text-[16px] text-secondary font-medium mt-2'>
                            {chatRoom.description}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className='mt-6 flex justify-between items-center gap-4'>
                      <SecondaryButton
                        type='button'
                        onClick={() =>
                          navigate(`/chat-room/${chatRoom.id}/edit`)
                        }
                      >
                        Edit Room
                      </SecondaryButton>
                      <PrimaryButton
                        type='button'
                        onClick={() => navigate(`/chat-room/${chatRoom.id}`)}
                      >
                        Start Chatting
                      </PrimaryButton>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <h1 className='text-xl text-secondary font-bold'>
                No Chat Rooms Found!!
              </h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
