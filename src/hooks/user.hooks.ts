import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './useAxiosPrivate.hook';
import { basic, updateBasic } from '../requests';
import { UpdateBasic } from '../interfaces';

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

export const useUpdateBasic = () => {
  const axiosPrivate = useAxiosPrivate();
  return useMutation(async (data: Partial<UpdateBasic>) => {
    const res = await updateBasic(axiosPrivate, data);
    return res.data;
  });
};
