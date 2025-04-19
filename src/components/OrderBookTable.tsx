import { OrderBook } from '../types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material';

interface OrderBookTableProps {
  orderBook: OrderBook;
}

export const OrderBookTable = ({ orderBook }: OrderBookTableProps) => {
  const formatNumber = (num: number) => {
    return num.toLocaleString('fa-IR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        دفتر سفارشات {orderBook.symbol}
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TableContainer component={Paper} sx={{ flex: 1 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>قیمت</TableCell>
                <TableCell>مقدار</TableCell>
                <TableCell>شناسه سفارش</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderBook.asks.map((ask) => (
                <TableRow key={ask.orderId}>
                  <TableCell sx={{ color: 'error.main' }}>
                    {formatNumber(ask.price)}
                  </TableCell>
                  <TableCell>{formatNumber(ask.amount)}</TableCell>
                  <TableCell>{ask.orderId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer component={Paper} sx={{ flex: 1 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>قیمت</TableCell>
                <TableCell>مقدار</TableCell>
                <TableCell>شناسه سفارش</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderBook.bids.map((bid) => (
                <TableRow key={bid.orderId}>
                  <TableCell sx={{ color: 'success.main' }}>
                    {formatNumber(bid.price)}
                  </TableCell>
                  <TableCell>{formatNumber(bid.amount)}</TableCell>
                  <TableCell>{bid.orderId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}; 