import axios from 'axios';
import { Market, MarketStat, Order, OrderBook, Trade, UDFHistory, User } from '../types';

const API_BASE_URL = 'https://nobitex-back.onrender.com';

// داده‌های ساختگی برای سفارشات
const mockOrders: Order[] = [
  {
    id: '1',
    symbol: 'BTC-USDT',
    type: 'buy',
    price: 50000,
    amount: 1,
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    symbol: 'ETH-USDT',
    type: 'sell',
    price: 3000,
    amount: 5,
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// داده‌های ساختگی برای معاملات
const mockTrades: Trade[] = [
  {
    id: '1',
    orderId: '1',
    symbol: 'BTC-USDT',
    type: 'buy',
    price: 50000,
    amount: 1,
    fee: 50,
    feeCurrency: 'USDT',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    orderId: '2',
    symbol: 'ETH-USDT',
    type: 'sell',
    price: 3000,
    amount: 5,
    fee: 15,
    feeCurrency: 'USDT',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const api = {
  // Markets
  getMarkets: async (): Promise<{ markets: Market[] }> => {
    const response = await axios.get(`${API_BASE_URL}/api/markets`);
    return { markets: response.data };
  },

  // Market Stats
  getMarketStats: async (symbol?: string): Promise<{ stats: MarketStat[] }> => {
    const response = await axios.get(`${API_BASE_URL}/api/market-stats${symbol ? `?symbol=${symbol}` : ''}`);
    return { stats: response.data };
  },

  // Orders
  getOrders: async (symbol?: string): Promise<{ orders: Order[] }> => {
    // استفاده از داده‌های ساختگی به جای درخواست به سرور
    return {
      orders: symbol
        ? mockOrders.filter((order) => order.symbol === symbol)
        : mockOrders,
    };
  },

  createOrder: async (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<{ order: Order }> => {
    // ایجاد سفارش ساختگی
    const newOrder: Order = {
      ...order,
      id: Math.random().toString(36).substring(7),
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockOrders.push(newOrder);
    return { order: newOrder };
  },

  cancelOrder: async (orderId: string): Promise<{ success: boolean }> => {
    // حذف سفارش از لیست سفارشات ساختگی
    const orderIndex = mockOrders.findIndex((order) => order.id === orderId);
    if (orderIndex !== -1) {
      mockOrders[orderIndex].status = 'canceled';
      return { success: true };
    }
    return { success: false };
  },

  // Order Book
  getOrderBook: async (symbol: string): Promise<{ orderBook: OrderBook }> => {
    const response = await axios.get(`${API_BASE_URL}/api/order-book/${symbol}`);
    return { orderBook: response.data };
  },

  // Trades
  getTrades: async (symbol?: string): Promise<{ trades: Trade[] }> => {
    // استفاده از داده‌های ساختگی به جای درخواست به سرور
    return {
      trades: symbol
        ? mockTrades.filter((trade) => trade.symbol === symbol)
        : mockTrades,
    };
  },

  // UDF History
  getUDFHistory: async (symbol: string, resolution: string, from: Date, to: Date): Promise<{ history: UDFHistory }> => {
    const response = await axios.get(`${API_BASE_URL}/api/udf-history`, {
      params: { symbol, resolution, from, to }
    });
    return { history: response.data };
  },

  // User
  login: async (username: string, password: string): Promise<{ user: User; token: string }> => {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { username, password });
    return { user: response.data.user, token: response.data.token };
  },

  register: async (userData: { username: string, email: string, password: string }): Promise<{ user: User }> => {
    const response = await axios.post(`${API_BASE_URL}/api/auth/register`, userData);
    return { user: response.data };
  },
};
