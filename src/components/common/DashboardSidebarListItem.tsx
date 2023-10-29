import { ListItemButton, ListItemIcon } from '@mui/material';
import { Link } from '../../interfaces';
import { useLocation, useNavigate } from 'react-router-dom';

interface PropTypes {
  link: Link;
}

export function DashboardSidebarListItem(props: PropTypes) {
  const { Icon, link, name } = props.link;

  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      <ListItemButton
        TouchRippleProps={{ color: 'red' }}
        onClick={() => {
          navigate(link);
        }}
        sx={{
          ':hover': {
            backgroundColor: '#262736',
          },
          backgroundColor: pathname === link ? '#262736' : 'transparent',
          borderRadius: '4px',
        }}
        className='group'
        disableRipple
      >
        <ListItemIcon>
          <Icon className='text-secondary group-hover:text-primary' />
        </ListItemIcon>
        <p className='text-primary flex w-full'>{name}</p>
      </ListItemButton>
    </>
  );
}
