import { LazyExoticComponent } from 'react';
import { Roles } from '../utils';

export interface Route {
  path: string;
  component: LazyExoticComponent<() => JSX.Element>;
  roles?: Roles[];
  requiredAuth?: boolean;
  layout?: LazyExoticComponent<(props: any) => JSX.Element>;
  title?: string;
}
