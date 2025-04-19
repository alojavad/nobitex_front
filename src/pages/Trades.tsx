import { useEffect, useState } from 'react';
import { Trade } from '../types';
import { api } from '../services/api';
import { TradeTable } from '../components/TradeTable';
import {
  Container,
  Typography,
  CircularProgress,
  TextField,
} from '@mui/material';

export const Trades = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [symbol, setSymbol] = useState<string>('');

  const fetchTrades = async () => {
    try {
      const response = await api.getTrades(symbol);
      setTrades(response.trades);
    } catch (err) {
      setError('خطا در دریافت اطلاعات معاملات');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrades();
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
        معاملات
      </Typography>

      <TextField
        fullWidth
        label="فیلتر بر اساس نماد"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        sx={{ mb: 3 }}
      />

      <TradeTable trades={trades} />
    </Container>
  );
};
