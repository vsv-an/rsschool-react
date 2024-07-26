import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>,
);
