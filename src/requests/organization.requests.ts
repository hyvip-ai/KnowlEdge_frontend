import { AxiosInstance } from 'axios';
import { OrganizationResponse } from '../model';
import { UpdateOrganization } from '../interfaces';

export const organization = (axiosPrivate: AxiosInstance) =>
  axiosPrivate.get<OrganizationResponse>(`/organization`);

export const updateOrganization = (
  axiosPrivate: AxiosInstance,
  data: UpdateOrganization
) => axiosPrivate.patch<OrganizationResponse>(`/organization`, data);
