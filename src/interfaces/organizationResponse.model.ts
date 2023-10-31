import { CommonResponse } from '../model';

export interface OrganizationResponse extends CommonResponse {
  data: Data;
}

interface Data {}
