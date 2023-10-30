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

export function SecondaryButton(props: PropTypes) {
  return (
    <button
      onClick={props.onClick}
      disabled={props.isDisabled}
      className='transition-all flex w-full justify-center rounded-md border border-theme bg-transparent py-2 px-4 text-sm font-medium text-theme hover:bg-themeHoverSecondary hover:text-primary focus:outline-none disabled:opacity-70'
    >
      {props.isLoading ? <Loader /> : props.children}
    </button>
  );
}
