import { Control, Controller } from 'react-hook-form';

interface PropTypes {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
}

export function TextInput(props: PropTypes) {
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({
        field: { onChange, value },
        fieldState: { invalid, error },
      }) => (
        <div className={``}>
          <label>
            <p className='block text-sm font-medium text-primary mb-2'>
              {props.label}
            </p>
            <input
              className={`block w-full appearance-none rounded-md border px-3 py-2 focus:outline-none bg-primary sm:text-sm ${
                invalid
                  ? 'border-red-500 placeholder:text-red-500 text-red-500'
                  : 'border-border text-secondary'
              }`}
              type='text'
              name={props.name}
              onChange={onChange}
              value={value}
              disabled={props.disabled}
              placeholder={props.placeholder}
              autoComplete='off'
            />
          </label>
          {invalid ? (
            <p className='text-red-500 text-[12px] py-1'>*{error?.message}</p>
          ) : null}
        </div>
      )}
    />
  );
}
