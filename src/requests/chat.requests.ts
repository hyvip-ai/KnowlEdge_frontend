import { AxiosInstance } from 'axios';
import { ChatRequest } from '../interfaces';
import { ChatResponse } from '../model';

export const chat = (axiosPrivate: AxiosInstance, data: ChatRequest) =>
  axiosPrivate.post<ChatResponse>(`/chat`, data);
