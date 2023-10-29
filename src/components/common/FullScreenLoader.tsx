import { useMemo } from 'react';
import Lottie from 'react-lottie';
import animationData from '../../lotties/loader.json';

export function FullScreenLoader() {
  const defaultOptions = useMemo(
    () => ({
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    }),
    []
  );

  return (
    <div className='h-screen w-full flex justify-center items-center bg-primary'>
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
}
