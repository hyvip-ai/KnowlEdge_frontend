import { ReactNode, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

interface PropTypes {
  children: ReactNode;
}

export function AuthLayout(props: PropTypes) {
  const { pathname } = useLocation();

  const heading = useMemo(() => {
    switch (pathname) {
      case '/auth/forgot-password':
        return 'Forgot Password';
      case '/auth/reset-password':
        return 'Reset Password';
      case '/auth/signin':
        return 'Sign in to your account';
      case '/auth/signup':
        return 'Get Started';
    }
  }, [pathname]);

  return (
    <div className='flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-primary'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <img className='mx-auto' height={80} src='/knowledge.svg' alt='logo' />
        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-primary'>
          {heading}
        </h2>
      </div>
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-secondary py-8 px-4 sm:rounded-lg sm:px-10 border border-border shadow-md'>
          {props.children}
        </div>
      </div>
    </div>
  );
}
