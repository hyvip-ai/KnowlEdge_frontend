import { CommonResponse } from '.';

export interface AllChatRoomResponse extends CommonResponse {
  data: ChatRoom[];
}

interface ChatRoom {
  id: string;
  name: string;
  description: string;
  files: number;
}
