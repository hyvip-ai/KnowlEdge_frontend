import { ReactNode } from 'react';

interface PropTypes {
  children: ReactNode;
  heading: string;
}

export function AuthLayout(props: PropTypes) {
  return (
    <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-primary'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <img className='mx-auto w-auto h-20' src='/logo.svg' alt='logo' />
        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-primary'>
          {props.heading}
        </h2>
      </div>
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-secondary py-8 px-4 sm:rounded-lg sm:px-10 border border-border'>
          lorem500
        </div>
      </div>
    </div>
  );
}
