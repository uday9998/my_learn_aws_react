import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import CreditCardForm from '../components/modules/checkout/CreditCardForm';

describe('CreditCardForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders credit card input fields', () => {
    render(<CreditCardForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/card number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/expiry date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cvv/i)).toBeInTheDocument();
  });

  test('validates card number format', async () => {
    render(<CreditCardForm onSubmit={mockOnSubmit} />);

    const cardInput = screen.getByLabelText(/card number/i);

    // Invalid card number
    await userEvent.type(cardInput, '1234');
    fireEvent.blur(cardInput);

    await waitFor(() => {
      expect(screen.getByText(/invalid card number/i)).toBeInTheDocument();
    });
  });

  test('formats card number with spaces', async () => {
    render(<CreditCardForm onSubmit={mockOnSubmit} />);

    const cardInput = screen.getByLabelText(/card number/i);

    await userEvent.type(cardInput, '4111111111111111');

    expect(cardInput.value).toBe('4111 1111 1111 1111');
  });

  test('detects Visa card type', async () => {
    render(<CreditCardForm onSubmit={mockOnSubmit} />);

    const cardInput = screen.getByLabelText(/card number/i);

    await userEvent.type(cardInput, '4111111111111111');

    await waitFor(() => {
      expect(screen.getByAltText(/visa/i)).toBeInTheDocument();
    });
  });

  test('detects Mastercard card type', async () => {
    render(<CreditCardForm onSubmit={mockOnSubmit} />);

    const cardInput = screen.getByLabelText(/card number/i);

    await userEvent.type(cardInput, '5555555555554444');

    await waitFor(() => {
      expect(screen.getByAltText(/mastercard/i)).toBeInTheDocument();
    });
  });

  test('detects American Express card type', async () => {
    render(<CreditCardForm onSubmit={mockOnSubmit} />);

    const cardInput = screen.getByLabelText(/card number/i);

    await userEvent.type(cardInput, '378282246310005');

    await waitFor(() => {
      expect(screen.getByAltText(/american express/i)).toBeInTheDocument();
    });
  });

  test('validates expiry date format', async () => {
    render(<CreditCardForm onSubmit={mockOnSubmit} />);

    const expiryInput = screen.getByLabelText(/expiry date/i);

    // Invalid format
    await userEvent.type(expiryInput, '13/25');

    await waitFor(() => {
      expect(screen.getByText(/invalid expiry date/i)).toBeInTheDocument();
    });
  });

  test('formats expiry date as MM/YY', async () => {
    render(<CreditCardForm onSubmit={mockOnSubmit} />);

    const expiryInput = screen.getByLabelText(/expiry date/i);

    await userEvent.type(expiryInput, '1225');

    expect(expiryInput.value).toBe('12/25');
  });

  test('validates expiry date is not in the past', async () => {
    render(<CreditCardForm onSubmit={mockOnSubmit} />);

    const expiryInput = screen.getByLabelText(/expiry date/i);

    // Past date
    await userEvent.type(expiryInput, '01/20');

    await waitFor(() => {
      expect(screen.getByText(/card has expired/i)).toBeInTheDocument();
    });
  });

  test('validates CVV length for Visa/Mastercard', async () => {
    render(<CreditCardForm onSubmit={mockOnSubmit} />);

    const cvvInput = screen.getByLabelText(/cvv/i);

    // Too short
    await userEvent.type(cvvInput, '12');
    fireEvent.blur(cvvInput);

    await waitFor(() => {
      expect(screen.getByText(/invalid cvv/i)).toBeInTheDocument();
    });
  });

  test('validates CVV length for American Express', async () => {
    render(<CreditCardForm onSubmit={mockOnSubmit} />);

    const cardInput = screen.getByLabelText(/card number/i);
    const cvvInput = screen.getByLabelText(/cvv/i);

    // Amex card
    await userEvent.type(cardInput, '378282246310005');

    // Amex requires 4 digits
    await userEvent.type(cvvInput, '123');
    fireEvent.blur(cvvInput);

    await waitFor(() => {
      expect(screen.getByText(/invalid cvv/i)).toBeInTheDocument();
    });
  });

  test('accepts valid CVV for Visa/Mastercard', async () => {
    render(<CreditCardForm onSubmit={mockOnSubmit} />);

    const cvvInput = screen.getByLabelText(/cvv/i);

    await userEvent.type(cvvInput, '123');

    // No error should be shown
    expect(screen.queryByText(/invalid cvv/i)).not.toBeInTheDocument();
  });

  test('prevents non-numeric input in card number', async () => {
    render(<CreditCardForm onSubmit={mockOnSubmit} />);

    const cardInput = screen.getByLabelText(/card number/i);

    await userEvent.type(cardInput, 'abcd1234');

    // Only numbers should be accepted
    expect(cardInput.value).toBe('1234');
  });

  test('prevents non-numeric input in CVV', async () => {
    render(<CreditCardForm onSubmit={mockOnSubmit} />);

    const cvvInput = screen.getByLabelText(/cvv/i);

    await userEvent.type(cvvInput, 'abc123');

    expect(cvvInput.value).toBe('123');
  });

  test('submits form with valid data', async () => {
    render(<CreditCardForm onSubmit={mockOnSubmit} />);

    const cardInput = screen.getByLabelText(/card number/i);
    const expiryInput = screen.getByLabelText(/expiry date/i);
    const cvvInput = screen.getByLabelText(/cvv/i);

    await userEvent.type(cardInput, '4111111111111111');
    await userEvent.type(expiryInput, '12/25');
    await userEvent.type(cvvInput, '123');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        cardNumber: '4111111111111111',
        expiry: '12/25',
        cvv: '123',
      });
    });
  });

  test('does not submit form with invalid data', async () => {
    render(<CreditCardForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  test('limits card number to 16 digits for most cards', async () => {
    render(<CreditCardForm onSubmit={mockOnSubmit} />);

    const cardInput = screen.getByLabelText(/card number/i);

    await userEvent.type(cardInput, '41111111111111111111');

    // Should be limited to 16 digits with spaces
    expect(cardInput.value.replace(/\s/g, '')).toHaveLength(16);
  });

  test('limits card number to 15 digits for Amex', async () => {
    render(<CreditCardForm onSubmit={mockOnSubmit} />);

    const cardInput = screen.getByLabelText(/card number/i);

    await userEvent.type(cardInput, '3782822463100051111');

    // Amex should be limited to 15 digits
    expect(cardInput.value.replace(/\s/g, '')).toHaveLength(15);
  });

  test('shows card security icons', () => {
    render(<CreditCardForm onSubmit={mockOnSubmit} />);

    // Should show security badges
    expect(screen.getByAltText(/secure/i) || screen.getByText(/secure/i)).toBeInTheDocument();
  });
});
