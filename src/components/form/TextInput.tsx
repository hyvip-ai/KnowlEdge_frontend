import { Control, Controller } from 'react-hook-form';

interface PropTypes {
  control: Control<any>;
  name: string;
  label: string;
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
              className='block w-full appearance-none rounded-md border border-border px-3 py-2 text-secondary focus:outline-none bg-primary sm:text-sm'
              type='text'
              name={props.name}
              onChange={onChange}
              value={value}
              disabled={props.disabled}
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
