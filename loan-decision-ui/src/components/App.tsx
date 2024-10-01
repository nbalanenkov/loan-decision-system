import React, { useState } from 'react';
import { Container, Typography, Card, CardContent } from '@mui/material';
import LoanForm from '../forms/LoanForm';
import LoanDecisionCard from './LoanDecisionCard';
import CustomSnackbar from '../layout/CustomSnackbar';
import ErrorAlert from './ErrorAlert';
import { LoanRequest, LoanResponse } from '../types/types';
import axios from 'axios';
import { submitLoanRequest } from '../services/api';

const App: React.FC = () => {
  const [response, setResponse] = useState<LoanResponse>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = async (values: LoanRequest) => {
    setLoading(true);
    setError(null);
    try {
      const data = await submitLoanRequest(values);
      setResponse(data);
      setSnackbarOpen(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.messages?.[0];
        if (errorMessage === 'Unknown personal code') {
          setError(
            'The personal code you entered is not recognized. Please check and try again.',
          );
        } else {
          setError(
            errorMessage ||
              'Failed to submit loan request. Please try again later!',
          );
        }
      } else {
        setError('An unknown error occurred. Please try again.');
      }
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="sm" sx={{ padding: 4, marginTop: 5 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Loan Decision Engine
      </Typography>
      <Card elevation={3} sx={{ padding: 2 }}>
        <CardContent>
          <LoanForm onSubmit={handleSubmit} loading={loading} />
          {error && <ErrorAlert error={error} />}
        </CardContent>
      </Card>
      {response && <LoanDecisionCard response={response} />}
      <CustomSnackbar open={snackbarOpen} handleClose={handleCloseSnackbar} />
    </Container>
  );
};

export default App;
