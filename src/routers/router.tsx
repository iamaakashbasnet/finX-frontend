import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom';

import MainLayout from 'components/Layouts/Main';
import DashboardLayout from 'components/Layouts/Dashboard';
import { Home, NotFound404, Login, Dashboard } from './lazypages';
import PrivateRoutes from './privateroutes';

const main = [{ title: 'Home', path: '/', element: <Home /> }];

const auth = [{ title: 'Login', path: '/login', element: <Login /> }];

const dashboard = [{ title: 'Dashboard', path: '/dashboard', element: <Dashboard /> }];

export const RouteConstructor = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        {main.map((mainSingle) => (
          <Route key={mainSingle.title} path={mainSingle.path} element={mainSingle.element} />
        ))}
      </Route>

      <Route path="*" element={<NotFound404 />} />
    </>
  )
);

export const SubDomainRouteConstructor = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to="/login" />} />

      {auth.map((authSingle) => (
        <Route key={authSingle.title} path={authSingle.path} element={authSingle.element} />
      ))}

      <Route path="/" element={<DashboardLayout />}>
        <Route element={<PrivateRoutes />}>
          {dashboard.map((dashboardSingle) => (
            <Route key={dashboardSingle.title} path={dashboardSingle.path} element={dashboardSingle.element} />
          ))}
        </Route>
      </Route>

      <Route path="*" element={<NotFound404 />} />
    </>
  )
);
