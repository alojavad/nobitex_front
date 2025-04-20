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
  getMarketStats: async (srcCurrency = 'btc', dstCurrency = 'rls'): Promise<{ stats: MarketStat[] }> => {
    const response = await axios.get(`${API_BASE_URL}/api/market-stats`, {
      params: { srcCurrency, dstCurrency }
    });
    return { stats: response.data.stats ? Object.values(response.data.stats) : [] };
  },

  // Orders
  getOrders: async (symbol?: string): Promise<{ orders: Order[] }> => {
    const response = await axios.get(`${API_BASE_URL}/api/orders${symbol ? `?symbol=${symbol}` : ''}`);
    return { orders: response.data };
  },

  createOrder: async (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<{ order: Order }> => {
    const response = await axios.post(`${API_BASE_URL}/api/orders`, order);
    return { order: response.data };
  },

  cancelOrder: async (orderId: string): Promise<{ success: boolean }> => {
    const response = await axios.delete(`${API_BASE_URL}/api/orders/${orderId}`);
    return { success: response.data.success };
  },

  // Order Book
  getOrderBook: async (symbol: string): Promise<{ orderBook: OrderBook }> => {
    const response = await axios.get(`${API_BASE_URL}/api/order-book/${symbol}`);
    return { orderBook: response.data };
  },

  // Trades
  getTrades: async (symbol?: string): Promise<{ trades: Trade[] }> => {
    const response = await axios.get(`${API_BASE_URL}/api/trades${symbol ? `?symbol=${symbol}` : ''}`);
    return { trades: response.data.trades || [] };
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

  // دریافت آمار بازار جهانی
  getGlobalStats: async (): Promise<any> => {
    const response = await axios.get(`${API_BASE_URL}/api/market/global-stats`);
    return response.data;
  },

  // اضافه کردن تابع برای دریافت قیمت‌های آنلاین
  getOnlinePrices: async (): Promise<{ prices: any[] }> => {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
    return { prices: response.data };
  },
};
