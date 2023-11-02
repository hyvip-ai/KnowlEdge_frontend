import { Tab, Tabs } from '@mui/material';

import { useState } from 'react';
import { ChatArea, Files } from '../../components/chat';
import { ArrowBackIos } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      className={`${value !== index ? 'hidden' : 'block'} -mt-6 h-full`}
      {...other}
    >
      {children}
    </div>
  );
}

export function Chat() {
  const navigate = useNavigate();
  const [value, setValue] = useState<number>(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className='bg-primary h-screen overflow-auto w-full p-4 flex flex-col'>
      <div className='flex items-center'>
        <ArrowBackIos
          className='text-primary cursor-pointer'
          onClick={() => {
            navigate('/chat-room');
          }}
        />
        <h1 className='text-3xl text-primary font-bold'>Chat</h1>
      </div>
      <div>
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              backgroundColor: '#FF4B00',
              color: '#FF4B00',
            },
          }}
        >
          <Tab label='Chat' sx={{ color: '#f2f2f2', minWidth: '50%' }} />
          <Tab
            className='w-[50%]'
            sx={{ color: '#f2f2f2', flexGrow: 1, minWidth: '50%' }}
            label='Files related to this chat room'
          />
        </Tabs>
      </div>

      <div className='flex-grow overflow-hidden'>
        <CustomTabPanel value={value} index={0}>
          <ChatArea />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Files />
        </CustomTabPanel>
      </div>
    </div>
  );
}
