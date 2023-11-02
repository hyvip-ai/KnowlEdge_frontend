import { useMutation } from '@tanstack/react-query';
import useAxiosPrivate from './useAxiosPrivate.hook';
import { ChatRequest } from '../interfaces';
import { chat } from '../requests';

export const useChat = () => {
  const axiosPrivate = useAxiosPrivate();
  return useMutation(async (data: ChatRequest) => {
    const res = await chat(axiosPrivate, data);
    return res;
  });
};
