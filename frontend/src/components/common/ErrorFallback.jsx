import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "300px",
        p: 3,
        textAlign: "center"
      }}
    >
      <Typography variant="h5" color="error" gutterBottom>
        Something went wrong
      </Typography>
      <Typography variant="body1" color="textSecondary" mb={3}>
        {error.message || 'An unexpected UI error occurred.'}
      </Typography>
      {resetErrorBoundary && (
        <Button variant="contained" color="primary" onClick={resetErrorBoundary}>
          Try Again
        </Button>
      )}
    </Box>
  );
};

export default ErrorFallback;
