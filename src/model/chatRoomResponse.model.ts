import { CommonResponse } from '.';

export interface ChatRoomResponse extends CommonResponse {
  data: ChatRoom;
}

interface ChatRoom {
  id: string;
  name: string;
  description: string;
}
