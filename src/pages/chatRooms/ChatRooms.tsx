import { DashboardCustomize } from '@mui/icons-material';
import { PrimaryButton, SecondaryButton } from '../../components/common';
import { useAuth, useModal } from '../../hooks';
import { CreateChatRoom } from '../../components/modals';
import { ChatRoomStatus, Roles, serialize, toastMessage } from '../../utils';
import { useChatRooms } from '../../hooks/chatRoom.hooks';
import { Skeleton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function ChatRooms() {
  const modal = useModal();
  const navigate = useNavigate();

  const { auth } = useAuth();

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
        {auth.role === Roles.ADMIN ? (
          <div>
            <PrimaryButton type='button' onClick={handleCreateChatRoom}>
              <div className='flex items-center justify-between'>
                <DashboardCustomize fontSize='small' className='mr-1' />
                Add New
              </div>
            </PrimaryButton>
          </div>
        ) : null}
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
                    className='bg-secondary overflow-hidden relative py-6 px-8 min-w-[360px] border border-border rounded flex flex-col'
                    key={chatRoom.id}
                  >
                    <Tooltip
                      title={
                        chatRoom.status === ChatRoomStatus.READY
                          ? 'You can start chatting right away'
                          : 'Upload files and load them to start chatting'
                      }
                    >
                      <div
                        className={`cursor-pointer absolute top-0 right-0 translate-x-[44%] translate-y-[-56%] rounded-full w-[150px] h-[150px] ${
                          chatRoom.status === ChatRoomStatus.READY
                            ? 'bg-green-500'
                            : 'bg-yellow-500'
                        }`}
                      ></div>
                    </Tooltip>
                    <div>
                      <div className='flex gap-4 items-center justify-center mb-4'>
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
                      </div>
                      <div className='text-center'>
                        <h1 className='text-xl text-primary font-bold'>
                          {chatRoom.name}
                        </h1>
                        <p className='text-[16px] text-secondary font-medium mt-2'>
                          {chatRoom.description || 'No Description Available'}
                        </p>
                      </div>
                      <div className='mt-6 flex justify-between items-center gap-4'>
                        {auth.role === Roles.ADMIN ? (
                          <SecondaryButton
                            type='button'
                            onClick={() =>
                              navigate(`/chat-room/${chatRoom.id}/edit`)
                            }
                          >
                            Edit Room
                          </SecondaryButton>
                        ) : null}
                        <PrimaryButton
                          type='button'
                          onClick={() => {
                            if (chatRoom.status === ChatRoomStatus.READY) {
                              navigate(`/chat-room/${chatRoom.id}`);
                              return;
                            }
                            toastMessage.error(
                              'Please upload files and load them to start chatting'
                            );
                          }}
                        >
                          Start Chatting
                        </PrimaryButton>
                      </div>
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
