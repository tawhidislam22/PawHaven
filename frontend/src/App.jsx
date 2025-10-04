
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import router from './routes/Route';
import AuthProvider from './Providers/AuthProvider';
import { WatchlistProvider } from './contexts/WatchlistContext';


// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <WatchlistProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" />
        </WatchlistProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
