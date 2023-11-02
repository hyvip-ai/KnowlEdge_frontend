import { CommonResponse } from '.';

export interface ChatResponse extends CommonResponse {
  data: Data;
}

interface Data {
  response: string;
  context: Context[];
}

interface Context {
  pageContent: string;
}
