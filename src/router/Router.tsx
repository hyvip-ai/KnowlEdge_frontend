import { Fragment, Suspense, lazy } from 'react';
import { Route as RouteInterface } from '../interfaces/route.interface';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Public, RequireAuth } from '../components/authentication';
import { FullScreenLoader, Title } from '../components/common';

const AuthLayout = lazy(() =>
  import('../layouts/Auth.layout').then((module) => ({
    default: module.AuthLayout,
  }))
);

const DashboardSidebarLayout = lazy(() =>
  import('../layouts/DashboardSidebar.layout').then((module) => ({
    default: module.DashboardSidebarLayout,
  }))
);

const Signup = lazy(() =>
  import('../pages/auth/Signup').then((module) => ({
    default: module.Signup,
  }))
);

const Signin = lazy(() =>
  import('../pages/auth/Signin').then((module) => ({
    default: module.Signin,
  }))
);

const ChatRooms = lazy(() =>
  import('../pages/chatRooms/ChatRooms').then((module) => ({
    default: module.ChatRooms,
  }))
);

const Dashboard = lazy(() =>
  import('../pages/dashboard/Dashboard').then((module) => ({
    default: module.Dashboard,
  }))
);

const Members = lazy(() =>
  import('../pages/members/Members').then((module) => ({
    default: module.Members,
  }))
);

const Profile = lazy(() =>
  import('../pages/Profile/Profile').then((module) => ({
    default: module.Profile,
  }))
);

const Settings = lazy(() =>
  import('../pages/settings/Settings').then((module) => ({
    default: module.Settings,
  }))
);

const Error = lazy(() =>
  import('../pages/Error').then((module) => ({
    default: module.Error,
  }))
);

const Unauthorized = lazy(() =>
  import('../pages/Unauthorized').then((module) => ({
    default: module.Unauthorized,
  }))
);

const RoutesData: RouteInterface[] = [
  {
    path: '/auth/signup',
    component: Signup,
    layout: AuthLayout,
    title: 'KnowlEdge | Signup',
  },
  {
    path: '/auth/signin',
    component: Signin,
    layout: AuthLayout,
    title: 'KnowlEdge | Signin',
  },
  {
    path: '/dashboard',
    component: Dashboard,
    layout: DashboardSidebarLayout,
    title: 'KnowlEdge | Dashboard',
  },
  {
    path: '/chat-room',
    component: ChatRooms,
    layout: DashboardSidebarLayout,
    title: 'KnowlEdge | Chat Rooms',
  },
  {
    path: '/profile',
    component: Profile,
    layout: DashboardSidebarLayout,
    title: 'KnowlEdge | Profile',
  },
  {
    path: '/settings',
    component: Settings,
    layout: DashboardSidebarLayout,
    title: 'KnowlEdge | Settings',
  },
  {
    path: '/member-management',
    component: Members,
    layout: DashboardSidebarLayout,
    title: 'KnowlEdge | Members',
  },
  {
    path: '/unauthorized',
    component: Unauthorized,
    title: 'KnowlEdge | Unauthorized',
  },
  {
    path: '*',
    component: Error,
    title: 'KnowlEdge | Error',
  },
];

export function Router() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/dashboard' replace />} />
      <Route path='/'>
        {RoutesData.map((route) => {
          const Guard = route.requiredAuth ? (
            <RequireAuth allowedRoles={route.roles!} />
          ) : (
            <Public />
          );

          const Layout = route.layout || Fragment;
          const Component = route.component;

          return (
            <Route key={route.path} element={Guard}>
              <Route element={<Title title={route.title || 'KnowlEdge'} />}>
                <Route
                  path={route.path}
                  element={
                    <Suspense fallback={<FullScreenLoader />}>
                      <Layout>
                        <Component />
                      </Layout>
                    </Suspense>
                  }
                />
              </Route>
            </Route>
          );
        })}
      </Route>
    </Routes>
  );
}
