import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorAlert from './ErrorAlert';
import '@testing-library/jest-dom/extend-expect';

describe('ErrorAlert Component', () => {
  it('displays the error message when error prop is provided', () => {
    const errorMessage =
      'The personal code you entered is not recognized. Please check and try again.';

    render(<ErrorAlert error={errorMessage} />);

    expect(
      screen.getByText(
        /The personal code you entered is not recognized. Please check and try again./i,
      ),
    ).toBeInTheDocument();
  });

  it('does not render anything when error prop is null', () => {
    const { container } = render(<ErrorAlert error={null} />);

    expect(container.firstChild).toBeNull();
  });
});
