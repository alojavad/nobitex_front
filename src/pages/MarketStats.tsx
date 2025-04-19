import { useEffect, useState } from 'react';
import { MarketStat } from '../types';
import { api } from '../services/api';
import { MarketStatsTable } from '../components/MarketStatsTable';
import {
  Container,
  Typography,
  CircularProgress,
  TextField,
} from '@mui/material';

export const MarketStats = () => {
  const [stats, setStats] = useState<MarketStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [symbol, setSymbol] = useState<string>('');

  const fetchStats = async () => {
    try {
      const response = await api.getMarketStats(symbol);
      setStats(response.stats);
    } catch (err) {
      setError('خطا در دریافت اطلاعات آمار بازار');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
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
        آمار بازار
      </Typography>

      <TextField
        fullWidth
        label="فیلتر بر اساس نماد"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        sx={{ mb: 3 }}
      />

      <MarketStatsTable stats={stats} />
    </Container>
  );
};
