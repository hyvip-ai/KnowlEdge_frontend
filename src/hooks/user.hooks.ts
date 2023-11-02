import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './useAxiosPrivate.hook';
import { allUsers, basic, inviteUsers, updateBasic } from '../requests';
import { InviteUser, UpdateBasic } from '../interfaces';

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

export const useInviteUser = () => {
  const axiosPrivate = useAxiosPrivate();
  return useMutation(async (data: InviteUser) => {
    const res = await inviteUsers(axiosPrivate, data);
    return res.data;
  });
};

export const useAllUsers = (enabled = true) => {
  const axiosPrivate = useAxiosPrivate();
  return useQuery(
    ['all-users'],
    async () => {
      const res = await allUsers(axiosPrivate);
      return res.data;
    },
    {
      enabled,
    }
  );
};
