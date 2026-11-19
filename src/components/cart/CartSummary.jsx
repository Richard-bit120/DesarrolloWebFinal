import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
} from '@mui/material';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useCart } from '../../contexts/CartContext';

const CartSummary = ({ onCheckout }) => {
  const { total, totalItems, clearCart } = useCart();

  return (
    <Card sx={{ position: { md: 'sticky' }, top: { md: 90 } }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Resumen de Compra
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
          <Typography variant="body1" color="text.secondary">
            Productos ({totalItems} {totalItems === 1 ? 'unidad' : 'unidades'})
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            ${total.toFixed(2)}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="body1" color="text.secondary">
            Envío estándar
          </Typography>
          <Typography variant="body1" color="success.main" fontWeight={600}>
            Gratis
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6">Total general</Typography>
          <Typography variant="h6" color="primary.main" fontWeight={700}>
            ${total.toFixed(2)}
          </Typography>
        </Box>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          startIcon={<ShoppingBagIcon />}
          onClick={onCheckout}
          sx={{ mb: 1.5 }}
        >
          Finalizar compra
        </Button>

        <Button
          fullWidth
          variant="outlined"
          color="error"
          startIcon={<DeleteSweepIcon />}
          onClick={clearCart}
        >
          Vaciar carrito
        </Button>
      </CardContent>
    </Card>
  );
};

export default CartSummary;