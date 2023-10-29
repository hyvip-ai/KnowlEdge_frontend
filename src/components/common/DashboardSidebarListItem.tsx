import { ListItemButton, ListItemIcon } from '@mui/material';
import { Link } from '../../interfaces';

interface PropTypes {
  link: Link;
}

export function DashboardSidebarListItem(props: PropTypes) {
  const { Icon, link, name } = props.link;
  return (
    <>
      <ListItemButton
        TouchRippleProps={{ color: 'red' }}
        onClick={() => {
          console.log(link);
        }}
        sx={{
          ':hover': {
            backgroundColor: '#262736',
          },
          backgroundColor: 'transparent',
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
