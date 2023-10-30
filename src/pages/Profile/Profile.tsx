import { useBasic } from '../../hooks';

export function Profile() {
  const { data } = useBasic();
  return (
    <div className='p-4'>
      <h1 className='text-3xl text-primary font-bold '>
        Profile section to see logged in user details
      </h1>
    </div>
  );
}
