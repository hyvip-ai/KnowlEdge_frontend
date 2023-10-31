import { CommonResponse } from '.';
import { ChatRoomStatus } from '../utils';

export interface ChatRoomResponse extends CommonResponse {
  data: ChatRoom;
}

interface ChatRoom {
  id: string;
  name: string;
  description: string;
  status: ChatRoomStatus;
}
