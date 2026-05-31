import './app/styles/main.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import { App } from './app/App';
import { ErrorBoundary } from './app/providers/error-boundary';
import { QueryProvider } from './app/providers/query-provider';
import { ThemeProvider } from './app/providers/theme/';

const root = document.querySelector('#root');

if (!root) throw new Error('Root container not found');

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryProvider>
        <ThemeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </QueryProvider>
    </ErrorBoundary>
  </StrictMode>,
);
