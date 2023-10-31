import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './useAxiosPrivate.hook';
import {
  deleteFile,
  filesByChatRoom,
  signedURl,
  uploadFile,
} from '../requests';

export const useUploadFile = () => {
  const axiosPrivate = useAxiosPrivate();
  return useMutation(async (data: { data: FormData; chatRoomId: string }) => {
    const res = await uploadFile(axiosPrivate, data.chatRoomId, data.data);
    return res.data;
  });
};

export const useFilesByChatRoom = (chatRoomId: string, enabled = true) => {
  const axiosPrivate = useAxiosPrivate();
  return useQuery(
    ['files-by-chat-room', chatRoomId],
    async () => {
      const res = await filesByChatRoom(axiosPrivate, chatRoomId);
      return res.data;
    },
    {
      enabled,
    }
  );
};

export const useDeleteFile = () => {
  const axiosPrivate = useAxiosPrivate();
  return useMutation(async (data: { fileName: string; chatRoomId: string }) => {
    const res = await deleteFile(axiosPrivate, data.chatRoomId, data.fileName);
    return res.data;
  });
};

export const useSignedURL = () => {
  const axiosPrivate = useAxiosPrivate();
  return useMutation(async (data: { fileName: string; chatRoomId: string }) => {
    const res = await signedURl(axiosPrivate, data.chatRoomId, data.fileName);
    return res.data;
  });
};
