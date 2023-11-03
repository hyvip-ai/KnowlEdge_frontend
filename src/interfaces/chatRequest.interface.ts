import { Message } from '.';

export interface ChatRequest {
  question: string;
}

export interface ChatRequestWithHistory {
  question: string;
  chatHistory: Message[];
}
