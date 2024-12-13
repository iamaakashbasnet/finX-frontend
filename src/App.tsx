import { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { createTheme, MantineProvider } from '@mantine/core';
import { useDispatch } from 'react-redux';

import Loading from 'pages/Loading';
import apiClient from 'api/apiClient';
import { RouteConstructor, SubDomainRouteConstructor } from 'routers/router';
import { reAuth } from 'state/user/userSlice';
import { AppDispatch } from 'state/store';

const theme = createTheme({
  fontFamily:
    "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
});

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (window.location.hostname.split('.').length > 1) {
      apiClient.defaults.baseURL = `http://${window.location.hostname.split('.')[0]}.localhost:8000`;
    } else {
      apiClient.defaults.baseURL = 'http://localhost:8000';
    }
  }, []);

  useEffect(() => {
    void dispatch(reAuth());

    // Create a Blob object with the worker logic
    const workerBlob = new Blob([
      `
        setInterval(() => {
          self.postMessage('dispatch reAuthAsync');
        }, 4 * 60 * 1000); // 4 minutes in milliseconds
      `,
    ]);

    const worker = new Worker(URL.createObjectURL(workerBlob));

    // Listen for messages from the worker
    worker.onmessage = (event) => {
      if (event.data === 'dispatch reAuthAsync') {
        // Dispatch reAuth when message received
        void dispatch(reAuth());
      }
    };

    return () => {
      worker.terminate();
    };
  }, [dispatch]);

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
