import { Collapse, List, ListItemButton, ListItemIcon } from '@mui/material';
import {
  MailLockOutlined,
  ExpandLess,
  ExpandMore,
  StarBorder,
} from '@mui/icons-material';
import { useState } from 'react';

export function DashboardSidebarListItem() {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <MailLockOutlined className='text-secondary' />
        </ListItemIcon>
        <p className='text-primary flex w-full'>Inbox</p>
        {open ? (
          <ExpandLess className='text-secondary' />
        ) : (
          <ExpandMore className='text-secondary' />
        )}
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder className='text-secondary' />
            </ListItemIcon>
            <p className='text-primary'>Starred</p>
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
}
