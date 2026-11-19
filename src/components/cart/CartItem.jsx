import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link as RouterLink } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

const CartItem = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeProduct } = useCart();
  const subtotal = item.price * item.quantity;

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          {/* Imagen del producto */}
          <Grid item xs={3} sm={2}>
            <Box
              component="img"
              src={item.image}
              alt={item.title}
              sx={{
                width: '100%',
                height: 75,
                objectFit: 'contain',
                bgcolor: '#ffffff',
                borderRadius: 1,
                p: 0.5,
              }}
            />
          </Grid>

          {/* Nombre y precio unitario */}
          <Grid item xs={9} sm={4}>
            <Typography
              component={RouterLink}
              to={`/producto/${item.id}`}
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                textDecoration: 'none',
                display: 'block',
                '&:hover': { color: 'primary.main' },
              }}
            >
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Precio unitario: ${Number(item.price).toFixed(2)}
            </Typography>
          </Grid>

          {/* Controles de cantidad */}
          <Grid item xs={6} sm={3}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                border: '1px solid #cbd5e1',
                borderRadius: 2,
              }}
            >
              <IconButton
                size="small"
                onClick={() => decreaseQuantity(item.id)}
                disabled={item.quantity <= 1}
                aria-label="Disminuir cantidad"
              >
                <RemoveIcon fontSize="small" />
              </IconButton>

              <Typography sx={{ px: 2, fontWeight: 600 }}>
                {item.quantity}
              </Typography>

              <IconButton
                size="small"
                onClick={() => increaseQuantity(item.id)}
                aria-label="Aumentar cantidad"
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>

          {/* Subtotal y botón eliminar */}
          <Grid
            item
            xs={6}
            sm={3}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 1,
            }}
          >
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="caption" color="text.secondary" display="block">
                Subtotal
              </Typography>
              <Typography variant="subtitle1" color="primary.main" sx={{ fontWeight: 700 }}>
                ${subtotal.toFixed(2)}
              </Typography>
            </Box>

            <IconButton
              color="error"
              onClick={() => removeProduct(item.id)}
              aria-label={`Eliminar ${item.title}`}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CartItem;