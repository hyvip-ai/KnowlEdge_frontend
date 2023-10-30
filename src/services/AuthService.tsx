import { ReactNode, createContext, useState } from 'react';
import { Auth, AuthObject } from '../interfaces';
import { Roles } from '../utils';

const authDefaultValues: Auth = {
  auth: {
    accessToken: '',
    role: Roles.NONE,
  },
  setAuth: () => null,
};

export const AuthContext = createContext(authDefaultValues);

interface PropTypes {
  children: ReactNode;
}

export const AuthProvider = (props: PropTypes) => {
  const [auth, setAuth] = useState<AuthObject>({
    accessToken: '',
    role: Roles.NONE,
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};
