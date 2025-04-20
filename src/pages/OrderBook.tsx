import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, TextField, Button } from '@mui/material';
import { api } from '../services/api';
import { OrderBook } from '../types';

export const OrderBookPage = () => {
  const [orderBook, setOrderBook] = useState<OrderBook | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [symbol, setSymbol] = useState<string>('BTCIRT');

  const fetchOrderBook = async () => {
    if (!symbol) {
      setError('لطفاً نماد را وارد کنید');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await api.getOrderBook(symbol);
      setOrderBook(response.orderBook);
    } catch (err) {
      setError('خطا در دریافت دفتر سفارشات');
      console.error('Error fetching order book:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderBook();
    const interval = setInterval(fetchOrderBook, 30000);

    return () => clearInterval(interval);
  }, [symbol]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4, mt: 2 }}>دفتر سفارشات</Typography>

      <TextField
        fullWidth
        label="نماد"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Button variant="contained" color="primary" onClick={fetchOrderBook} sx={{ mb: 3 }}>
        به‌روزرسانی
      </Button>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : !orderBook ? (
        <Typography>لطفاً نماد را انتخاب کنید</Typography>
      ) : (
        <div>
          <Typography variant="h6" gutterBottom>
            سفارشات خرید
          </Typography>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>قیمت</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>مقدار</th>
              </tr>
            </thead>
            <tbody>
              {orderBook.bids.map((bid, index) => (
                <tr key={index}>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                    {bid.price.toLocaleString()} تومان
                  </td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                    {bid.amount.toFixed(8)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            سفارشات فروش
          </Typography>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>قیمت</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>مقدار</th>
              </tr>
            </thead>
            <tbody>
              {orderBook.asks.map((ask, index) => (
                <tr key={index}>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                    {ask.price.toLocaleString()} تومان
                  </td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                    {ask.amount.toFixed(8)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
}; 