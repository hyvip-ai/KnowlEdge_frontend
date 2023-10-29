import {
  AutoAwesome,
  BookmarkAdd,
  BusinessCenter,
  Dashboard,
  Diversity3,
  PersonOutline,
  Search,
  TurnedInNot,
} from '@mui/icons-material';
import { DashboardLinkSection } from '../interfaces/link.interface';

export const DRAWER_WIDTH = 280;
export const APP_BAR_MOBILE = 64;
export const APP_BAR_DESKTOP = 92;

export enum Roles {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  NONE = '',
}

export const DashboardSidebarSections: DashboardLinkSection[] = [
  {
    name: 'GENERAL',
    items: [
      {
        name: 'Dashboard',
        link: `/dashboard`,
        Icon: Dashboard,
        show: true,
      },
      {
        name: 'Company Listing',
        link: `/company-listing/list`,
        Icon: BusinessCenter,
        show: true,
      },
      {
        name: 'Explore',
        link: `/explore`,
        Icon: Search,
        show: true,
      },
      {
        name: 'Alfred -SaaS',
        link: `/alfred`,
        Icon: AutoAwesome,
        show: true,
      },
    ],
  },
  {
    name: 'ACTIVITY',
    items: [
      {
        name: 'Deal Room',
        link: `/deal-room`,
        Icon: BookmarkAdd,
        show: true,
        links: [],
      },
      {
        name: 'Syndicate Room',
        link: `/syndicate`,
        Icon: Diversity3,
        show: true,
        disabled: true,
        tag: 'Coming Soon',
      },
      {
        name: 'Saved Profiles',
        link: `/member/saved-profile`,
        Icon: TurnedInNot,
        show: true,
        links: [],
      },
    ],
  },
  {
    name: 'ORGANISATION',
    items: [
      {
        name: 'Member Profile',
        link: `/member`,
        Icon: PersonOutline,
        show: true,
        links: [],
      },
    ],
  },
];
