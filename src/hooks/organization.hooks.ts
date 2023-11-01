import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './useAxiosPrivate.hook';
import { organization, updateOrganization } from '../requests';
import { UpdateOrganization } from '../interfaces';

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

export const useUpdateOrganization = () => {
  const axiosPrivate = useAxiosPrivate();
  return useMutation(async (data: UpdateOrganization) => {
    const res = await updateOrganization(axiosPrivate, data);
    return res.data;
  });
};
