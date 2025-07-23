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
});
