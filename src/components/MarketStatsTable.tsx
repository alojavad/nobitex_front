import { MarketStat } from '../types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
} from '@mui/material';

interface MarketStatsTableProps {
  stats: MarketStat[];
}

export const MarketStatsTable = ({ stats }: MarketStatsTableProps) => {
  if (!Array.isArray(stats)) {
    return <Typography>داده‌ای برای نمایش وجود ندارد.</Typography>;
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString('fa-IR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    });
  };

  const formatPercentage = (num: number) => {
    return `${num.toLocaleString('fa-IR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}%`;
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>نماد</TableCell>
            <TableCell>وضعیت</TableCell>
            <TableCell>آخرین قیمت</TableCell>
            <TableCell>بهترین خرید</TableCell>
            <TableCell>بهترین فروش</TableCell>
            <TableCell>حجم مبدا</TableCell>
            <TableCell>حجم مقصد</TableCell>
            <TableCell>کمترین</TableCell>
            <TableCell>بیشترین</TableCell>
            <TableCell>باز</TableCell>
            <TableCell>بسته</TableCell>
            <TableCell>تغییرات</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stats.map((stat) => (
            <TableRow key={stat.symbol}>
              <TableCell>{stat.symbol}</TableCell>
              <TableCell>
                <Chip
                  label={stat.isClosed ? 'بسته' : 'باز'}
                  color={stat.isClosed ? 'error' : 'success'}
                  size="small"
                />
              </TableCell>
              <TableCell>{formatNumber(stat.latest)}</TableCell>
              <TableCell>{formatNumber(stat.bestBuy)}</TableCell>
              <TableCell>{formatNumber(stat.bestSell)}</TableCell>
              <TableCell>{formatNumber(stat.volumeSrc)}</TableCell>
              <TableCell>{formatNumber(stat.volumeDst)}</TableCell>
              <TableCell>{formatNumber(stat.dayLow)}</TableCell>
              <TableCell>{formatNumber(stat.dayHigh)}</TableCell>
              <TableCell>{formatNumber(stat.dayOpen)}</TableCell>
              <TableCell>{formatNumber(stat.dayClose)}</TableCell>
              <TableCell>
                <Chip
                  label={formatPercentage(stat.dayChange)}
                  color={stat.dayChange >= 0 ? 'success' : 'error'}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
