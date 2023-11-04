import { ArrowForwardRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export function Landing() {
  const navigate = useNavigate();
  return (
    <main className='bg-[#000212] h-screen overflow-auto'>
      <header className='fixed z-10 w-full justify-between items-center px-4 backdrop-blur-[30px] backdrop-saturate-[120%] flex top-0 h-12 border-border border-b-2'>
        <div>
          <img
            src='/logoWithName.svg'
            alt='Logo With Name'
            className='w-[150px] h-[28px]'
          />
        </div>
        <div className='flex items-center justify-center gap-2'>
          <button
            className='text-theme text-sm border border-theme px-3 py-1 rounded-full'
            onClick={() => navigate('/auth/signin')}
          >
            Sign In
          </button>
          <button
            className='text-primary bg-theme text-sm px-3 py-1 rounded-full'
            onClick={() => navigate('/auth/signup')}
          >
            Sign Up
          </button>
        </div>
      </header>
      <div className='hero pt-28 px-4 h-screen flex justify-center items-center'>
        <div className='pt-12 px-4'>
          <h1 className='text-primary text-[32px] sm:text-[40px] md:text-[70px] font-semibold leading-[1] text-center'>
            Effortless PDF Data Extraction <br /> with KnowlEdge
          </h1>
          <h3 className='text-secondary text-[16px] sm:text-[18px] md:text-[24px] font-medium leading-[1] text-center mt-3 sm:mt-5 md:mt-10'>
            Meet the New Generation Data Extraction Tool for Everyone, Chat
            Seamlessly Across Multiple Files!
          </h3>

          <button
            onClick={() => navigate('/auth/signin')}
            className='bg-theme text-primary px-6 py-4 rounded-full text-base flex justify-center items-center gap-1 mt-12 mx-auto'
          >
            Get Started <ArrowForwardRounded />
          </button>
        </div>
      </div>
    </main>
  );
}
