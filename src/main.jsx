import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query';
import './css/index.css'
import App from './components/App.jsx'
import AppProvider from './contexts/AppProvider.jsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
          <App />
      </AppProvider>
    </QueryClientProvider>
  </StrictMode>
)
