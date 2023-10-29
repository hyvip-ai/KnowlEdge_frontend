import { AppBar, IconButton, Toolbar } from '@mui/material';
import { SpaceDashboardOutlined } from '@mui/icons-material';
import { DRAWER_WIDTH } from '../../utils';

interface PropTypes {
  handleToggleOpen: () => void;
}

export function DashboardHeader(props: PropTypes) {
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
        height: '68px',
      }}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={props.handleToggleOpen}
          edge='start'
          sx={{
            mr: 2,
            display: { sm: 'none' },
            zIndex: 5000,
            position: 'sticky',
          }}
        >
          <SpaceDashboardOutlined />
        </IconButton>
        <div className='w-full flex justify-end'>
          <img
            src='https://api.dicebear.com/7.x/lorelei/svg?seed=member%member'
            height={40}
            width={40}
            className='rounded-full bg-white cursor-pointer'
          />
        </div>
      </Toolbar>
    </AppBar>
  );
}