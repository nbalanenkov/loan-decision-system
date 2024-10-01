import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomSnackbar from './CustomSnackbar';

describe('CustomSnackbar Component', () => {
  it('renders and dismisses the snackbar', () => {
    const mockHandleClose = jest.fn();

    render(<CustomSnackbar open={true} handleClose={mockHandleClose} />);

    expect(
      screen.getByText(/Loan request submitted successfully!/i),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));

    expect(mockHandleClose).toHaveBeenCalled();
  });
});
