import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import { Orders } from './pages/Orders';
import { Trades } from './pages/Trades';
import { MarketStats } from './pages/MarketStats';
import { OrderBookPage } from './pages/OrderBook';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { Home } from './pages/Home';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            نوبیتکس
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" component={Link} to="/orders">
              سفارشات
            </Button>
            <Button color="inherit" component={Link} to="/trades">
              معاملات
            </Button>
            <Button color="inherit" component={Link} to="/market-stats">
              آمار بازار
            </Button>
            <Button color="inherit" component={Link} to="/order-book">
              دفتر سفارشات
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/orders" element={<Orders />} />
          <Route path="/trades" element={<Trades />} />
          <Route path="/market-stats" element={<MarketStats />} />
          <Route path="/order-book" element={<OrderBookPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
