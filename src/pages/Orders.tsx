import { useEffect, useState } from 'react';
import { Order } from '../types';
import { api } from '../services/api';
import { OrderTable } from '../components/OrderTable';
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

type NewOrder = Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'status'>;

export const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [symbol, setSymbol] = useState<string>('');
  const [openNewOrder, setOpenNewOrder] = useState(false);
  const [newOrder, setNewOrder] = useState<NewOrder>({
    symbol: '',
    type: 'buy',
    price: 0,
    amount: 0,
  });

  const fetchOrders = async () => {
    try {
      const response = await api.getOrders(symbol);
      setOrders(response.orders);
    } catch (err) {
      setError('خطا در دریافت اطلاعات سفارشات');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [symbol]);

  const handleOrderCanceled = (orderId: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
  };

  const handleCreateOrder = async () => {
    try {
      const response = await api.createOrder(newOrder);
      setOrders((prev) => [response.order, ...prev]);
      setOpenNewOrder(false);
      setNewOrder({
        symbol: '',
        type: 'buy',
        price: 0,
        amount: 0,
      });
    } catch (err) {
      setError('خطا در ایجاد سفارش');
      console.error(err);
    }
  };

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">سفارشات</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenNewOrder(true)}
        >
          سفارش جدید
        </Button>
      </Box>

      <TextField
        fullWidth
        label="فیلتر بر اساس نماد"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        sx={{ mb: 3 }}
      />

      <OrderTable orders={orders} onOrderCanceled={handleOrderCanceled} />

      <Dialog open={openNewOrder} onClose={() => setOpenNewOrder(false)}>
        <DialogTitle>سفارش جدید</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="نماد"
              value={newOrder.symbol}
              onChange={(e) =>
                setNewOrder((prev) => ({ ...prev, symbol: e.target.value }))
              }
            />
            <FormControl fullWidth>
              <InputLabel>نوع</InputLabel>
              <Select
                value={newOrder.type}
                label="نوع"
                onChange={(e) =>
                  setNewOrder((prev) => ({
                    ...prev,
                    type: e.target.value as 'buy' | 'sell',
                  }))
                }
              >
                <MenuItem value="buy">خرید</MenuItem>
                <MenuItem value="sell">فروش</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="قیمت"
              type="number"
              value={newOrder.price}
              onChange={(e) =>
                setNewOrder((prev) => ({
                  ...prev,
                  price: parseFloat(e.target.value),
                }))
              }
            />
            <TextField
              label="مقدار"
              type="number"
              value={newOrder.amount}
              onChange={(e) =>
                setNewOrder((prev) => ({
                  ...prev,
                  amount: parseFloat(e.target.value),
                }))
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewOrder(false)}>انصراف</Button>
          <Button onClick={handleCreateOrder} variant="contained">
            ثبت سفارش
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
