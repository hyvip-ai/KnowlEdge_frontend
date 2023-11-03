import { AxiosInstance } from 'axios';
import { ChatRequestWithHistory } from '../interfaces';
import { ChatResponse } from '../model';

export const chat = (
  axiosPrivate: AxiosInstance,
  chatRoomId: string,
  data: ChatRequestWithHistory
) => axiosPrivate.post<ChatResponse>(`/chat/${chatRoomId}`, data);

export const startChat = (axiosPrivate: AxiosInstance, chatRoomId: string) =>
  axiosPrivate.post<ChatResponse>(`/chat/${chatRoomId}/start`);

export const endChat = (axiosPrivate: AxiosInstance, chatRoomId: string) =>
  axiosPrivate.post<ChatResponse>(`/chat/${chatRoomId}/end`);
