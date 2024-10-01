import React from 'react';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { Formik, Field, Form, FieldProps } from 'formik';
import * as Yup from 'yup';
import { LoanRequest } from '../types/types';

interface LoanFormProps {
  onSubmit: (values: LoanRequest) => Promise<void>;
  loading: boolean;
}

const validationSchema = Yup.object().shape({
  personalCode: Yup.string()
    .matches(/^[0-9]+$/, 'Personal code can only contain numbers')
    .length(11, 'Personal code must be exactly 11 digits long')
    .required('Personal code is required'),
  loanAmount: Yup.number()
    .min(2000, 'Loan amount must be at least €2000')
    .max(10000, 'Loan amount must not exceed €10000')
    .required('Loan amount is required'),
  loanPeriod: Yup.number()
    .min(12, 'Loan period must be at least 12 months')
    .max(60, 'Loan period must not exceed 60 months')
    .required('Loan period is required'),
});

const LoanForm: React.FC<LoanFormProps> = ({ onSubmit, loading }) => {
  return (
    <Formik
      initialValues={{
        personalCode: '',
        loanAmount: 2000,
        loanPeriod: 12,
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box mb={2}>
            <Field name="personalCode">
              {({ field, meta }: FieldProps) => (
                <TextField
                  {...field}
                  label="Personal Code"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={meta.touched && Boolean(meta.error)}
                  helperText={meta.touched && meta.error ? meta.error : null}
                />
              )}
            </Field>
          </Box>
          <Box mb={2}>
            <Field name="loanAmount">
              {({ field, meta }: FieldProps) => (
                <TextField
                  {...field}
                  label="Loan Amount (€)"
                  type="number"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={meta.touched && Boolean(meta.error)}
                  helperText={meta.touched && meta.error ? meta.error : null}
                />
              )}
            </Field>
          </Box>
          <Box mb={2}>
            <Field name="loanPeriod">
              {({ field, meta }: FieldProps) => (
                <TextField
                  {...field}
                  label="Loan Period (months)"
                  type="number"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={meta.touched && Boolean(meta.error)}
                  helperText={meta.touched && meta.error ? meta.error : null}
                />
              )}
            </Field>
          </Box>
          <Box mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting || loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default LoanForm;
