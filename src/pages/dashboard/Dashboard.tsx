// import { Chart } from 'react-chartjs-2';
// import { graphOptions, reactData, unEmploymentData } from '../../utils';
import { registerables, Chart as ChartRegister } from 'chart.js';

ChartRegister.register(...registerables);

export function Dashboard() {
  return (
    <div className='p-4'>
      <div>
        <h1 className='text-2xl text-primary font-bold'>Dashboard</h1>
        <h3 className='text-[16px] text-secondary font-semibold mt-2 mb-4'>
          Currently we are not generating any stats (as I am a solo developer
          working on it), but pretty soon we will have something (PROBABLY)
        </h3>
        {/* <p className='text-secondary font-medium text-[14px]'>
          But in case you want to feel like looking at dashboard here are some
          pretty interesting charts to look at
        </p> */}
      </div>
      {/* <div className='mt-6'>
        <Chart type='line' data={unEmploymentData} options={graphOptions} />
      </div>

      <div className='mt-6'>
        <Chart type='line' data={reactData} options={graphOptions} />
      </div> */}

      <h3 className='text-[16px] text-secondary font-semibold mb-2 mt-4'>
        How To Use (Admins)
      </h3>
      <ul className='text-primary list-decimal list-inside'>
        <li>Create Chat room from Chat Room Tab</li>
        <li>Upload files in a chat chat room</li>
        <li>Set your OPEN AI api key from Settings tab</li>
        <li>Start Chatting</li>
        <li>
          Additionally you can invite other members, from User Management Tab
        </li>
      </ul>

      <h3 className='text-[16px] text-secondary font-semibold mb-2 mt-4'>
        How To Use (Users)
      </h3>
      <ul className='text-primary list-decimal list-inside'>
        <li>Go to chat rooms tab</li>
        <li>Select the chat room you like and start chatting</li>
        <li>If there is no Open AI api key provided, ask Admin to add one</li>
      </ul>
    </div>
  );
}
