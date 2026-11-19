import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCart } from '../../contexts/CartContext';
import { CATEGORY_LABELS } from '../../constants/appConstants';

const ProductCard = ({ product }) => {
  const { addProduct } = useCart();

  const categoryLabel =
    CATEGORY_LABELS[product.category] || product.category;

  return (
    <Card
      elevation={1}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      {/* Contenedor de imagen de altura fija */}
      <Box
        component={RouterLink}
        to={`/producto/${product.id}`}
        sx={{
          height: 210,
          p: 2.5,
          bgcolor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider',
          textDecoration: 'none',
        }}
      >
        <Box
          component="img"
          src={product.image}
          alt={product.title}
          sx={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
          }}
        />
      </Box>

      {/* Contenido textual con distribución vertical uniforme */}
      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          pb: 1,
        }}
      >
        <Box sx={{ mb: 1.5 }}>
          <Chip
            label={categoryLabel}
            size="small"
            variant="outlined"
            color="secondary"
            sx={{ fontSize: '0.75rem', fontWeight: 500 }}
          />
        </Box>

        {/* Título truncado a 2 líneas con altura mínima fija para alinear filas */}
        <Typography
          variant="subtitle1"
          component={RouterLink}
          to={`/producto/${product.id}`}
          title={product.title}
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            textDecoration: 'none',
            lineHeight: 1.35,
            minHeight: '2.7em',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            mb: 1.5,
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          {product.title}
        </Typography>

        <Typography
          variant="h6"
          color="primary.main"
          sx={{ fontWeight: 700, mt: 'auto' }}
        >
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>

      {/* Botones alineados en la base de la tarjeta */}
      <CardActions sx={{ px: 2, pb: 2, pt: 0, gap: 1 }}>
        <Button
          component={RouterLink}
          to={`/producto/${product.id}`}
          variant="outlined"
          size="small"
          fullWidth
          sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2 }}
        >
          Ver detalle
        </Button>

        <Tooltip title="Agregar al carrito">
          <IconButton
            color="primary"
            onClick={() => addProduct(product)}
            aria-label={`Agregar ${product.title} al carrito`}
            sx={{
              bgcolor: 'primary.main',
              color: 'common.white',
              borderRadius: 2,
              px: 1.5,
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            <AddShoppingCartIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default ProductCard;