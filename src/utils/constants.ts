import { Dashboard, Forum, Groups } from '@mui/icons-material';
import { Link } from '../interfaces';

export const DRAWER_WIDTH = 280;
export const APP_BAR_MOBILE = 64;
export const APP_BAR_DESKTOP = 92;

export enum Roles {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
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
    link: `/room`,
    Icon: Forum,
    show: true,
  },
  {
    name: 'Member Management',
    link: `/member-management`,
    Icon: Groups,
    show: true,
  },
];
