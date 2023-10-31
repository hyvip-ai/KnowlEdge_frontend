import { CommonResponse } from '.';

export interface OrganizationResponse extends CommonResponse {
  data: Data;
}

interface Data {
  email: string | null;
  name: string;
  openAIApiKey: string | null;
  subscription: string;
}
