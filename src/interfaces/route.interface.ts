import { LazyExoticComponent, ReactNode } from 'react';
import { Roles } from '../utils';

interface PropTypes {
  children: ReactNode;
}

export interface Route {
  path: string;
  component: LazyExoticComponent<() => JSX.Element>;
  roles?: Roles[];
  requiredAuth?: boolean;
  layout?: LazyExoticComponent<(props: PropTypes) => JSX.Element>;
  title?: string;
}
