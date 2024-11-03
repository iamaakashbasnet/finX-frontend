import { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { createTheme, MantineProvider } from '@mantine/core';

import RouteConstructor from 'routers/router';
import Loading from 'pages/Loading';
import apiClient from 'api/apiClient'; // Ensure you have the axios instance setup

const theme = createTheme({
  fontFamily:
    "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
});

const App = () => {
  useEffect(() => {
    const hostname = window.location.hostname;
    const hostnameParts = hostname.split('.');

    if (hostnameParts.length > 1) {
      const hostnameTenant = hostnameParts[0];
      apiClient.defaults.baseURL = `http://${hostnameTenant}.localhost:8000`;
    } else {
      apiClient.defaults.baseURL = 'http://localhost:8000';
    }
  }, []);

  useEffect(() => {
    apiClient
      .get('/')
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error('API request failed:', err);
      });
  }, []);

  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Suspense fallback={<Loading />}>
        <RouterProvider router={RouteConstructor} />
      </Suspense>
    </MantineProvider>
  );
};

export default App;
