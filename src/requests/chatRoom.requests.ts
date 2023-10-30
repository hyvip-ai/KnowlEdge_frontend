import { AxiosInstance } from 'axios';
import { AllChatRoomResponse } from '../model';
import { CreateChatRoom as CreateChatRoomInterface } from '../interfaces';

export const createChatRoom = (
  axiosPrivate: AxiosInstance,
  data: Partial<CreateChatRoomInterface>
) => axiosPrivate.post(`/chat-room`, data);

export const chatRooms = (axiosPrivate: AxiosInstance) =>
  axiosPrivate.get<AllChatRoomResponse>(`/chat-room`);
