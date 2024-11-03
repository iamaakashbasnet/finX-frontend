import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { createTheme, MantineProvider } from '@mantine/core';

import RouteConstructor from 'routers/router';
import Loading from 'pages/Loading';

const theme = createTheme({
  fontFamily:
    "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
});

const App = () => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Suspense fallback={<Loading />}>
        <RouterProvider router={RouteConstructor} />
      </Suspense>
    </MantineProvider>
  );
};

export default App;
