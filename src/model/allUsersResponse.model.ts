import { CommonResponse } from '.';

export interface AllUsersResponse extends CommonResponse {
  data: Data[];
}

interface Data {
  id: string;
  name: string;
  email: string;
}
