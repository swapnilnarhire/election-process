import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Box, CssBaseline } from '@mui/material';
import AppRoutes from './routes';
import ErrorFallback from './components/common/ErrorFallback';
import GlobalSnackbar from './components/common/GlobalSnackbar';

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
        {/* Main Content Area */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <AppRoutes />
        </Box>
        {/* Global Error Toast */}
        <GlobalSnackbar />
      </Box>
    </ErrorBoundary>
  );
};

export default App;
