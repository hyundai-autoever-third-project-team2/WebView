import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme.ts';
import { initializeLog } from 'utils/log.ts';

const queryClient = new QueryClient();

initializeLog();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
          <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
