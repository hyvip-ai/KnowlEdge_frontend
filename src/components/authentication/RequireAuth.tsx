import { useEffect, useState } from 'react';
import { Roles, toastMessage } from '../../utils';
import { useAuth, useRefreshToken } from '../../hooks';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { FullScreenLoader } from '../common';

interface PropTypes {
  allowedRoles: Roles[];
}

export function RequireAuth(props: PropTypes) {
  const [isLoading, setIsLoading] = useState(true);

  const { auth } = useAuth();
  const location = useLocation();
  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err: any) {
        toastMessage.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, [auth.accessToken, refresh]);

  return isLoading ? (
    <FullScreenLoader />
  ) : props.allowedRoles?.includes(auth.role) ? (
    <Outlet />
  ) : auth?.accessToken ? (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to={`/auth/signin`} state={{ from: location }} replace />
  );
}
