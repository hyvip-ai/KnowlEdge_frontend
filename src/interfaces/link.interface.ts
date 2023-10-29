import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { Roles } from '../utils';

export interface Link {
  name: string;
  link: string;
  Icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
    muiName: string;
  };
  show: boolean;
  disabled?: boolean;
  links?: Link[];
  tag?: string;
  hideFor?: Roles[];
}

export interface DashboardLinkSection {
  name: string;
  items: Link[];
}
