import { createBrowserRouter } from 'react-router-dom';

import HomePage from 'pages/Home';
import Main from 'components/Layouts/Main';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [{ path: '/', element: <HomePage /> }],
  },
]);

export default router;
