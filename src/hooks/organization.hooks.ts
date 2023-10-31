import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './useAxiosPrivate.hook';
import { organization } from '../requests';

export const useOrganization = (enabled = true) => {
  const axiosPrivate = useAxiosPrivate();
  return useQuery(
    ['organization'],
    async () => {
      const res = await organization(axiosPrivate);
      return res.data;
    },
    {
      enabled,
    }
  );
};
