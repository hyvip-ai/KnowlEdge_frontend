import { AxiosInstance } from 'axios';
import { OrganizationResponse } from '../model';

export const organization = (axiosPrivate: AxiosInstance) =>
  axiosPrivate.get<OrganizationResponse>(`/organization`);
