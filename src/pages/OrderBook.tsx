import { useEffect, useState } from 'react';
import { OrderBook } from '../types';
import { api } from '../services/api';
import { OrderBookTable } from '../components/OrderBookTable';
import {
  Container,
  Typography,
  CircularProgress,
  TextField,
} from '@mui/material';

export const OrderBookPage = () => {
  const [orderBook, setOrderBook] = useState<OrderBook | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [symbol, setSymbol] = useState<string>('');

  const fetchOrderBook = async () => {
    if (!symbol) {
      setOrderBook(null);
      setLoading(false);
      return;
    }

    try {
      const response = await api.getOrderBook(symbol);
      setOrderBook(response.orderBook);
    } catch (err) {
      setError('خطا در دریافت اطلاعات دفتر سفارشات');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderBook();
  }, [symbol]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        دفتر سفارشات
      </Typography>

      <TextField
        fullWidth
        label="نماد"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        sx={{ mb: 3 }}
      />

      {orderBook ? (
        <OrderBookTable orderBook={orderBook} />
      ) : (
        <Typography>لطفا یک نماد انتخاب کنید</Typography>
      )}
    </Container>
  );
}; 