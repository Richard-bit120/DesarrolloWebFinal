import {
  Box,
  Card,
  CardContent,
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'stretch', sm: 'center' },
            gap: 2,
          }}
        >
          {/* Bloque izquierdo: Imagen + Nombre y precio unitario (absorbe el espacio sobrante) */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              flex: 1,
              minWidth: 0,
            }}
          >
            <Box
              component="img"
              src={item.image}
              alt={item.title}
              sx={{
                width: 75,
                height: 75,
                objectFit: 'contain',
                bgcolor: '#ffffff',
                borderRadius: 1,
                p: 0.5,
                flexShrink: 0,
              }}
            />

            <Box sx={{ minWidth: 0 }}>
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
            </Box>
          </Box>

          {/* Bloque derecho: Controles de cantidad + Subtotal + Botón eliminar */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'space-between', sm: 'flex-end' },
              gap: { xs: 2, sm: 3 },
              flexShrink: 0,
            }}
          >
            {/* Controles de cantidad */}
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

            {/* Subtotal y botón eliminar */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: 1.5,
              }}
            >
              <Box sx={{ textAlign: 'right', minWidth: { sm: 90 } }}>
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
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CartItem;