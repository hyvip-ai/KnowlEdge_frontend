import { AxiosInstance } from 'axios';
import { AllFilesResponse, FileUploadResponse } from '../model';

export const uploadFile = (
  axiosPrivate: AxiosInstance,
  chatRoomId: string,
  data: FormData
) =>
  axiosPrivate.post<FileUploadResponse>(
    `/file/upload?chatRoomId=${chatRoomId}`,
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

export const filesByChatRoom = (
  axiosPrivate: AxiosInstance,
  chatRoomId: string
) => axiosPrivate.get<AllFilesResponse>(`/file?chatRoomId=${chatRoomId}`);

export const signedURl = (
  axiosPrivate: AxiosInstance,
  chatRoomId: string,
  fileName: string
) => axiosPrivate.post(`/file/${fileName}?chatRoomId=${chatRoomId}`);

export const deleteFile = (
  axiosPrivate: AxiosInstance,
  chatRoomId: string,
  fileName: string
) => axiosPrivate.delete(`/file/${fileName}?chatRoomId=${chatRoomId}`);
