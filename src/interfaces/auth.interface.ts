import { Roles } from '../utils';

export interface AuthObject {
  accessToken: string;
  role: Roles;
}

export interface Auth {
  auth: AuthObject;
  setAuth: React.Dispatch<React.SetStateAction<AuthObject>>;
}
