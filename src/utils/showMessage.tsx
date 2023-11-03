import toast, { Toast } from 'react-hot-toast';
import { ErrorResponse } from '../model';

const option:
  | Partial<
      Pick<
        Toast,
        | 'id'
        | 'icon'
        | 'duration'
        | 'ariaProps'
        | 'className'
        | 'style'
        | 'position'
        | 'iconTheme'
      >
    >
  | undefined = {
  style: {
    background: '#222241',
    color: '#F2F2F2',
    padding: '8px 24px',
    borderRadius: '10px',
    lineBreak: 'anywhere',
  },
  duration: 3000,
};

export const toastMessage = {
  success: (message: string) => toast.success(message, option),
  error: (error: any) => {
    if (typeof error === 'string') {
      toast.error(error, option);
      return;
    }
    const err = (error.response?.data || error) as ErrorResponse;
    if (typeof err.message === 'string') {
      if (err.message) {
        toast.error(err.message, option);
      }
    } else {
      err.message.map((msg) => {
        toast.error(msg, option);
      });
    }
  },
};
