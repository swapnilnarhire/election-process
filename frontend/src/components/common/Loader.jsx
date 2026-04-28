import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loader = ({ message = 'Loading...' }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "200px",
        p: 3
      }}
    >
      <CircularProgress color="primary" />
      <Typography variant="body2" color="textSecondary" mt={2}>
        {message}
      </Typography>
    </Box>
  );
};

export default Loader;
