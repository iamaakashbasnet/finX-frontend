import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import MainLayout from 'components/Layouts/Main';
import { Home, NotFound404 } from './lazypages';

const main = [{ title: 'Home', path: '/', element: <Home /> }];

const RouteConstructor = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        {main.map((single) => (
          <Route key={single.title} path={single.path} element={single.element} />
        ))}
      </Route>

      <Route path="*" element={<NotFound404 />} />
    </>
  )
);

export default RouteConstructor;
