import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './useAxiosPrivate.hook';
import { chatRooms, createChatRoom } from '../requests';
import { CreateChatRoom as CreateChatRoomInterface } from '../interfaces';

export const useChatRooms = (enabled = true) => {
  const axiosPrivate = useAxiosPrivate();
  return useQuery(
    ['chat-rooms'],
    async () => {
      const res = await chatRooms(axiosPrivate);
      return res.data;
    },
    {
      enabled,
    }
  );
};

export const useCreateChatRoom = () => {
  const axiosPrivate = useAxiosPrivate();
  return useMutation(async (data: Partial<CreateChatRoomInterface>) => {
    const res = await createChatRoom(axiosPrivate, data);
    return res.data;
  });
};
