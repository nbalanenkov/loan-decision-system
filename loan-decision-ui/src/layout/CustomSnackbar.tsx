import React from 'react';
import { Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface CustomSnackbarProps {
  open: boolean;
  handleClose: () => void;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  open,
  handleClose,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={50000}
      onClose={handleClose}
      message="Loan request submitted successfully!"
      action={
        <IconButton size="small" color="inherit" onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  );
};

export default CustomSnackbar;
