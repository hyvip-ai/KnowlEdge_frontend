import { CommonResponse } from '.';
import { Roles } from '../utils';

export interface SigninResponse extends CommonResponse {
  data: Data;
}

interface Data {
  accessToken: string;
  id: string;
  role: Roles;
}
