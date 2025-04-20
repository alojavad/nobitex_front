import React, { useEffect, useState } from 'react';
import { Typography, Container, Grid, Paper, CircularProgress, Button } from '@mui/material';
import { api } from '../services/api';
import { MarketStat } from '../types';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [marketStats, setMarketStats] = useState<MarketStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarketStats = async () => {
      try {
        setLoading(true);
        const response = await api.getMarketStats();
        setMarketStats(response.stats);
        setError(null);
      } catch (err) {
        setError('خطا در دریافت اطلاعات بازار');
        console.error('Error fetching market stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketStats();
    const interval = setInterval(fetchMarketStats, 30000);

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
      <Typography variant="h4" sx={{ mb: 4, mt: 2 }}>بازار ارزهای دیجیتال</Typography>
      
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item>
          <Button component={Link} to="/orders" variant="contained" color="primary">
            سفارشات
          </Button>
        </Grid>
        <Grid item>
          <Button component={Link} to="/trades" variant="contained" color="primary">
            معاملات
          </Button>
        </Grid>
        <Grid item>
          <Button component={Link} to="/market-stats" variant="contained" color="primary">
            آمار بازار
          </Button>
        </Grid>
        <Grid item>
          <Button component={Link} to="/order-book" variant="contained" color="primary">
            دفتر سفارشات
          </Button>
        </Grid>
        <Grid item>
          <Button component={Link} to="/forum" variant="contained" color="primary">
            انجمن
          </Button>
        </Grid>
      </Grid>
      
      <Grid container spacing={3}>
        {marketStats.map((stats) => (
          <Grid item xs={12} sm={6} md={4} key={stats.symbol}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">{stats.symbol.toUpperCase()}</Typography>
              <Typography>
                آخرین قیمت: {stats.latest.toLocaleString()} تومان
              </Typography>
              <Typography>
                تغییرات 24 ساعته: {stats.dayChange.toFixed(2)}%
              </Typography>
              <Typography>
                حجم معاملات: {stats.volumeSrc.toFixed(4)}
              </Typography>
              <Typography>
                بهترین قیمت خرید: {stats.bestBuy.toLocaleString()} تومان
              </Typography>
              <Typography>
                بهترین قیمت فروش: {stats.bestSell.toLocaleString()} تومان
              </Typography>
              <Typography>
                کمترین قیمت روز: {stats.dayLow.toLocaleString()} تومان
              </Typography>
              <Typography>
                بیشترین قیمت روز: {stats.dayHigh.toLocaleString()} تومان
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}; 