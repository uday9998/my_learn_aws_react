import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LoginContainer from '../containers/pages/guest/auth/LoginContainer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('LoginContainer', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        isAuthenticated: false,
        user: null,
        error: null,
      },
    });
  });

  test('renders login form', () => {
    render(
      <Provider store={store}>
        <LoginContainer />
      </Provider>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('displays validation errors for empty email', async () => {
    render(
      <Provider store={store}>
        <LoginContainer />
      </Provider>
    );

    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
  });

  test('displays validation errors for invalid email format', async () => {
    render(
      <Provider store={store}>
        <LoginContainer />
      </Provider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    });
  });

  test('displays validation errors for empty password', async () => {
    render(
      <Provider store={store}>
        <LoginContainer />
      </Provider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  test('submits form with valid credentials', async () => {
    render(
      <Provider store={store}>
        <LoginContainer />
      </Provider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions.length).toBeGreaterThan(0);
    });
  });

  test('displays error message on login failure', async () => {
    const storeWithError = mockStore({
      auth: {
        isAuthenticated: false,
        user: null,
        error: 'Invalid credentials',
      },
    });

    render(
      <Provider store={storeWithError}>
        <LoginContainer />
      </Provider>
    );

    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });

  test('disables submit button while loading', async () => {
    const loadingStore = mockStore({
      auth: {
        isAuthenticated: false,
        user: null,
        error: null,
        loading: true,
      },
    });

    render(
      <Provider store={loadingStore}>
        <LoginContainer />
      </Provider>
    );

    const submitButton = screen.getByRole('button', { name: /login/i });
    expect(submitButton).toBeDisabled();
  });

  test('shows remaining attempts after failed login', async () => {
    const storeWithAttempts = mockStore({
      auth: {
        isAuthenticated: false,
        user: null,
        error: 'Wrong credentials!',
        attemptsRemaining: 3,
      },
    });

    render(
      <Provider store={storeWithAttempts}>
        <LoginContainer />
      </Provider>
    );

    expect(screen.getByText(/3 attempts remaining/i)).toBeInTheDocument();
  });

  test('shows account lockout message', async () => {
    const lockedStore = mockStore({
      auth: {
        isAuthenticated: false,
        user: null,
        error: 'Account locked for 30 minutes',
        locked: true,
      },
    });

    render(
      <Provider store={lockedStore}>
        <LoginContainer />
      </Provider>
    );

    expect(screen.getByText(/account locked/i)).toBeInTheDocument();
  });

  test('has password visibility toggle', () => {
    render(
      <Provider store={store}>
        <LoginContainer />
      </Provider>
    );

    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toHaveAttribute('type', 'password');

    const toggleButton = screen.getByRole('button', { name: /show password/i });
    fireEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  test('clears error on input change', async () => {
    const storeWithError = mockStore({
      auth: {
        isAuthenticated: false,
        user: null,
        error: 'Invalid credentials',
      },
    });

    render(
      <Provider store={storeWithError}>
        <LoginContainer />
      </Provider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'new@example.com' } });

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions).toContainEqual({ type: 'CLEAR_AUTH_ERROR' });
    });
  });
});
