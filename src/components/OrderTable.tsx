import { Order } from '../types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
} from '@mui/material';
import { Cancel as CancelIcon } from '@mui/icons-material';
import { api } from '../services/api';

interface OrderTableProps {
  orders: Order[];
  onOrderCanceled?: (orderId: string) => void;
}

export const OrderTable = ({ orders, onOrderCanceled }: OrderTableProps) => {
  const handleCancelOrder = async (orderId: string) => {
    try {
      await api.cancelOrder(orderId);
      onOrderCanceled?.(orderId);
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'done':
        return 'info';
      case 'canceled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>شناسه</TableCell>
            <TableCell>نماد</TableCell>
            <TableCell>نوع</TableCell>
            <TableCell>قیمت</TableCell>
            <TableCell>مقدار</TableCell>
            <TableCell>وضعیت</TableCell>
            <TableCell>تاریخ ایجاد</TableCell>
            <TableCell>عملیات</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.symbol}</TableCell>
              <TableCell>
                <Chip
                  label={order.type === 'buy' ? 'خرید' : 'فروش'}
                  color={order.type === 'buy' ? 'success' : 'error'}
                  size="small"
                />
              </TableCell>
              <TableCell>{order.price.toLocaleString('fa-IR')}</TableCell>
              <TableCell>{order.amount.toLocaleString('fa-IR')}</TableCell>
              <TableCell>
                <Chip
                  label={
                    order.status === 'active'
                      ? 'فعال'
                      : order.status === 'done'
                      ? 'انجام شده'
                      : 'لغو شده'
                  }
                  color={getStatusColor(order.status)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleString('fa-IR')}
              </TableCell>
              <TableCell>
                {order.status === 'active' && (
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleCancelOrder(order.id)}
                  >
                    <CancelIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
