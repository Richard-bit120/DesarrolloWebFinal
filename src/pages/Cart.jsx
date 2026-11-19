import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as RouterLink } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';

const Cart = () => {
  const { cart, clearCart } = useCart();
  const [orderCompleted, setOrderCompleted] = useState(false);

  const handleCheckout = () => {
    clearCart();
    setOrderCompleted(true);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Carrito de Compras
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Revisa los productos seleccionados, ajusta cantidades o finaliza tu pedido.
        </Typography>
      </Box>

      {orderCompleted && (
        <Alert
          severity="success"
          sx={{ mb: 3 }}
          onClose={() => setOrderCompleted(false)}
        >
          ¡Compra simulada realizada con éxito! Gracias por elegir NovaStore.
        </Alert>
      )}

      {cart.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: 'center',
            border: '1px solid #e2e8f0',
            borderRadius: 4,
          }}
        >
          <ShoppingCartOutlinedIcon
            color="disabled"
            sx={{ fontSize: 68, mb: 2 }}
          />
          <Typography variant="h6" gutterBottom>
            Tu carrito está vacío
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, maxWidth: 420, mx: 'auto' }}
          >
            Aún no has agregado productos. Explora nuestro catálogo para encontrar lo
            que buscas.
          </Typography>
          <Button
            component={RouterLink}
            to="/productos"
            variant="contained"
            color="primary"
            size="large"
          >
            Ir al catálogo
          </Button>
        </Paper>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'minmax(0, 2fr) minmax(0, 1fr)',
            },
            gap: 4,
            alignItems: 'start',
          }}
        >
          <Box>
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}

            <Button
              component={RouterLink}
              to="/productos"
              startIcon={<ArrowBackIcon />}
              sx={{ mt: 1 }}
            >
              Seguir comprando
            </Button>
          </Box>

          <Box>
            <CartSummary onCheckout={handleCheckout} />
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Cart;