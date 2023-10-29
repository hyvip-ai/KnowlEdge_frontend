import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';

interface PropTypes {
  title: string;
}

export function Title(props: PropTypes) {
  return (
    <>
      <Helmet>
        <title>{props.title}</title>
      </Helmet>
      <Outlet />
    </>
  );
}
