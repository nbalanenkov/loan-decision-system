import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoanForm from './LoanForm';
import '@testing-library/jest-dom/extend-expect';

describe('LoanForm Component', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders the form with all inputs and a submit button', () => {
    render(<LoanForm onSubmit={mockOnSubmit} loading={false} />);

    expect(screen.getByLabelText(/Personal Code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Loan Amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Loan Period/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  it('displays validation errors when fields are empty', async () => {
    render(<LoanForm onSubmit={mockOnSubmit} loading={false} />);

    fireEvent.change(screen.getByLabelText(/Loan Amount/i), {
      target: { value: '' },
    });
    fireEvent.change(screen.getByLabelText(/Loan Period/i), {
      target: { value: '' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    expect(
      await screen.findByText(/Personal code is required/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Loan amount is required/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Loan period is required/i),
    ).toBeInTheDocument();
  });

  it('displays validation errors when fields are incorrect', async () => {
    render(<LoanForm onSubmit={mockOnSubmit} loading={false} />);

    fireEvent.change(screen.getByLabelText(/Personal Code/i), {
      target: { value: '1234' },
    });
    fireEvent.change(screen.getByLabelText(/Loan Amount/i), {
      target: { value: '1000' },
    });
    fireEvent.change(screen.getByLabelText(/Loan Period/i), {
      target: { value: '10' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    expect(
      await screen.findByText(/Personal code must be exactly 11 digits long/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Loan amount must be at least €2000/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Loan period must be at least 12 months/i),
    ).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Personal Code/i), {
      target: { value: 'adkasfjadsia' },
    });
    fireEvent.change(screen.getByLabelText(/Loan Amount/i), {
      target: { value: '12000' },
    });
    fireEvent.change(screen.getByLabelText(/Loan Period/i), {
      target: { value: '80' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    expect(
      await screen.findByText(/Personal code can only contain numbers/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Loan amount must not exceed €10000/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Loan period must not exceed 60 months/i),
    ).toBeInTheDocument();
  });

  it('calls onSubmit with correct data when form is valid', async () => {
    render(<LoanForm onSubmit={mockOnSubmit} loading={false} />);

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
      expect(mockOnSubmit).toHaveBeenCalled();

      const firstArgument = mockOnSubmit.mock.calls[0][0];

      expect(firstArgument).toEqual({
        personalCode: '12345678901',
        loanAmount: 5000,
        loanPeriod: 24,
      });
    });
  });

  it('displays the loading spinner when loading is true', async () => {
    render(<LoanForm onSubmit={mockOnSubmit} loading={true} />);

    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeDisabled();

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    expect(screen.queryByText('Submit')).not.toBeInTheDocument();
  });

  it('displays the "Submit" text when loading is false', async () => {
    render(<LoanForm onSubmit={mockOnSubmit} loading={false} />);

    const submitButton = screen.getByRole('button', { name: /Submit/i });
    expect(submitButton).not.toBeDisabled();

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();

    expect(submitButton).toHaveTextContent('Submit');
  });
});
