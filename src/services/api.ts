import axios from 'axios';
import { Market, MarketStat, Order, OrderBook, Trade, UDFHistory, User } from '../types';

const API_BASE_URL = 'https://nobitex-back.onrender.com';

// ایجاد یک نمونه axios با تنظیمات پایه
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// اضافه کردن interceptor برای مدیریت خطاها
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // خطای سرور با کد وضعیت
      console.error('API Error:', error.response.data);
      throw new Error(error.response.data.message || 'خطا در ارتباط با سرور');
    } else if (error.request) {
      // خطا در ارسال درخواست
      console.error('Network Error:', error.request);
      throw new Error('خطا در ارتباط با سرور');
    } else {
      // خطای دیگر
      console.error('Error:', error.message);
      throw new Error('خطای ناشناخته');
    }
  }
);

// اضافه کردن interceptor برای اضافه کردن توکن به درخواست‌ها
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const api = {
  // Markets
  getMarkets: async (): Promise<{ markets: Market[] }> => {
    const response = await apiClient.get('/api/markets');
    return response.data;
  },

  // Market Stats
  getMarketStats: async (srcCurrency = 'btc', dstCurrency = 'rls'): Promise<{ stats: MarketStat[] }> => {
    const response = await apiClient.get('/api/market-stats', {
      params: { srcCurrency, dstCurrency }
    });
    return response.data;
  },

  // Orders
  getOrders: async (symbol?: string): Promise<{ orders: Order[] }> => {
    const response = await apiClient.get('/api/orders', {
      params: { symbol }
    });
    return response.data;
  },

  createOrder: async (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<{ order: Order }> => {
    const response = await apiClient.post('/api/orders', order);
    return response.data;
  },

  cancelOrder: async (orderId: string): Promise<{ success: boolean }> => {
    const response = await apiClient.delete(`/api/orders/${orderId}`);
    return response.data;
  },

  // Order Book
  getOrderBook: async (symbol: string): Promise<{ orderBook: OrderBook }> => {
    const response = await apiClient.get(`/api/order-book/${symbol}`);
    return response.data;
  },

  // Trades
  getTrades: async (symbol?: string): Promise<{ trades: Trade[] }> => {
    const response = await apiClient.get('/api/trades', {
      params: { symbol }
    });
    return response.data;
  },

  // UDF History
  getUDFHistory: async (symbol: string, resolution: string, from: Date, to: Date): Promise<{ history: UDFHistory }> => {
    const response = await apiClient.get('/api/udf/history', {
      params: {
        symbol,
        resolution,
        from: Math.floor(from.getTime() / 1000),
        to: Math.floor(to.getTime() / 1000)
      }
    });
    return response.data;
  },

  // User
  login: async (username: string, password: string): Promise<{ user: User; token: string }> => {
    const response = await apiClient.post('/api/auth/login', { username, password });
    const { user, token } = response.data;
    localStorage.setItem('token', token);
    return { user, token };
  },

  register: async (userData: { username: string, email: string, password: string }): Promise<{ user: User }> => {
    const response = await apiClient.post('/api/auth/register', userData);
    return response.data;
  },

  // دریافت آمار بازار جهانی
  getGlobalStats: async (): Promise<any> => {
    const response = await apiClient.get('/api/global-stats');
    return response.data;
  },

  // اضافه کردن تابع برای دریافت قیمت‌های آنلاین
  getOnlinePrices: async (): Promise<{ prices: any[] }> => {
    const response = await apiClient.get('/api/prices');
    return response.data;
  },
};
