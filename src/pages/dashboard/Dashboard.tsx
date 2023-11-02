import { Chart } from 'react-chartjs-2';
import { graphOptions, reactData, unEmploymentData } from '../../utils';
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
        <p className='text-secondary font-medium text-[14px]'>
          But in case you want to feel like looking at dashboard here are some
          pretty interesting charts to look at
        </p>
      </div>
      <div className='mt-6'>
        <Chart type='line' data={unEmploymentData} options={graphOptions} />
      </div>

      <div className='mt-6'>
        <Chart type='line' data={reactData} options={graphOptions} />
      </div>
    </div>
  );
}
