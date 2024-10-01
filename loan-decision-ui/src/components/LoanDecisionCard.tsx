import React from 'react';
import { Box, Card, CardContent, Typography, Divider } from '@mui/material';
import { LoanResponse } from '../types/types';

interface LoanDecisionProps {
  response: LoanResponse;
}

const LoanDecisionCard: React.FC<LoanDecisionProps> = ({ response }) => {
  return (
    <Box mt={4}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h6" align="center">
            Decision:{' '}
            {response?.decision === 'approved' ? 'Approved' : 'Rejected'}
          </Typography>
          <Divider sx={{ my: 2 }} />
          {response?.decision === 'approved' ? (
            <>
              <Typography variant="h6" align="center">
                Approved amount: {response.approvedLoanAmount}€
              </Typography>
              <Typography variant="h6" align="center">
                Approved loan period: {response.approvedLoanPeriod} months
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h6" align="center">
                Reason: {response?.reason}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoanDecisionCard;
