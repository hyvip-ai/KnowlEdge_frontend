import { PersonAddAlt } from '@mui/icons-material';
import { PrimaryButton } from '../../components/common';
import { useAllUsers, useBasic, useModal } from '../../hooks';
import { serialize, toastMessage } from '../../utils';
import { InviteUser } from '../../components/modals';
import { Skeleton } from '@mui/material';

export function Users() {
  const modal = useModal();

  const { data } = useBasic();
  const { data: users, isLoading } = useAllUsers();

  console.log(users);

  const handleInviteUser = async () => {
    try {
      await modal({ Component: InviteUser, errorMessage: '' });
      toastMessage.success('Invited users successfully');
    } catch (err) {
      toastMessage.error(err);
    }
  };

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl text-primary font-bold '>User Management</h1>
        <div>
          <PrimaryButton type='button' onClick={handleInviteUser}>
            <div className='flex items-center justify-between'>
              <PersonAddAlt fontSize='small' className='mr-1' />
              Add Users
            </div>
          </PrimaryButton>
        </div>
      </div>
      <div>
        {isLoading ? (
          <>
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
          </>
        ) : (
          <div className='flex gap-4 flex-wrap items-stretch mt-4'>
            {users?.data.map((user) => (
              <div
                key={user.id}
                className='bg-secondary border border-border rounded py-6 px-8 flex justify-between items-center gap-4'
              >
                <div>
                  <div className='h-15 w-15 rounded-full overflow-hidden'>
                    <img
                      src={`https://api.dicebear.com/7.x/lorelei-neutral/svg?${serialize(
                        { seed: user.name ? user.name : user.email }
                      )}`}
                      alt='room-icon'
                      height={60}
                      width={60}
                    />
                  </div>
                </div>
                <div>
                  <p className='text-base text-primary font-semibold mb-1'>
                    {user.name || 'N/A'}
                    {data?.data.email === user.email ? ' (You)' : null}
                  </p>
                  <p className='text-sm text-primary font-semibold'>
                    {user.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
