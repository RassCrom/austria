import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import store from './store/store.jsx';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query'; // Импортируйте QueryClient и QueryClientProvider

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
);
