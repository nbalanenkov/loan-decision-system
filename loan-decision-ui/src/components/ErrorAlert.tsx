import React from 'react';
import { Alert, Box } from '@mui/material';

interface ErrorAlertProps {
  error: string | null;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ error }) => {
  if (!error) {
    return null;
  }

  return (
    <Box mt={2}>
      <Alert severity="error">{error}</Alert>
    </Box>
  );
};

export default ErrorAlert;
