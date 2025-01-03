import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './components/App.jsx'
import AppProvider from './contexts/AppProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
        <App />
    </AppProvider>
  </StrictMode>
)
