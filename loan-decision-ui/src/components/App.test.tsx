import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/extend-expect';
import { submitLoanRequest } from '../services/api';
import { LoanDecision } from '../types/types';

jest.mock('../services/api');
const mockSubmitLoanRequest = submitLoanRequest as jest.MockedFunction<
  typeof submitLoanRequest
>;

describe('App Component', () => {
  beforeEach(() => {
    mockSubmitLoanRequest.mockClear();
  });

  it('renders the form and successfully submits', async () => {
    mockSubmitLoanRequest.mockResolvedValueOnce({
      decision: LoanDecision.Approved,
      approvedLoanAmount: 5000,
      approvedLoanPeriod: 24,
    });

    render(<App />);

    fireEvent.change(screen.getByLabelText(/Personal Code/i), {
      target: { value: '49002010998' },
    });
    fireEvent.change(screen.getByLabelText(/Loan Amount/i), {
      target: { value: '5000' },
    });
    fireEvent.change(screen.getByLabelText(/Loan Period/i), {
      target: { value: '24' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/Decision: Approved/i)).toBeInTheDocument();
      expect(screen.getByText(/Approved amount: 5000€/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Approved loan period: 24 months/i),
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Loan request submitted successfully!/i),
      ).toBeInTheDocument();
    });
  });

  it('displays an error message if the API request fails', async () => {
    mockSubmitLoanRequest.mockRejectedValueOnce(new Error('Network Error'));

    render(<App />);

    fireEvent.change(screen.getByLabelText(/Personal Code/i), {
      target: { value: '49002010998' },
    });
    fireEvent.change(screen.getByLabelText(/Loan Amount/i), {
      target: { value: '5000' },
    });
    fireEvent.change(screen.getByLabelText(/Loan Period/i), {
      target: { value: '24' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/An unknown error occurred. Please try again./i),
      ).toBeInTheDocument();
    });
  });

  it('displays an error message for "Unknown personal code"', async () => {
    mockSubmitLoanRequest.mockRejectedValueOnce({
      isAxiosError: true,
      response: {
        data: {
          messages: ['Unknown personal code'],
        },
      },
    });

    render(<App />);

    fireEvent.change(screen.getByLabelText(/Personal Code/i), {
      target: { value: '12345678901' },
    });
    fireEvent.change(screen.getByLabelText(/Loan Amount/i), {
      target: { value: '5000' },
    });
    fireEvent.change(screen.getByLabelText(/Loan Period/i), {
      target: { value: '24' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(mockSubmitLoanRequest).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          /The personal code you entered is not recognized. Please check and try again./i,
        ),
      ).toBeInTheDocument();
    });
  });

  it('displays a fallback error message when no specific error message is provided', async () => {
    mockSubmitLoanRequest.mockRejectedValueOnce({
      isAxiosError: true,
      response: {
        data: {
          messages: [],
        },
      },
    });

    render(<App />);

    fireEvent.change(screen.getByLabelText(/Personal Code/i), {
      target: { value: '12345678901' },
    });
    fireEvent.change(screen.getByLabelText(/Loan Amount/i), {
      target: { value: '5000' },
    });
    fireEvent.change(screen.getByLabelText(/Loan Period/i), {
      target: { value: '24' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(
        screen.getByText(
          /Failed to submit loan request. Please try again later!/i,
        ),
      ).toBeInTheDocument();
    });
  });

  it('shows the snackbar after successful submission and allows closing', async () => {
    mockSubmitLoanRequest.mockResolvedValueOnce({
      decision: LoanDecision.Approved,
      approvedLoanAmount: 5000,
      approvedLoanPeriod: 24,
    });

    render(<App />);

    fireEvent.change(screen.getByLabelText(/Personal Code/i), {
      target: { value: '49002010998' },
    });
    fireEvent.change(screen.getByLabelText(/Loan Amount/i), {
      target: { value: '5000' },
    });
    fireEvent.change(screen.getByLabelText(/Loan Period/i), {
      target: { value: '24' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Loan request submitted successfully!/i),
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId(/CloseIcon/i));

    await waitFor(() => {
      expect(
        screen.queryByText(/Loan request submitted successfully!/i),
      ).not.toBeInTheDocument();
    });
  });
});
