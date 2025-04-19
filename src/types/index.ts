export interface Market {
  symbol: string;
  baseCurrency: string;
  quoteCurrency: string;
  minPrice: number;
  maxPrice: number;
  minAmount: number;
  maxAmount: number;
  priceStep: number;
  amountStep: number;
  isActive: boolean;
  lastUpdate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface MarketStat {
  symbol: string;
  isClosed: boolean;
  bestSell: number;
  bestBuy: number;
  volumeSrc: number;
  volumeDst: number;
  latest: number;
  mark: number;
  dayLow: number;
  dayHigh: number;
  dayOpen: number;
  dayClose: number;
  dayChange: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  price: number;
  amount: number;
  status: 'active' | 'done' | 'canceled';
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderBookEntry {
  price: number;
  amount: number;
  orderId: string;
}

export interface OrderBook {
  symbol: string;
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
  lastUpdate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Trade {
  id: string;
  orderId: string;
  symbol: string;
  type: 'buy' | 'sell';
  price: number;
  amount: number;
  fee: number;
  feeCurrency: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UDFHistoryData {
  time: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface UDFHistory {
  symbol: string;
  resolution: string;
  from: Date;
  to: Date;
  data: UDFHistoryData[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  username: string;
  email: string;
  password?: string;
  apiKey?: string;
  isActive?: boolean;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
