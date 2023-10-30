import { useAuth } from './useAuth.hook';
import { axiosPublic } from '../api';
import { SigninResponse } from '../models';
import { Roles } from '../utils';
import { useCallback } from 'react';

export const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = useCallback(async () => {
    try {
      const { data } = await axiosPublic.post<SigninResponse>(
        `/auth/refresh`,
        {},
        {
          withCredentials: true,
        }
      );

      setAuth((prev) => {
        return {
          ...prev,
          role: data.data.role,
          accessToken: data.data.accessToken,
        };
      });
      return data.data.accessToken;
    } catch (err) {
      setAuth((prev) => {
        return {
          ...prev,
          role: Roles.NONE,
          accessToken: '',
        };
      });
      throw new Error('Not authenticated');
    }
  }, [setAuth]);
  return refresh;
};
