import { Box, Divider, Drawer, IconButton, List } from '@mui/material';
import { ReactNode, useState } from 'react';
import { DRAWER_WIDTH, DashboardSidebarSections } from '../utils';
import {
  DashboardHeader,
  DashboardSidebarListItem,
} from '../components/common';
import { SpaceDashboardOutlined } from '@mui/icons-material';

interface PropTypes {
  children: ReactNode;
}

export function DashboardSidebarLayout(props: PropTypes) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className='flex'>
      <Box
        sx={{ display: { xs: 'block', sm: 'none' } }}
        className='px-4 py-2 absolute z-[9999]'
      >
        <IconButton
          disableRipple
          color='inherit'
          aria-label='close drawer'
          onClick={handleDrawerToggle}
          edge='start'
        >
          <SpaceDashboardOutlined className='text-primary' />
        </IconButton>
      </Box>
      <DashboardHeader />
      <Box
        component='nav'
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
        aria-label='dashboard links'
      >
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              background: '#191A23',
              borderRightColor: '#2c2d3c',
            },
          }}
        >
          <div className='px-4 py-2 opacity-0'>
            <IconButton color='inherit' aria-label='close drawer' edge='start'>
              <SpaceDashboardOutlined className='text-primary' />
            </IconButton>
          </div>

          <div className='px-4 pt-2 pb-[17.5px] pl-8 border-b border-border'>
            <img src='/logoWithName.svg' width={120} />
          </div>
          <Divider />
          <div className='px-4 py-2 flex flex-col justify-between h-screen'>
            <div className='mt-2'>
              <List>
                {DashboardSidebarSections.map((link) => (
                  <DashboardSidebarListItem key={link.name} link={link} />
                ))}
              </List>
            </div>
          </div>
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              background: '#191A23',
              borderRightColor: '#2c2d3c',
            },
          }}
          open
        >
          <div className='px-4 py-4 pl-8 border-b border-border'>
            <img src='/logoWithName.svg' width={120} />
          </div>
          <div className='px-4 py-2 flex flex-col justify-between h-screen'>
            <div className='mt-2'>
              <List>
                {DashboardSidebarSections.map((link) => (
                  <DashboardSidebarListItem key={link.name} link={link} />
                ))}
              </List>
            </div>
          </div>
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          height: `calc(100vh - 56px)`,
          marginTop: '56px',
          overflow: 'auto',
          backgroundColor: '#191A23',
        }}
      >
        {props.children}
      </Box>
    </div>
  );
}
