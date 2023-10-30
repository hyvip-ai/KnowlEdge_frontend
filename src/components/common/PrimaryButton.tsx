import { ReactNode } from 'react';
import { Loader } from './Loader';

interface PropTypes {
  type: 'button' | 'submit';
  children: ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function PrimaryButton(props: PropTypes) {
  return (
    <button
      onClick={props.onClick}
      disabled={props.isDisabled}
      className='flex w-full justify-center rounded-md border border-transparent bg-theme py-2 px-4 text-sm font-medium text-primary hover:bg-themeHover focus:outline-none disabled:opacity-70'
    >
      {props.isLoading ? <Loader /> : props.children}
    </button>
  );
}
