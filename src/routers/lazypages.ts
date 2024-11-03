import { lazy } from 'react';

const Home = lazy(() => import('pages/Home'));
const NotFound404 = lazy(() => import('pages/NotFound404'));
const Login = lazy(() => import('pages/auth/Login'));

export { Home, NotFound404, Login };
