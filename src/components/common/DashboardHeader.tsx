import { AppBar, Toolbar } from '@mui/material';
import { DRAWER_WIDTH, Roles, serialize, toastMessage } from '../../utils';
import { Popover } from '@headlessui/react';
import { SecondaryButton } from '.';
import { Logout } from '@mui/icons-material';
import { useAuth, useSignout, useBasic } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

export function DashboardHeader() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const { data } = useBasic();
  const { mutateAsync: signout, isLoading } = useSignout();

  const handleSignout = async () => {
    try {
      await signout();
      setAuth({ accessToken: '', role: Roles.NONE });
      navigate('/auth/signin');
    } catch (err) {
      toastMessage.error(err);
    }
  };

  const seed = useMemo(() => {
    if (data?.data.name) {
      return serialize({ seed: data.data.name });
    }
    return serialize({ seed: 'user user' });
  }, [data]);

  return (
    <AppBar
      position='fixed'
      sx={{
        width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
        ml: { sm: `${DRAWER_WIDTH}px` },
        background: '#191A23',
        boxShadow: 'none',
        borderBottomColor: '#2c2d3c',
        borderBottomWidth: '1px',
        height: '64.8px',
      }}
    >
      <Toolbar>
        <div className='w-full flex justify-end'>
          <Popover>
            <Popover.Button className='outline-none '>
              <img
                src={`https://api.dicebear.com/7.x/lorelei-neutral/svg?${seed}`}
                height={40}
                width={40}
                className='rounded-full bg-white cursor-pointer'
              />
            </Popover.Button>
            <Popover.Panel className='absolute z-10 bg-secondary rounded-lg p-4 right-4 top-[102%] w-56 flex flex-col items-center border border-border'>
              <p className='mb-4'>
                Hello, <b>Rajat Mondal</b>
              </p>
              <SecondaryButton
                isLoading={isLoading}
                isDisabled={isLoading}
                type='button'
                onClick={handleSignout}
              >
                <div className='flex items-center justify-center gap-1'>
                  Signout <Logout fontSize='small' />
                </div>
              </SecondaryButton>
            </Popover.Panel>
          </Popover>
        </div>
      </Toolbar>
    </AppBar>
  );
}
