import { useForm } from 'react-hook-form';
import { TextInput } from '../form';
import { serialize, toastMessage } from '../../utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ChatBubble,
  ChatLoader,
  ChatStartLoader,
  SecondaryButton,
} from '../common';
import { Send } from '@mui/icons-material';
import { useBasic, useChat, useStartChat } from '../../hooks';
import * as yup from 'yup';
import { ChatRequest, Message } from '../../interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';

const schema = yup.object().shape({
  question: yup.string().trim().required('Question is required').defined(),
});

const defaultValues: ChatRequest = {
  question: '',
};

export function ChatArea() {
  const { id } = useParams();

  const chatAreaRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { data } = useBasic();
  const { mutateAsync: startChat, isLoading: loadingChatStart } =
    useStartChat();
  const { mutateAsync, isLoading } = useChat();

  const scrollIntoView = () => {
    chatAreaRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const onSubmit = async (formData: ChatRequest) => {
    try {
      const question = formData.question;
      const previousMessages = [...messages];
      setMessages((prev) => [...prev, { role: 'user', content: question }]);
      reset();
      const res = await mutateAsync({
        data: { question, chatHistory: previousMessages },
        chatRoomId: id!,
      });
      setMessages((prev) => [
        ...prev,
        { role: 'ai', content: res.data.response, context: res.data.context },
      ]);
    } catch (err) {
      toastMessage.error(err);
    }
  };

  const handleStartChatSession = useCallback(async () => {
    try {
      const res = await startChat(id!);
      setMessages((prev) => [
        ...prev,
        { content: res.data.response, context: res.data.context, role: 'ai' },
      ]);
    } catch (err) {
      toastMessage.error(err);
    }
  }, [id, startChat]);

  const handleEndChatSession = () => {
    console.log('Handle end Chat Room');
  };

  useEffect(() => {
    handleStartChatSession();
    return () => {
      handleEndChatSession();
    };
  }, [handleStartChatSession]);

  useEffect(() => {
    scrollIntoView();
  }, [messages]);

  return (
    <div className='flex items-center mt-6 gap-4 flex-wrap flex-col h-full'>
      <div className='w-full flex flex-col flex-1 pt-4 overflow-auto px-4'>
        {loadingChatStart ? (
          <div className='flex justify-center items-center h-full flex-col'>
            <ChatStartLoader />
            <p className='text-primary mt-[100px]'>Processing Files...</p>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <ChatBubble
                message={message}
                name={data?.data.name}
                key={index}
              />
            ))}
            {isLoading ? (
              <div className='flex items-center gap-2 mb-4 self-start chatBubble'>
                <div>
                  <img
                    src={`https://api.dicebear.com/7.x/lorelei-neutral/svg?${serialize(
                      { seed: 'knowlEdge ai' }
                    )}`}
                    height={40}
                    width={40}
                    className='rounded-full bg-white cursor-pointer'
                  />
                </div>
                <div className='py-3 px-3 rounded-lg text-primary bg-secondary rounded-bl-none'>
                  <div className='mb-3'>
                    <p>KnowlEdge Bot</p>
                  </div>
                  <div>
                    <ChatLoader />
                  </div>
                </div>
              </div>
            ) : null}
            <div ref={chatAreaRef}></div>
          </>
        )}
      </div>
      <div className='chat-form w-full'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex gap-4 items-stretch'
        >
          <div className='flex-grow'>
            <TextInput
              hideError
              control={control}
              name='question'
              placeholder='Enter your question here...'
              className='h-full'
            />
          </div>
          <div>
            <SecondaryButton type='submit'>
              <Send />
            </SecondaryButton>
          </div>
        </form>
      </div>
    </div>
  );
}
