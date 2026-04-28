import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';
import { selectGlobalError } from '../../features/election/electionSelectors';
import { clearGlobalError } from '../../features/election/electionSlice';

const GlobalSnackbar = () => {
  const dispatch = useDispatch();
  const globalError = useSelector(selectGlobalError);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(clearGlobalError());
  };

  return (
    <Snackbar
      open={!!globalError}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {typeof globalError === 'string' ? globalError : 'An unexpected error occurred.'}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
