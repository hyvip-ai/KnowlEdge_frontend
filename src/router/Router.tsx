import { Fragment, Suspense, lazy } from 'react';
import { Route as RouteInterface } from '../interfaces/route.interface';
import { Route, Routes } from 'react-router-dom';
import { Public, RequireAuth } from '../components/authentication';
import { FullScreenLoader, Title } from '../components/common';
import { Roles } from '../utils';

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

const Landing = lazy(() =>
  import('../pages/landing/Landing').then((module) => ({
    default: module.Landing,
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

const ForgotPassword = lazy(() =>
  import('../pages/auth/ForgotPassword').then((module) => ({
    default: module.ForgotPassword,
  }))
);

const ResetPassword = lazy(() =>
  import('../pages/auth/ResetPassword').then((module) => ({
    default: module.ResetPassword,
  }))
);

const AcceptInvite = lazy(() =>
  import('../pages/auth/AcceptInvite').then((module) => ({
    default: module.AcceptInvite,
  }))
);

const ChatRooms = lazy(() =>
  import('../pages/chatRooms/ChatRooms').then((module) => ({
    default: module.ChatRooms,
  }))
);

const EditChatRoom = lazy(() =>
  import('../pages/chatRooms/EditChatRoom').then((module) => ({
    default: module.EditChatRoom,
  }))
);

const Chat = lazy(() =>
  import('../pages/chatRooms/Chat').then((module) => ({
    default: module.Chat,
  }))
);

const Dashboard = lazy(() =>
  import('../pages/dashboard/Dashboard').then((module) => ({
    default: module.Dashboard,
  }))
);

const Users = lazy(() =>
  import('../pages/users/Users').then((module) => ({
    default: module.Users,
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
    path: '/',
    component: Landing,
    title: 'KnowlEdge',
  },
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
    path: '/auth/forgot-password',
    component: ForgotPassword,
    layout: AuthLayout,
    title: 'KnowlEdge | Forgot Password',
  },
  {
    path: '/auth/reset-password',
    component: ResetPassword,
    layout: AuthLayout,
    title: 'KnowlEdge | Reset Password',
  },
  {
    path: '/auth/accept-invite',
    component: AcceptInvite,
    layout: AuthLayout,
    title: 'KnowlEdge | Accept Invite',
  },
  {
    path: '/dashboard',
    component: Dashboard,
    layout: DashboardSidebarLayout,
    title: 'KnowlEdge | Dashboard',
    requiredAuth: true,
    roles: [Roles.ADMIN, Roles.USER],
  },
  {
    path: '/chat-room',
    component: ChatRooms,
    layout: DashboardSidebarLayout,
    title: 'KnowlEdge | Chat Rooms',
    requiredAuth: true,
    roles: [Roles.ADMIN, Roles.USER],
  },
  {
    path: '/chat-room/:id/edit',
    component: EditChatRoom,
    layout: DashboardSidebarLayout,
    title: 'KnowlEdge | Edit Chat Rooms',
    requiredAuth: true,
    roles: [Roles.ADMIN],
  },
  {
    path: '/chat-room/:id',
    component: Chat,
    title: 'KnowlEdge | Chat',
    requiredAuth: true,
    roles: [Roles.ADMIN, Roles.USER],
  },
  {
    path: '/profile',
    component: Profile,
    layout: DashboardSidebarLayout,
    title: 'KnowlEdge | Profile',
    requiredAuth: true,
    roles: [Roles.ADMIN, Roles.USER],
  },
  {
    path: '/settings',
    component: Settings,
    layout: DashboardSidebarLayout,
    title: 'KnowlEdge | Settings',
    requiredAuth: true,
    roles: [Roles.ADMIN],
  },
  {
    path: '/user-management',
    component: Users,
    layout: DashboardSidebarLayout,
    title: 'KnowlEdge | Users',
    requiredAuth: true,
    roles: [Roles.ADMIN],
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
