import axios from 'axios';
import { Market, MarketStat, Order, OrderBook, Trade, UDFHistory, User } from '../types';
import { mockMarkets, mockMarketStats, mockOrderBook, mockTrades } from '../mocks/data';

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

export const api = {
  // Markets
  getMarkets: async (): Promise<{ markets: Market[] }> => {
    // استفاده از داده‌های موک
    return { markets: mockMarkets };
  },

  // Market Stats
  getMarketStats: async (srcCurrency = 'btc', dstCurrency = 'rls'): Promise<{ stats: MarketStat[] }> => {
    // استفاده از داده‌های موک
    return { stats: mockMarketStats };
  },

  // Orders
  getOrders: async (symbol?: string): Promise<{ orders: Order[] }> => {
    // فعلاً لیست خالی برمی‌گرداند
    return { orders: [] };
  },

  createOrder: async (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<{ order: Order }> => {
    // شبیه‌سازی ایجاد سفارش
    const newOrder: Order = {
      ...order,
      id: Math.random().toString(36).substring(7),
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return { order: newOrder };
  },

  cancelOrder: async (orderId: string): Promise<{ success: boolean }> => {
    // شبیه‌سازی لغو سفارش
    return { success: true };
  },

  // Order Book
  getOrderBook: async (symbol: string): Promise<{ orderBook: OrderBook }> => {
    // استفاده از داده‌های موک
    return { orderBook: { ...mockOrderBook, symbol } };
  },

  // Trades
  getTrades: async (symbol?: string): Promise<{ trades: Trade[] }> => {
    // استفاده از داده‌های موک
    if (symbol) {
      return { trades: mockTrades.filter(trade => trade.symbol === symbol) };
    }
    return { trades: mockTrades };
  },

  // UDF History
  getUDFHistory: async (symbol: string, resolution: string, from: Date, to: Date): Promise<{ history: UDFHistory }> => {
    // شبیه‌سازی داده‌های تاریخی
    return {
      history: {
        s: 'ok',
        t: [Math.floor(from.getTime() / 1000)],
        c: [mockMarketStats.find(stat => stat.symbol === symbol)?.latest || 0],
        o: [mockMarketStats.find(stat => stat.symbol === symbol)?.dayOpen || 0],
        h: [mockMarketStats.find(stat => stat.symbol === symbol)?.dayHigh || 0],
        l: [mockMarketStats.find(stat => stat.symbol === symbol)?.dayLow || 0],
        v: [mockMarketStats.find(stat => stat.symbol === symbol)?.volumeSrc || 0],
      }
    };
  },

  // User
  login: async (username: string, password: string): Promise<{ user: User; token: string }> => {
    // شبیه‌سازی ورود کاربر
    return {
      user: {
        username,
        email: `${username}@example.com`,
      },
      token: 'mock-token'
    };
  },

  register: async (userData: { username: string, email: string, password: string }): Promise<{ user: User }> => {
    // شبیه‌سازی ثبت‌نام کاربر
    return {
      user: {
        username: userData.username,
        email: userData.email,
      }
    };
  },

  // دریافت آمار بازار جهانی
  getGlobalStats: async (): Promise<any> => {
    // شبیه‌سازی آمار جهانی
    return {
      btcPrice: 65000,
      ethPrice: 3200,
      marketCap: 2800000000000,
      btcDominance: 45.2,
    };
  },

  // اضافه کردن تابع برای دریافت قیمت‌های آنلاین
  getOnlinePrices: async (): Promise<{ prices: any[] }> => {
    // شبیه‌سازی قیمت‌های آنلاین
    return {
      prices: [
        { symbol: 'BTC', price: 65000 },
        { symbol: 'ETH', price: 3200 }
      ]
    };
  },
};
