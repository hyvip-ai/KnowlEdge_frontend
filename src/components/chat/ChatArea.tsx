import { useForm } from 'react-hook-form';
import { TextInput } from '../form';
import { serialize, toastMessage } from '../../utils';
import { useEffect, useRef, useState } from 'react';
import { ChatLoader, SecondaryButton } from '../common';
import { Send } from '@mui/icons-material';
import { useBasic, useChat } from '../../hooks';
import * as yup from 'yup';
import { ChatRequest } from '../../interfaces';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  question: yup.string().trim().required('Question is required').defined(),
});

const defaultValues: ChatRequest = {
  question: '',
};

export function ChatArea() {
  const chatAreaRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello how can i help you in this lovely day' },
    { role: 'user', content: 'Hey can you answer this very specific question' },
    { role: 'ai', content: 'Hello how can i help you in this lovely day' },
  ]);
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { data } = useBasic();
  const { mutateAsync, isLoading } = useChat();

  const scrollIntoView = () => {
    chatAreaRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const onSubmit = async (formData: any) => {
    try {
      // setMessages((prev) => [
      //   ...prev,
      //   { role: 'user', content: formData.request },
      // ]);
      await mutateAsync(formData);
      reset();
      scrollIntoView();
    } catch (err) {
      toastMessage.error(err);
    }
  };

  useEffect(() => {
    scrollIntoView();
  }, []);

  return (
    <div className='flex items-center mt-6 gap-4 flex-wrap flex-col h-full'>
      <div className='w-full flex flex-col flex-1 pt-4 overflow-auto px-4'>
        {messages.map((message, index) => (
          <div
            className={`${
              message.role === 'user' ? 'self-end' : 'self-start'
            } flex items-center gap-2 mb-4`}
            key={index}
          >
            {message.role === 'ai' ? (
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
            ) : null}
            <div
              className={`${
                message.role === 'user'
                  ? 'bg-theme  rounded-br-none'
                  : 'bg-secondary rounded-bl-none'
              } py-2 px-3 rounded-lg text-primary`}
            >
              <div className='mb-1'>
                <p>{message.role === 'user' ? 'User' : 'KnowlEdge Bot'}</p>
              </div>
              <div>
                <p>{message.content}</p>
              </div>
            </div>
            {message.role === 'user' ? (
              <div>
                <img
                  src={`https://api.dicebear.com/7.x/lorelei-neutral/svg?${serialize(
                    { seed: data?.data.name ? data.data.name : 'user user' }
                  )}`}
                  height={40}
                  width={40}
                  className='rounded-full bg-white cursor-pointer'
                />
              </div>
            ) : null}
          </div>
        ))}
        {isLoading ? (
          <div className='flex items-center gap-2 mb-4 self-start'>
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
        ) : (
          isLoading
        )}
        <div ref={chatAreaRef}></div>
      </div>
      <div className='chat-form w-full'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex gap-4 items-stretch'
        >
          <div className='flex-grow'>
            <TextInput
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
