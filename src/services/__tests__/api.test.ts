import axios from 'axios';
import { api } from '../api';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock axios
vi.mock('axios', () => {
  const mAxios = {
    create: vi.fn(() => mAxios),
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
    interceptors: {
      response: {
        use: vi.fn()
      }
    }
  };
  return mAxios;
});

// Mock apiClient
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Service', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
  });

  describe('getMarkets', () => {
    it('should fetch markets successfully', async () => {
      const mockMarkets = [
        { symbol: 'BTCIRT', baseCurrency: 'btc', quoteCurrency: 'rls', isActive: true }
      ];
      
      mockedAxios.get.mockResolvedValueOnce({ data: mockMarkets });
      
      const result = await api.getMarkets();
      
      expect(result.markets).toEqual(mockMarkets);
      expect(mockedAxios.get).toHaveBeenCalledWith('/api/markets');
    });

    it('should handle error when fetching markets', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));
      
      await expect(api.getMarkets()).rejects.toThrow('Network error');
    });
  });

  describe('getMarketStats', () => {
    it('should fetch market stats successfully', async () => {
      const mockStats = {
        stats: {
          'BTCIRT': { symbol: 'BTCIRT', latest: 1000000, dayChange: 2.5 }
        }
      };
      
      mockedAxios.get.mockResolvedValueOnce({ data: mockStats });
      
      const result = await api.getMarketStats();
      
      expect(result.stats).toEqual([mockStats.stats['BTCIRT']]);
      expect(mockedAxios.get).toHaveBeenCalledWith('/api/market-stats', {
        params: { srcCurrency: 'btc', dstCurrency: 'rls' }
      });
    });

    it('should handle error when fetching market stats', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));
      
      await expect(api.getMarketStats()).rejects.toThrow('Network error');
    });
  });

  describe('getOrderBook', () => {
    it('should fetch order book successfully', async () => {
      const mockOrderBook = {
        symbol: 'BTCIRT',
        bids: [{ price: 1000000, amount: 1.5, orderId: '1' }],
        asks: [{ price: 1001000, amount: 1.0, orderId: '2' }]
      };
      
      mockedAxios.get.mockResolvedValueOnce({ data: mockOrderBook });
      
      const result = await api.getOrderBook('BTCIRT');
      
      expect(result.orderBook).toEqual(mockOrderBook);
      expect(mockedAxios.get).toHaveBeenCalledWith('/api/order-book/BTCIRT');
    });

    it('should handle error when fetching order book', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));
      
      await expect(api.getOrderBook('BTCIRT')).rejects.toThrow('Network error');
    });
  });

  describe('getTrades', () => {
    it('should fetch trades successfully', async () => {
      const mockTrades = {
        trades: [
          { id: '1', symbol: 'BTCIRT', type: 'buy', price: 1000000, amount: 1.5 }
        ]
      };
      
      mockedAxios.get.mockResolvedValueOnce({ data: mockTrades });
      
      const result = await api.getTrades('BTCIRT');
      
      expect(result.trades).toEqual(mockTrades.trades);
      expect(mockedAxios.get).toHaveBeenCalledWith('/api/trades?symbol=BTCIRT');
    });

    it('should handle error when fetching trades', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));
      
      await expect(api.getTrades('BTCIRT')).rejects.toThrow('Network error');
    });
  });

  describe('login', () => {
    it('should login successfully', async () => {
      const mockResponse = {
        user: { username: 'testuser', email: 'test@example.com' },
        token: 'test-token'
      };
      
      mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });
      
      const result = await api.login('testuser', 'password');
      
      expect(result).toEqual(mockResponse);
      expect(mockedAxios.post).toHaveBeenCalledWith('/api/auth/login', {
        username: 'testuser',
        password: 'password'
      });
    });

    it('should handle error when logging in', async () => {
      mockedAxios.post.mockRejectedValueOnce(new Error('Invalid credentials'));
      
      await expect(api.login('testuser', 'wrong-password')).rejects.toThrow('Invalid credentials');
    });
  });
}); 