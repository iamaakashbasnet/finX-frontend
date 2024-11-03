import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { createTheme, MantineProvider } from '@mantine/core';

import RouteConstructor from 'routers/router';

const theme = createTheme({
  fontFamily:
    "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
});

const App = () => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Suspense fallback={<h1>Loading...</h1>}>
        <RouterProvider router={RouteConstructor} />
      </Suspense>
    </MantineProvider>
  );
};

export default App;
