import { createTheme, MantineProvider } from '@mantine/core';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import RouteConstructor from 'routers/router';

const theme = createTheme({
  fontFamily:
    "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
});

const App = () => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <React.Suspense fallback={<h1>Loading...</h1>}>
        <RouterProvider router={RouteConstructor} />
      </React.Suspense>
    </MantineProvider>
  );
};

export default App;
