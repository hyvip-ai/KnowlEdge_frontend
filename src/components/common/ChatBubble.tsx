import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { Message } from '../../interfaces';
import { serialize } from '../../utils';
import { ExpandMore } from '@mui/icons-material';

interface PropTypes {
  message: Message;
  name?: string;
}

export function ChatBubble({ message, name }: PropTypes) {
  return (
    <div
      className={`${
        message.role === 'user' ? 'self-end' : 'self-start'
      } flex items-center gap-2 mb-4 chatBubble max-w-[80%]`}
    >
      {message.role === 'ai' ? (
        <div className='flex-shrink-0'>
          <img
            src={`https://api.dicebear.com/7.x/lorelei-neutral/svg?${serialize({
              seed: 'knowlEdge ai',
            })}`}
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
        } py-3 px-3 rounded-lg text-primary flex-shrink`}
      >
        <div className='mb-1'>
          <p>{message.role === 'user' ? 'User' : 'KnowlEdge Bot'}</p>
        </div>
        <div>
          <p className='whitespace-pre-line'>{`${message.content}`}</p>
        </div>
        {message.context ? (
          <div className='mt-3'>
            {message.context.map((context, index) => (
              <Accordion sx={{ backgroundColor: '#191A23' }} key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMore className='text-primary' />}
                  aria-controls='panel1bh-content'
                  id='panel1bh-header'
                >
                  <h2 className='text-base font-semibold text-primary'>
                    Context {index + 1}
                  </h2>
                </AccordionSummary>
                <AccordionDetails>
                  <p className='text-base text-secondary font-medium'>
                    {context.pageContent}
                  </p>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        ) : null}
      </div>
      {message.role === 'user' ? (
        <div>
          <img
            src={`https://api.dicebear.com/7.x/lorelei-neutral/svg?${serialize({
              seed: name ? name : 'user user',
            })}`}
            height={40}
            width={40}
            className='rounded-full bg-white cursor-pointer'
          />
        </div>
      ) : null}
    </div>
  );
}
