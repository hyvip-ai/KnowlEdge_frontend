import unauthorized from '../lotties/unauthorized.json';
import { useMemo } from 'react';
import Lottie from 'react-lottie';
import { PrimaryButton, SecondaryButton } from '../components/common';
import { useAuth, useSignout } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { Roles, toastMessage } from '../utils';

export function Unauthorized() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const defaultOptions = useMemo(
    () => ({
      loop: true,
      autoplay: true,
      animationData: unauthorized,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    }),
    []
  );

  const { mutateAsync: signout, isLoading } = useSignout();

  const handleSignout = async () => {
    try {
      await signout();
      setAuth({ accessToken: '', role: Roles.NONE });
      navigate('/auth/signin');
    } catch (err) {
      toastMessage.error(err);
    }
  };

  return (
    <div className='flex h-screen w-full px-4 justify-center items-center bg-primary'>
      <div>
        <Lottie options={defaultOptions} height={260} width={260} />
        <h2 className='mt-6 text-center md:text-3xl text-xl font-bold tracking-tight text-primary'>
          Oops! seems like you want to access something you shouldn't have 😈
        </h2>
        <h4 className='mt-4 text-center text-[14px] md:text-xl font-bold tracking-tight text-secondary'>
          If you have access but still see the error, maybe you have logged in
          with a different account, please <b>Signin Again</b>
        </h4>
        <div className='mt-8 flex justify-center gap-4'>
          <SecondaryButton
            type='button'
            onClick={() => navigate(-1)}
            isDisabled={isLoading}
          >
            Go Back
          </SecondaryButton>
          <PrimaryButton
            type='button'
            onClick={handleSignout}
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            Signin Again
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
