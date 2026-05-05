import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Box, CssBaseline } from '@mui/material';
import AppRoutes from './routes';
import Navbar from './components/layout/Navbar';
import ErrorFallback from './components/common/ErrorFallback';
import GlobalSnackbar from './components/common/GlobalSnackbar';

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
        <Navbar />
        {/* Main Content Area */}
        <Box component="main" sx={{ flexGrow: 1 }}>
          <AppRoutes />
        </Box>
        {/* Global Error Toast */}
        <GlobalSnackbar />
      </Box>
    </ErrorBoundary>
  );
};

export default App;
