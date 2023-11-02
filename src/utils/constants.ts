import {
  Dashboard,
  Engineering,
  Forum,
  Groups,
  SettingsSuggest,
} from '@mui/icons-material';
import { Link } from '../interfaces';
import { ChartData } from 'chart.js';

export const DRAWER_WIDTH = 280;
export const APP_BAR_MOBILE = 64;
export const APP_BAR_DESKTOP = 92;

export enum Roles {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
  NONE = '',
}

export enum ChatRoomStatus {
  PENDING = 'PENDING',
  READY = 'READY',
}

export const DashboardSidebarSections: Link[] = [
  {
    name: 'Dashboard',
    link: `/dashboard`,
    Icon: Dashboard,
  },
  {
    name: 'Chat Rooms',
    link: `/chat-room`,
    Icon: Forum,
  },
  {
    name: 'Users',
    link: `/user-management`,
    Icon: Groups,
    hideFor: [Roles.USER],
  },
  {
    name: 'Profile',
    link: `/profile`,
    Icon: Engineering,
  },
  {
    name: 'Settings',
    link: `/settings`,
    Icon: SettingsSuggest,
    hideFor: [Roles.USER],
  },
];

const unEmploymentLabels = [];
for (let i = 0; i < 11; ++i) {
  unEmploymentLabels.push((i + 2013).toString());
}
const unemploymentRate = [
  5.42, 5.44, 5.44, 5.42, 5.36, 5.33, 5.27, 8, 5.98, 7.33, 8.4,
];

const literacyRateLabels = [1981, 1991, 2001, 2006, 2011, 2015, 2018];
const literacyRate = [41, 48, 61, 63, 69, 72, 74];

export const unEmploymentData: ChartData<'line'> = {
  labels: unEmploymentLabels,
  datasets: [
    {
      label: 'Unemployment rate in India',
      data: unemploymentRate,
      borderColor: '#FF4B00',
      fill: false,
    },
  ],
};

export const reactData: ChartData<'line'> = {
  labels: literacyRateLabels,
  datasets: [
    {
      label: 'Literacy rate in India (in %)',
      data: literacyRate,
      borderColor: '#FF4B00',
      fill: false,
    },
  ],
};

export const graphOptions = {
  responsive: true,
  plugins: {},
  interaction: {
    intersect: false,
  },

  labels: {
    color: '#ff04b0',
  },

  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Years',
        color: '#F2F2F2',
      },
      grid: {
        color: '#6c6c6c4d',
      },
      ticks: {
        color: '#A1A1AA',
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'No. Of People',
        color: '#F2F2F2',
      },
      grid: {
        color: '#6c6c6c4d',
      },
      ticks: {
        color: '#A1A1AA',
      },
    },
  },
  color: '#f2f2f2',
};
