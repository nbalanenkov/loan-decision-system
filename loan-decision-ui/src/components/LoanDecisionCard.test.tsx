import React from 'react';
import { render, screen } from '@testing-library/react';
import LoanDecisionCard from './LoanDecisionCard';
import { LoanDecision, LoanResponse } from '../types/types';

describe('LoanDecision Component', () => {
  it('renders approved decision correctly', () => {
    const response: LoanResponse = {
      decision: LoanDecision.Approved,
      approvedLoanAmount: 5000,
      approvedLoanPeriod: 24,
    };

    render(<LoanDecisionCard response={response} />);

    expect(screen.getByText(/Decision: Approved/i)).toBeInTheDocument();
    expect(screen.getByText(/Approved amount: 5000€/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Approved loan period: 24 months/i),
    ).toBeInTheDocument();
  });

  it('renders rejected decision correctly', () => {
    const response: LoanResponse = {
      decision: LoanDecision.Rejected,
      reason: 'There is an active debt associated with provided personal code',
    };

    render(<LoanDecisionCard response={response} />);

    expect(screen.getByText(/Decision: Rejected/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Reason: There is an active debt associated with provided personal code/i,
      ),
    ).toBeInTheDocument();
  });
});
