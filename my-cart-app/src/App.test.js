import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

const renderWithRedux = (ui) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('Cart App', () => {
  test('renders Products heading', () => {
    renderWithRedux(<App />);
    expect(screen.getByText(/products/i)).toBeInTheDocument();
  });

  test('renders Cart component', () => {
    renderWithRedux(<App />);
    expect(screen.getByText(/cart/i)).toBeInTheDocument();
  });

  test('renders all products with Add to Cart buttons', () => {
    renderWithRedux(<App />);
    const addButtons = screen.getAllByText(/add to cart/i);
    expect(addButtons.length).toBeGreaterThan(0);
  });

  test('adds item to cart when Add to Cart clicked', async () => {
    renderWithRedux(<App />);
    const addButtons = screen.getAllByText(/add to cart/i);
    fireEvent.click(addButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/items in cart/i)).toBeInTheDocument();
    });
  });

  test('adds two different items to cart and updates total items', async () => {
    renderWithRedux(<App />);
    const addButtons = screen.getAllByText(/add to cart/i);
    fireEvent.click(addButtons[0]);
    fireEvent.click(addButtons[1]);

    await waitFor(() => {
      expect(screen.getByText(/items in cart: 2/i)).toBeInTheDocument();
    });
  });

  test('increases quantity when adding the same product twice', async () => {
    renderWithRedux(<App />);
    const addButtons = screen.getAllByText(/add to cart/i);
    fireEvent.click(addButtons[0]);
    fireEvent.click(addButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/quantity: 2/i)).toBeInTheDocument();
    });
  });

  test('displays notification on adding to cart', async () => {
    renderWithRedux(<App />);
    const addButtons = screen.getAllByText(/add to cart/i);
    fireEvent.click(addButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/cart data saved successfully/i)).toBeInTheDocument();
    });
  });

  test('notification disappears after 3 seconds', async () => {
    jest.useFakeTimers();
    renderWithRedux(<App />);
    const addButtons = screen.getAllByText(/add to cart/i);
    fireEvent.click(addButtons[0]);

    expect(screen.getByText(/cart data saved successfully/i)).toBeInTheDocument();

    jest.advanceTimersByTime(3000);
    expect(screen.queryByText(/cart data saved successfully/i)).toBeNull();
    jest.useRealTimers();
  });

  test('renders cart items correctly after adding products', async () => {
    renderWithRedux(<App />);
    const addButtons = screen.getAllByText(/add to cart/i);
    fireEvent.click(addButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/items in cart/i)).toBeInTheDocument();
    });
  });

  test('does not show notification initially', () => {
    renderWithRedux(<App />);
    expect(screen.queryByText(/cart data saved successfully/i)).toBeNull();
  });

  // New test cases

  test('cart starts empty on first load', () => {
    renderWithRedux(<App />);
    expect(screen.getByText(/items in cart: 0/i)).toBeInTheDocument();
  });

  test('removes item from cart if remove button is clicked', async () => {
    renderWithRedux(<App />);
    const addButtons = screen.getAllByText(/add to cart/i);
    fireEvent.click(addButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/items in cart/i)).toBeInTheDocument();
    });

    const removeButton = screen.getByText(/remove/i);
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(screen.getByText(/items in cart: 0/i)).toBeInTheDocument();
    });
  });

  test('shows correct total amount after adding products', async () => {
    renderWithRedux(<App />);
    const addButtons = screen.getAllByText(/add to cart/i);
    fireEvent.click(addButtons[0]);
    fireEvent.click(addButtons[1]);

    await waitFor(() => {
      expect(screen.getByText(/total amount/i)).toBeInTheDocument();
    });
  });

  test('displays correct product name in cart', async () => {
    renderWithRedux(<App />);
    const addButtons = screen.getAllByText(/add to cart/i);
    fireEvent.click(addButtons[0]);

    await waitFor(() => {
      // Adjust product name based on your actual data
      expect(screen.getByText(/product 1/i)).toBeInTheDocument();
    });
  });

  test('increments and decrements quantity correctly', async () => {
    renderWithRedux(<App />);
    const addButtons = screen.getAllByText(/add to cart/i);
    fireEvent.click(addButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/quantity: 1/i)).toBeInTheDocument();
    });

    const incrementButton = screen.getByText(/\+/i);
    fireEvent.click(incrementButton);

    await waitFor(() => {
      expect(screen.getByText(/quantity: 2/i)).toBeInTheDocument();
    });

    const decrementButton = screen.getByText(/\-/i);
    fireEvent.click(decrementButton);

    await waitFor(() => {
      expect(screen.getByText(/quantity: 1/i)).toBeInTheDocument();
    });
  });

  test('does not decrement quantity below 1', async () => {
    renderWithRedux(<App />);
    const addButtons = screen.getAllByText(/add to cart/i);
    fireEvent.click(addButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/quantity: 1/i)).toBeInTheDocument();
    });

    const decrementButton = screen.getByText(/\-/i);
    fireEvent.click(decrementButton);

    await waitFor(() => {
      expect(screen.getByText(/quantity: 1/i)).toBeInTheDocument();
    });
  });

  test('clears cart when clear cart button is clicked', async () => {
    renderWithRedux(<App />);
    const addButtons = screen.getAllByText(/add to cart/i);
    fireEvent.click(addButtons[0]);
    fireEvent.click(addButtons[1]);

    await waitFor(() => {
      expect(screen.getByText(/items in cart: 2/i)).toBeInTheDocument();
    });

    const clearCartButton = screen.getByText(/clear cart/i);
    fireEvent.click(clearCartButton);

    await waitFor(() => {
      expect(screen.getByText(/items in cart: 0/i)).toBeInTheDocument();
    });
  });

  test('shows empty cart message when no items', () => {
    renderWithRedux(<App />);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  test('disables checkout button when cart is empty', () => {
    renderWithRedux(<App />);
    const checkoutButton = screen.getByText(/checkout/i);
    expect(checkoutButton).toBeDisabled();
  });

  test('enables checkout button when cart has items', async () => {
    renderWithRedux(<App />);
    const addButtons = screen.getAllByText(/add to cart/i);
    fireEvent.click(addButtons[0]);

    await waitFor(() => {
      const checkoutButton = screen.getByText(/checkout/i);
      expect(checkoutButton).toBeEnabled();
    });
  });
});
