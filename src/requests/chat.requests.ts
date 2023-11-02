import { AxiosInstance } from 'axios';
import { ChatRequest } from '../interfaces';

export const chat = (axiosPrivate: AxiosInstance, data: ChatRequest) =>
  axiosPrivate.post(`/chat`, data);
