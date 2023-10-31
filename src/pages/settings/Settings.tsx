import { useOrganization } from '../../hooks';

export function Settings() {
  const { data } = useOrganization();
  return (
    <div className='p-4'>
      <div>
        <h1 className='text-2xl text-primary font-bold '>Settings</h1>
      </div>
      <p className='text-primary mt-4'>{JSON.stringify(data, null, 2)}</p>
    </div>
  );
}
