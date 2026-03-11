import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AccountPlan from '../views/pages/account/accountComponents/AccountPlan';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('AccountPlan Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {
        currentPlan: 'essential',
        billingCycle: 'monthly',
      },
      plans: {
        available: ['essential', 'surge', 'infinite'],
      },
    });
  });

  test('renders plan selection interface', () => {
    render(
      <Provider store={store}>
        <AccountPlan />
      </Provider>
    );

    expect(screen.getByText(/essential/i)).toBeInTheDocument();
    expect(screen.getByText(/surge/i)).toBeInTheDocument();
    expect(screen.getByText(/infinite/i)).toBeInTheDocument();
  });

  test('shows monthly and annual billing toggle', () => {
    render(
      <Provider store={store}>
        <AccountPlan />
      </Provider>
    );

    expect(screen.getByText(/monthly/i)).toBeInTheDocument();
    expect(screen.getByText(/annual/i)).toBeInTheDocument();
  });

  test('displays current plan badge', () => {
    render(
      <Provider store={store}>
        <AccountPlan />
      </Provider>
    );

    expect(screen.getByText(/current plan/i)).toBeInTheDocument();
  });

  test('shows save 20% badge for annual plans', async () => {
    render(
      <Provider store={store}>
        <AccountPlan />
      </Provider>
    );

    const annualToggle = screen.getByText(/annual/i);
    fireEvent.click(annualToggle);

    await waitFor(() => {
      expect(screen.getByText(/save 20%/i)).toBeInTheDocument();
    });
  });

  test('displays plan features comparison', () => {
    render(
      <Provider store={store}>
        <AccountPlan />
      </Provider>
    );

    // Should show feature lists
    expect(screen.getByText(/features/i)).toBeInTheDocument();
  });

  test('opens upgrade modal when clicking upgrade button', async () => {
    render(
      <Provider store={store}>
        <AccountPlan />
      </Provider>
    );

    const upgradeButton = screen.getByRole('button', { name: /upgrade to surge/i });
    fireEvent.click(upgradeButton);

    await waitFor(() => {
      expect(screen.getByText(/confirm upgrade/i)).toBeInTheDocument();
    });
  });

  test('opens downgrade modal when clicking downgrade button', async () => {
    const surgePlanStore = mockStore({
      user: {
        currentPlan: 'surge',
        billingCycle: 'monthly',
      },
      plans: {
        available: ['essential', 'surge', 'infinite'],
      },
    });

    render(
      <Provider store={surgePlanStore}>
        <AccountPlan />
      </Provider>
    );

    const downgradeButton = screen.getByRole('button', { name: /downgrade/i });
    fireEvent.click(downgradeButton);

    await waitFor(() => {
      expect(screen.getByText(/confirm downgrade/i)).toBeInTheDocument();
    });
  });

  test('shows pricing for each plan', () => {
    render(
      <Provider store={store}>
        <AccountPlan />
      </Provider>
    );

    // Should display pricing
    expect(screen.getAllByText(/\$/)).toHaveLength(3); // 3 plans
  });

  test('calculates monthly savings for annual billing', async () => {
    render(
      <Provider store={store}>
        <AccountPlan />
      </Provider>
    );

    const annualToggle = screen.getByText(/annual/i);
    fireEvent.click(annualToggle);

    await waitFor(() => {
      // Should show monthly equivalent pricing
      expect(screen.getByText(/per month/i)).toBeInTheDocument();
    });
  });

  test('displays cancel subscription option for current plan', () => {
    render(
      <Provider store={store}>
        <AccountPlan />
      </Provider>
    );

    expect(screen.getByText(/cancel subscription/i)).toBeInTheDocument();
  });

  test('opens cancel confirmation modal', async () => {
    render(
      <Provider store={store}>
        <AccountPlan />
      </Provider>
    );

    const cancelButton = screen.getByText(/cancel subscription/i);
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
    });
  });

  test('shows pause subscription option in cancel modal', async () => {
    render(
      <Provider store={store}>
        <AccountPlan />
      </Provider>
    );

    const cancelButton = screen.getByText(/cancel subscription/i);
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(screen.getByText(/pause subscription/i)).toBeInTheDocument();
    });
  });

  test('requires reason for cancellation', async () => {
    render(
      <Provider store={store}>
        <AccountPlan />
      </Provider>
    );

    const cancelButton = screen.getByText(/cancel subscription/i);
    fireEvent.click(cancelButton);

    await waitFor(() => {
      const confirmButton = screen.getByRole('button', { name: /confirm cancel/i });
      fireEvent.click(confirmButton);
    });

    await waitFor(() => {
      expect(screen.getByText(/please select a reason/i)).toBeInTheDocument();
    });
  });

  test('toggles between monthly and annual pricing', async () => {
    render(
      <Provider store={store}>
        <AccountPlan />
      </Provider>
    );

    const monthlyPrice = screen.getByText(/\$49/);
    expect(monthlyPrice).toBeInTheDocument();

    const annualToggle = screen.getByText(/annual/i);
    fireEvent.click(annualToggle);

    await waitFor(() => {
      // Annual price should be different
      expect(screen.getByText(/\$470/)).toBeInTheDocument(); // Example: $49 * 12 * 0.8
    });
  });

  test('disables upgrade button for current plan', () => {
    render(
      <Provider store={store}>
        <AccountPlan />
      </Provider>
    );

    // Current plan button should be disabled or show "Current Plan"
    const currentPlanButton = screen.getByRole('button', { name: /current plan/i });
    expect(currentPlanButton).toBeDisabled();
  });

  test('shows plan comparison table', () => {
    render(
      <Provider store={store}>
        <AccountPlan />
      </Provider>
    );

    expect(screen.getByText(/compare plans/i) || screen.getByRole('table')).toBeInTheDocument();
  });

  test('handles upgrade confirmation', async () => {
    render(
      <Provider store={store}>
        <AccountPlan />
      </Provider>
    );

    const upgradeButton = screen.getByRole('button', { name: /upgrade to surge/i });
    fireEvent.click(upgradeButton);

    await waitFor(() => {
      const confirmButton = screen.getByRole('button', { name: /confirm/i });
      fireEvent.click(confirmButton);
    });

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions).toContainEqual(
        expect.objectContaining({
          type: 'UPGRADE_PLAN',
        })
      );
    });
  });

  test('shows loading state during plan change', async () => {
    const loadingStore = mockStore({
      user: {
        currentPlan: 'essential',
        billingCycle: 'monthly',
      },
      plans: {
        available: ['essential', 'surge', 'infinite'],
        loading: true,
      },
    });

    render(
      <Provider store={loadingStore}>
        <AccountPlan />
      </Provider>
    );

    expect(screen.getByText(/loading/i) || screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('displays next billing date', () => {
    const storeWithBilling = mockStore({
      user: {
        currentPlan: 'essential',
        billingCycle: 'monthly',
        nextBillingDate: '2024-02-01',
      },
      plans: {
        available: ['essential', 'surge', 'infinite'],
      },
    });

    render(
      <Provider store={storeWithBilling}>
        <AccountPlan />
      </Provider>
    );

    expect(screen.getByText(/next billing/i)).toBeInTheDocument();
  });

  test('shows proration notice when upgrading mid-cycle', async () => {
    render(
      <Provider store={store}>
        <AccountPlan />
      </Provider>
    );

    const upgradeButton = screen.getByRole('button', { name: /upgrade to surge/i });
    fireEvent.click(upgradeButton);

    await waitFor(() => {
      expect(screen.getByText(/prorated/i)).toBeInTheDocument();
    });
  });

  test('displays plan limits and features', () => {
    render(
      <Provider store={store}>
        <AccountPlan />
      </Provider>
    );

    // Should show feature limits
    expect(screen.getByText(/unlimited/i) || screen.getByText(/members/i)).toBeInTheDocument();
  });

  test('handles API errors gracefully', async () => {
    const errorStore = mockStore({
      user: {
        currentPlan: 'essential',
        billingCycle: 'monthly',
      },
      plans: {
        available: ['essential', 'surge', 'infinite'],
        error: 'Failed to load plans',
      },
    });

    render(
      <Provider store={errorStore}>
        <AccountPlan />
      </Provider>
    );

    expect(screen.getByText(/failed to load plans/i)).toBeInTheDocument();
  });
});
