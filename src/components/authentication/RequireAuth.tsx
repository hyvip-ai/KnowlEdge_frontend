import { Roles } from '../../utils';

interface PropTypes {
  allowedRoles: Roles[];
}

export function RequireAuth(props: PropTypes) {
  console.log(props);
  return <div>RequireAuth</div>;
}
