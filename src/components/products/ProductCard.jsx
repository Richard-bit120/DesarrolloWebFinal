import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckIcon from '@mui/icons-material/Check';
import { useCart } from '../../contexts/CartContext';
import { CATEGORY_LABELS } from '../../constants/appConstants';

const ProductCard = ({ product }) => {
  const { addProduct } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addProduct(product);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1200);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 20px rgba(15, 23, 42, 0.1)',
        },
      }}
    >
      <Box>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{
            height: 200,
            objectFit: 'contain',
            p: 2.5,
            bgcolor: '#ffffff',
            borderBottom: '1px solid #f1f5f9',
          }}
        />

        <CardContent sx={{ pb: 1 }}>
          <Chip
            label={CATEGORY_LABELS[product.category] || product.category}
            size="small"
            color="secondary"
            variant="outlined"
            sx={{ mb: 1.5, fontSize: '0.75rem' }}
          />

          <Typography
            variant="subtitle1"
            component="h3"
            title={product.title}
            sx={{
              fontWeight: 600,
              lineHeight: 1.35,
              mb: 1,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.7em',
            }}
          >
            {product.title}
          </Typography>

          <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
            ${Number(product.price).toFixed(2)}
          </Typography>
        </CardContent>
      </Box>

      <CardActions sx={{ px: 2, pb: 2, pt: 0, gap: 1 }}>
        <Button
          component={RouterLink}
          to={`/producto/${product.id}`}
          variant="outlined"
          color="primary"
          size="small"
          fullWidth
        >
          Ver detalle
        </Button>

        <Button
          variant="contained"
          color={added ? 'success' : 'primary'}
          size="small"
          onClick={handleAddToCart}
          aria-label={`Agregar ${product.title} al carrito`}
          sx={{ minWidth: 44, px: 1.5 }}
        >
          {added ? <CheckIcon fontSize="small" /> : <AddShoppingCartIcon fontSize="small" />}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;