import { useMutation } from '@tanstack/react-query';
import useAxiosPrivate from './useAxiosPrivate.hook';
import { chat, startChat } from '../requests';
import { ChatRequestWithHistory } from '../interfaces';

export const useChat = () => {
  const axiosPrivate = useAxiosPrivate();
  return useMutation(
    async (data: { chatRoomId: string; data: ChatRequestWithHistory }) => {
      const res = await chat(axiosPrivate, data.chatRoomId, data.data);
      return res.data;
    }
  );
};

export const useStartChat = () => {
  const axiosPrivate = useAxiosPrivate();
  return useMutation(async (chatRoomId: string) => {
    const res = await startChat(axiosPrivate, chatRoomId);
    return res.data;
  });
};
