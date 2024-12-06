import { lazy } from 'react';

const Home = lazy(() => import('pages/Home'));
const NotFound404 = lazy(() => import('pages/NotFound404'));
const Login = lazy(() => import('pages/auth/Login'));
const Dashboard = lazy(() => import('pages/Dashboard'));

export { Home, NotFound404, Login, Dashboard };
