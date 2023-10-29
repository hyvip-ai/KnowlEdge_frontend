import { Roles } from '../../utils';

interface PropTypes {
  allowedRoles: Roles[];
}

export function RequireAuth(props: PropTypes) {
  return <div>RequireAuth</div>;
}
