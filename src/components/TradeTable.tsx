import { Trade } from '../types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';

interface TradeTableProps {
  trades: Trade[];
}

export const TradeTable = ({ trades }: TradeTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>شناسه</TableCell>
            <TableCell>شناسه سفارش</TableCell>
            <TableCell>نماد</TableCell>
            <TableCell>نوع</TableCell>
            <TableCell>قیمت</TableCell>
            <TableCell>مقدار</TableCell>
            <TableCell>کارمزد</TableCell>
            <TableCell>ارز کارمزد</TableCell>
            <TableCell>تاریخ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trades.map((trade) => (
            <TableRow key={trade.id}>
              <TableCell>{trade.id}</TableCell>
              <TableCell>{trade.orderId}</TableCell>
              <TableCell>{trade.symbol}</TableCell>
              <TableCell>
                <Chip
                  label={trade.type === 'buy' ? 'خرید' : 'فروش'}
                  color={trade.type === 'buy' ? 'success' : 'error'}
                  size="small"
                />
              </TableCell>
              <TableCell>{trade.price.toLocaleString('fa-IR')}</TableCell>
              <TableCell>{trade.amount.toLocaleString('fa-IR')}</TableCell>
              <TableCell>{trade.fee.toLocaleString('fa-IR')}</TableCell>
              <TableCell>{trade.feeCurrency}</TableCell>
              <TableCell>
                {new Date(trade.createdAt).toLocaleString('fa-IR')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
