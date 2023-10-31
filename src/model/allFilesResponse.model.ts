import { CommonResponse } from '.';

export interface AllFilesResponse extends CommonResponse {
  data: Data[];
}

interface Data {
  name: string;
  id: string;
}
