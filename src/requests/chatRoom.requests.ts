import { AxiosInstance } from 'axios';
import { AllChatRoomResponse, ChatRoomResponse } from '../model';
import { CreateChatRoom as CreateChatRoomInterface } from '../interfaces';

export const createChatRoom = (
  axiosPrivate: AxiosInstance,
  data: Partial<CreateChatRoomInterface>
) => axiosPrivate.post(`/chat-room`, data);

export const chatRooms = (axiosPrivate: AxiosInstance) =>
  axiosPrivate.get<AllChatRoomResponse>(`/chat-room`);

export const chatRoom = (axiosPrivate: AxiosInstance, chatRoomId: string) =>
  axiosPrivate.get<ChatRoomResponse>(`/chat-room/${chatRoomId}`);

export const editChatRoom = (
  axiosPrivate: AxiosInstance,
  chatRoomId: string,
  data: Partial<CreateChatRoomInterface>
) => axiosPrivate.patch(`/chat-room/${chatRoomId}`, data);
