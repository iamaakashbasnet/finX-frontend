import { lazy } from 'react';

const Home = lazy(() => import('pages/Home'));
const NotFound404 = lazy(() => import('pages/NotFound404'));
const Login = lazy(() => import('pages/auth/Login'));
const Dashboard = lazy(() => import('pages/Dashboard'));
const GeneralClients = lazy(() => import('pages/clients/GeneralClients'));
const PoolClients = lazy(() => import('pages/clients/PoolClients'));
const Executives = lazy(() => import('pages/firm/Executives'));
const Managers = lazy(() => import('pages/firm/Managers'));

export { Home, NotFound404, Login, Dashboard, GeneralClients, PoolClients, Executives, Managers };
