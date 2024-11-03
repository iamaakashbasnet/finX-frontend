import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom';

import MainLayout from 'components/Layouts/Main';
import { Home, NotFound404, Login } from './lazypages';

const main = [{ title: 'Home', path: '/', element: <Home /> }];

const auth = [{ title: 'Login', path: '/login', element: <Login /> }];

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

      <Route path="*" element={<NotFound404 />} />
    </>
  )
);
