import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, TextField, Button } from '@mui/material';
import { api } from '../services/api';
import { Trade } from '../types';

export const Trades = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [symbol, setSymbol] = useState<string>('BTCIRT');

  const fetchTrades = async () => {
    if (!symbol) {
      setError('لطفاً نماد را وارد کنید');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await api.getTrades(symbol);
      setTrades(response.trades);
    } catch (err) {
      setError('خطا در دریافت معاملات');
      console.error('Error fetching trades:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrades();
    const interval = setInterval(fetchTrades, 30000);

    return () => clearInterval(interval);
  }, [symbol]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4, mt: 2 }}>معاملات</Typography>

      <TextField
        fullWidth
        label="نماد"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Button variant="contained" color="primary" onClick={fetchTrades} sx={{ mb: 3 }}>
        به‌روزرسانی
      </Button>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : trades.length === 0 ? (
        <Typography>هیچ معامله‌ای یافت نشد</Typography>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>زمان</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>نوع</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>قیمت</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>مقدار</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>کارمزد</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr key={trade.id}>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  {new Date(trade.createdAt).toLocaleString('fa-IR')}
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  {trade.type === 'buy' ? 'خرید' : 'فروش'}
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  {trade.price.toLocaleString()} تومان
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  {trade.amount.toFixed(8)}
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  {trade.fee.toFixed(8)} {trade.feeCurrency}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Container>
  );
};
