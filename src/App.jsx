import { Box } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { CartProvider } from './contexts/CartContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
              bgcolor: 'background.default',
            }}
          >
            <Header />
            <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
              <AppRoutes />
            </Box>
            <Footer />
          </Box>
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;