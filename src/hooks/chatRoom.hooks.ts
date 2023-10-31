import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './useAxiosPrivate.hook';
import {
  chatRoom,
  chatRooms,
  createChatRoom,
  editChatRoom,
  loadFiles,
} from '../requests';
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
      retry: 1,
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

export const useChatRoom = (chatRoomId: string, enabled = true) => {
  const axiosPrivate = useAxiosPrivate();
  return useQuery(
    ['chat-room', chatRoomId],
    async () => {
      const res = await chatRoom(axiosPrivate, chatRoomId);
      return res.data;
    },
    {
      enabled,
    }
  );
};

export const useEditChatRoom = () => {
  const axiosPrivate = useAxiosPrivate();
  return useMutation(
    async (data: {
      chatRoomId: string;
      data: Partial<CreateChatRoomInterface>;
    }) => {
      const res = await editChatRoom(axiosPrivate, data.chatRoomId, data.data);
      return res.data;
    }
  );
};

export const useLoadFiles = () => {
  const axiosPrivate = useAxiosPrivate();
  return useMutation(async (chatRoomId: string) => {
    const res = await loadFiles(axiosPrivate, chatRoomId);
    return res.data;
  });
};
