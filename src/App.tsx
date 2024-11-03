import { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { createTheme, MantineProvider } from '@mantine/core';

import { RouteConstructor, SubDomainRouteConstructor } from 'routers/router';
import Loading from 'pages/Loading';
import apiClient from 'api/apiClient';

const theme = createTheme({
  fontFamily:
    "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
});

const App = () => {
  useEffect(() => {
    if (window.location.hostname.split('.').length > 1) {
      apiClient.defaults.baseURL = `http://${window.location.hostname.split('.')[0]}.localhost:8000`;
    } else {
      apiClient.defaults.baseURL = 'http://localhost:8000';
    }
  }, []);

  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Suspense fallback={<Loading />}>
        <RouterProvider
          router={window.location.hostname.split('.').length > 1 ? SubDomainRouteConstructor : RouteConstructor}
        />
      </Suspense>
    </MantineProvider>
  );
};

export default App;
