import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress } from '@mui/material';
import { MarketStatsTable } from '../components/MarketStatsTable';
import { api } from '../services/api';
import { MarketStat } from '../types';

export const MarketStats = () => {
  const [stats, setStats] = useState<MarketStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await api.getMarketStats();
        setStats(response.stats);
        setError(null);
      } catch (err) {
        setError('خطا در دریافت آمار بازار');
        console.error('Error fetching market stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4, mt: 2 }}>آمار بازار</Typography>
      <MarketStatsTable stats={stats} />
    </Container>
  );
};
