import { useForm } from 'react-hook-form';
import { TextInput } from '../form';
import { serialize, toastMessage } from '../../utils';
import { useEffect, useRef, useState } from 'react';
import { ChatBubble, ChatLoader, SecondaryButton } from '../common';
import { Send } from '@mui/icons-material';
import { useBasic, useChat } from '../../hooks';
import * as yup from 'yup';
import { ChatRequest, Message } from '../../interfaces';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  question: yup.string().trim().required('Question is required').defined(),
});

const defaultValues: ChatRequest = {
  question: '',
};

export function ChatArea() {
  const chatAreaRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { data } = useBasic();
  const { mutateAsync, isLoading } = useChat();

  const scrollIntoView = () => {
    chatAreaRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const onSubmit = async (formData: ChatRequest) => {
    try {
      const question = formData.question;
      setMessages((prev) => [...prev, { role: 'user', content: question }]);
      reset();
      const res = await mutateAsync({ question });
      setMessages((prev) => [
        ...prev,
        { role: 'ai', content: res.data.response, context: res.data.context },
      ]);
    } catch (err) {
      toastMessage.error(err);
    }
  };

  useEffect(() => {
    scrollIntoView();
  }, [messages]);

  return (
    <div className='flex items-center mt-6 gap-4 flex-wrap flex-col h-full'>
      <div className='w-full flex flex-col flex-1 pt-4 overflow-auto px-4'>
        {messages.map((message, index) => (
          <ChatBubble message={message} name={data?.data.name} key={index} />
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
