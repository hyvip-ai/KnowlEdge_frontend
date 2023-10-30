import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './useAxiosPrivate.hook';
import { basic } from '../requests';

export const useBasic = (enabled = true) => {
  const axiosPrivate = useAxiosPrivate();
  return useQuery(
    ['user-basic-profile'],
    async () => {
      const res = await basic(axiosPrivate);
      return res.data;
    },
    {
      enabled,
    }
  );
};
