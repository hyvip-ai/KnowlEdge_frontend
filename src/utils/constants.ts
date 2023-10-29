import {
  Dashboard,
  Engineering,
  Forum,
  Groups,
  SettingsSuggest,
} from '@mui/icons-material';
import { Link } from '../interfaces';

export const DRAWER_WIDTH = 280;
export const APP_BAR_MOBILE = 64;
export const APP_BAR_DESKTOP = 92;

export enum Roles {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
  NONE = '',
}

export const DashboardSidebarSections: Link[] = [
  {
    name: 'Dashboard',
    link: `/dashboard`,
    Icon: Dashboard,
    show: true,
  },
  {
    name: 'Chat Rooms',
    link: `/chat-room`,
    Icon: Forum,
    show: true,
  },
  {
    name: 'Members',
    link: `/member-management`,
    Icon: Groups,
    show: true,
  },
  {
    name: 'Profile',
    link: `/profile`,
    Icon: Engineering,
    show: true,
  },
  {
    name: 'Settings',
    link: `/settings`,
    Icon: SettingsSuggest,
    show: true,
  },
];
