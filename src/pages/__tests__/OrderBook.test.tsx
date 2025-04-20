import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { OrderBookPage } from '../OrderBook';
import { api } from '../../services/api';

// Mock the API module
jest.mock('../../services/api');

describe('OrderBookPage', () => {
  const mockOrderBook = {
    symbol: 'BTCIRT',
    bids: [
      { price: 1000000, amount: 1.5, orderId: '1' },
      { price: 999000, amount: 2.0, orderId: '2' },
    ],
    asks: [
      { price: 1001000, amount: 1.0, orderId: '3' },
      { price: 1002000, amount: 2.5, orderId: '4' },
    ],
    lastUpdate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('renders order book page with initial state', () => {
    render(<OrderBookPage />);
    
    // Check if the title is rendered
    expect(screen.getByText('دفتر سفارشات')).toBeInTheDocument();
    
    // Check if the symbol input is rendered with default value
    const symbolInput = screen.getByLabelText('نماد');
    expect(symbolInput).toHaveValue('BTCIRT');
  });

  it('fetches and displays order book data', async () => {
    // Mock the API response
    (api.getOrderBook as jest.Mock).mockResolvedValueOnce({ orderBook: mockOrderBook });

    render(<OrderBookPage />);

    // Wait for the data to be loaded
    await waitFor(() => {
      expect(screen.getByText('سفارشات خرید')).toBeInTheDocument();
      expect(screen.getByText('سفارشات فروش')).toBeInTheDocument();
    });

    // Check if the bids are displayed
    expect(screen.getByText('1,000,000 تومان')).toBeInTheDocument();
    expect(screen.getByText('1.5')).toBeInTheDocument();

    // Check if the asks are displayed
    expect(screen.getByText('1,001,000 تومان')).toBeInTheDocument();
    expect(screen.getByText('1.0')).toBeInTheDocument();
  });

  it('handles API error gracefully', async () => {
    // Mock the API to throw an error
    (api.getOrderBook as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    render(<OrderBookPage />);

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText('خطا در دریافت دفتر سفارشات')).toBeInTheDocument();
    });
  });

  it('updates order book when symbol changes', async () => {
    // Mock the API response
    (api.getOrderBook as jest.Mock).mockResolvedValueOnce({ orderBook: mockOrderBook });

    render(<OrderBookPage />);

    // Change the symbol
    const symbolInput = screen.getByLabelText('نماد');
    fireEvent.change(symbolInput, { target: { value: 'ETHIRT' } });

    // Wait for the API to be called with the new symbol
    await waitFor(() => {
      expect(api.getOrderBook).toHaveBeenCalledWith('ETHIRT');
    });
  });
}); 