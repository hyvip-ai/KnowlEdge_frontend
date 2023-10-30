import { Control, Controller } from 'react-hook-form';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface PropTypes {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  inputContainer?: string;
}
export function PasswordInput(props: PropTypes) {
  const [show, setShow] = useState(false);

  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({
        field: { onChange, value },
        fieldState: { invalid, error },
      }) => (
        <div className=''>
          <div className='flex'>
            <label className='flex-grow'>
              <p className='block text-sm font-medium text-primary mb-2'>
                {props.label}
              </p>
              <input
                className={`block w-full appearance-none rounded-md border px-3 py-2 focus:outline-none bg-primary sm:text-sm border-r-0 rounded-tr-none rounded-br-none ${
                  invalid
                    ? 'border-red-500 placeholder:text-red-500 text-red-500'
                    : 'text-secondary border-border'
                }`}
                type={show ? 'text' : 'password'}
                name={props.name}
                onChange={onChange}
                placeholder={props.placeholder}
                value={value}
                autoComplete='off'
              />
            </label>
            <div
              onClick={() => {
                setShow((prev) => !prev);
              }}
              className={`bg-primary h-[37.6px] flex justify-center items-center mt-[28px] border border-l-0 rounded-md rounded-bl-none rounded-tl-none px-2 cursor-pointer ${
                invalid ? 'border-red-500' : 'border-border'
              }`}
            >
              {show ? (
                <VisibilityOff
                  className={`hover:text-primary ${
                    invalid ? 'text-red-500' : 'text-secondary'
                  }`}
                />
              ) : (
                <Visibility
                  className={`hover:text-primary ${
                    invalid ? 'text-red-500' : 'text-secondary'
                  }`}
                />
              )}
            </div>
          </div>
          {invalid ? (
            <p className='text-red-500 text-[12px] py-1'>*{error?.message}</p>
          ) : null}
        </div>
      )}
    />
  );
}
