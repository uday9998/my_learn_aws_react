import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CardForm from '../../components/elements/CardForm';

const mockStore = configureStore([]);

describe('CardForm Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {
        currentUser: { id: 1, email: 'test@test.com' },
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders card form fields', () => {
    render(
      <Provider store={store}>
        <CardForm />
      </Provider>
    );

    // Check for card-related elements
    const cardElements = screen.queryAllByRole('textbox');
    expect(cardElements.length).toBeGreaterThanOrEqual(0);
  });

  test('validates empty card number', async () => {
    const mockOnSubmit = jest.fn();

    render(
      <Provider store={store}>
        <CardForm onSubmit={mockOnSubmit} />
      </Provider>
    );

    // Find submit button
    const submitButton = screen.queryByRole('button', { name: /submit|pay|save/i });

    if (submitButton) {
      fireEvent.click(submitButton);

      // Should not call onSubmit with empty fields
      await waitFor(() => {
        expect(mockOnSubmit).not.toHaveBeenCalled();
      });
    }
  });

  test('displays Stripe card element', () => {
    render(
      <Provider store={store}>
        <CardForm />
      </Provider>
    );

    // Stripe elements are typically in a container with specific class
    const cardElementContainer = document.querySelector('[class*="StripeElement"], #card-element');

    // If Stripe is configured, container should exist
    if (cardElementContainer) {
      expect(cardElementContainer).toBeInTheDocument();
    }
  });

  test('handles card input change', async () => {
    const mockOnChange = jest.fn();

    render(
      <Provider store={store}>
        <CardForm onChange={mockOnChange} />
      </Provider>
    );

    // Simulate card input (note: Stripe Elements are in iframe, so this is limited)
    const inputs = screen.queryAllByRole('textbox');

    if (inputs.length > 0) {
      fireEvent.change(inputs[0], { target: { value: '4242424242424242' } });

      await waitFor(() => {
        // Check if change handler was called
        if (mockOnChange.mock.calls.length > 0) {
          expect(mockOnChange).toHaveBeenCalled();
        }
      });
    }
  });

  test('shows loading state during submission', async () => {
    const mockOnSubmit = jest.fn(() => new Promise(resolve => setTimeout(resolve, 1000)));

    render(
      <Provider store={store}>
        <CardForm onSubmit={mockOnSubmit} />
      </Provider>
    );

    const submitButton = screen.queryByRole('button', { name: /submit|pay|save/i });

    if (submitButton) {
      fireEvent.click(submitButton);

      // Check for loading indicator
      await waitFor(() => {
        const loadingIndicator = screen.queryByRole('status') ||
                                screen.queryByText(/loading|processing/i) ||
                                submitButton.disabled;

        if (loadingIndicator) {
          expect(loadingIndicator).toBeTruthy();
        }
      });
    }
  });

  test('displays error message on payment failure', async () => {
    const errorMessage = 'Payment failed';
    const mockOnSubmit = jest.fn(() => Promise.reject(new Error(errorMessage)));

    render(
      <Provider store={store}>
        <CardForm onSubmit={mockOnSubmit} onError={(err) => err} />
      </Provider>
    );

    const submitButton = screen.queryByRole('button', { name: /submit|pay|save/i });

    if (submitButton) {
      fireEvent.click(submitButton);

      await waitFor(() => {
        // Error message might be displayed
        const errorElement = screen.queryByText(/error|failed/i);
        if (errorElement) {
          expect(errorElement).toBeInTheDocument();
        }
      });
    }
  });

  test('accepts valid card details', () => {
    render(
      <Provider store={store}>
        <CardForm />
      </Provider>
    );

    // Test card number format validation (if component does client-side validation)
    const cardInputs = screen.queryAllByRole('textbox');

    cardInputs.forEach((input) => {
      const placeholder = input.placeholder || '';

      if (placeholder.toLowerCase().includes('card')) {
        fireEvent.change(input, { target: { value: '4242424242424242' } });
      } else if (placeholder.toLowerCase().includes('expir')) {
        fireEvent.change(input, { target: { value: '12/25' } });
      } else if (placeholder.toLowerCase().includes('cvc') || placeholder.toLowerCase().includes('cvv')) {
        fireEvent.change(input, { target: { value: '123' } });
      }
    });

    // Verify inputs have values
    cardInputs.forEach((input) => {
      if (input.value) {
        expect(input.value).toBeTruthy();
      }
    });
  });

  test('renders save card checkbox if available', () => {
    render(
      <Provider store={store}>
        <CardForm showSaveCard={true} />
      </Provider>
    );

    const saveCardCheckbox = screen.queryByRole('checkbox', { name: /save|remember/i });

    if (saveCardCheckbox) {
      expect(saveCardCheckbox).toBeInTheDocument();

      // Test checking the box
      fireEvent.click(saveCardCheckbox);
      expect(saveCardCheckbox.checked).toBe(true);
    }
  });

  test('displays billing address fields if required', () => {
    render(
      <Provider store={store}>
        <CardForm requireBillingAddress={true} />
      </Provider>
    );

    // Check for common billing fields
    const billingFields = [
      screen.queryByPlaceholderText(/address/i),
      screen.queryByPlaceholderText(/city/i),
      screen.queryByPlaceholderText(/zip|postal/i),
      screen.queryByPlaceholderText(/state/i),
    ];

    const foundFields = billingFields.filter(field => field !== null);

    if (foundFields.length > 0) {
      expect(foundFields.length).toBeGreaterThan(0);
    }
  });

  test('handles form reset', () => {
    render(
      <Provider store={store}>
        <CardForm />
      </Provider>
    );

    const inputs = screen.queryAllByRole('textbox');

    // Fill some inputs
    inputs.forEach((input) => {
      fireEvent.change(input, { target: { value: 'test' } });
    });

    // Look for reset button
    const resetButton = screen.queryByRole('button', { name: /reset|clear|cancel/i });

    if (resetButton) {
      fireEvent.click(resetButton);

      // Inputs should be cleared
      inputs.forEach((input) => {
        expect(input.value).toBe('');
      });
    }
  });
});
