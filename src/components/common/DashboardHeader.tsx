import { AppBar, Toolbar } from '@mui/material';
import { DRAWER_WIDTH } from '../../utils';
import { Popover } from '@headlessui/react';

export function DashboardHeader() {
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
      }}
    >
      <Toolbar>
        <div className='w-full flex justify-end'>
          <Popover>
            <Popover.Button className='outline-none '>
              <img
                src='https://api.dicebear.com/7.x/lorelei/svg?seed=member%member'
                height={40}
                width={40}
                className='rounded-full bg-white cursor-pointer'
              />
            </Popover.Button>
            <Popover.Panel className='absolute z-10 bg-secondary rounded-lg px-4 py-2 right-4 top-[102%] w-56 flex flex-col items-center border border-border'>
              <p className='mb-2'>
                Hello, <b>Rajat Mondal</b>
              </p>
              <p>The Log out Button will go here</p>
            </Popover.Panel>
          </Popover>
        </div>
      </Toolbar>
    </AppBar>
  );
}
