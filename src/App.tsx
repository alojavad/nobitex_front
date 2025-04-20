import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, Button, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Orders } from './pages/Orders';
import { Trades } from './pages/Trades';
import { MarketStats } from './pages/MarketStats';
import { OrderBookPage } from './pages/OrderBook';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { Home } from './pages/Home';

const theme = createTheme({
  direction: 'rtl',
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '16px',
          height: 'calc(100vh - 64px)',
          overflow: 'auto',
          width: '100%',
          maxWidth: '100% !important',
          margin: 0
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          height: '100vh',
          width: '100vw',
          overflow: 'hidden'
        },
        '#root': {
          height: '100vh',
          width: '100vw',
          display: 'flex',
          flexDirection: 'column'
        }
      }
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          width: '100vw',
          overflow: 'hidden'
        }}>
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
          <Container maxWidth={false} sx={{ 
            flex: 1, 
            p: { xs: 1, sm: 2, md: 3 },
            width: '100%',
            maxWidth: '100% !important',
            margin: 0,
            overflow: 'auto'
          }}>
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
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
