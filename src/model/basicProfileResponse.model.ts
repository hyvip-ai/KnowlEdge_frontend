import { CommonResponse } from '.';

export interface BasicResponse extends CommonResponse {
  data: Data;
}

interface Data {
  name: string;
  email: string;
  organization: {
    name: string;
  };
}
