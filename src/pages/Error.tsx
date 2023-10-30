import error from '../lotties/error.json';
import { useMemo } from 'react';
import Lottie from 'react-lottie';

export function Error() {
  const defaultOptions = useMemo(
    () => ({
      loop: true,
      autoplay: true,
      animationData: error,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    }),
    []
  );

  return (
    <div className='flex h-screen w-full justify-center items-center bg-primary px-4'>
      <div>
        <Lottie options={defaultOptions} height={350} width={350} />
        <h2 className='mt-6 text-center text-xl md:text-3xl font-bold tracking-tight text-primary'>
          Oops! seems like you hit the dead end 😕
        </h2>
      </div>
    </div>
  );
}
