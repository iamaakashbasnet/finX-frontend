import { lazy } from 'react';

const Home = lazy(() => import('pages/Home'));
const NotFound404 = lazy(() => import('pages/NotFound404'));

export { Home, NotFound404 };
