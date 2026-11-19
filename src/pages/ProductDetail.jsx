import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { useCart } from '../contexts/CartContext';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import { CATEGORY_LABELS } from '../constants/appConstants';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addProduct } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedSuccess, setAddedSuccess] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        setAddedSuccess(false);
        const data = await getProductById(id, controller.signal);
        setProduct(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'No se pudo cargar el detalle del producto.');
          setProduct(null);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProductDetail();

    return () => {
      controller.abort();
    };
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addProduct(product);
    setAddedSuccess(true);
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Loading message="Cargando detalle del producto..." />
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container maxWidth="md">
        <ErrorMessage
          title="Producto no disponible"
          message={error || 'El producto solicitado no existe.'}
          onRetry={() => navigate('/productos')}
          retryLabel="Volver al catálogo"
        />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Button
        component={RouterLink}
        to="/productos"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Volver al catálogo
      </Button>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          border: '1px solid #e2e8f0',
          borderRadius: 4,
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'minmax(0, 5fr) minmax(0, 7fr)',
            },
            gap: 5,
            alignItems: 'center',
          }}
        >
          {/* Columna izquierda: Imagen grande */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#ffffff',
              borderRadius: 3,
              p: 3,
              border: '1px solid #f1f5f9',
              minHeight: 340,
            }}
          >
            <Box
              component="img"
              src={product.image}
              alt={product.title}
              sx={{
                maxWidth: '100%',
                maxHeight: 320,
                objectFit: 'contain',
              }}
            />
          </Box>

          {/* Columna derecha: Información y compra */}
          <Box>
            <Chip
              label={CATEGORY_LABELS[product.category] || product.category}
              color="secondary"
              variant="outlined"
              sx={{ mb: 2 }}
            />

            <Typography variant="h4" component="h1" gutterBottom>
              {product.title}
            </Typography>

            {/* Valoración si está disponible */}
            {product.rating && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Rating
                  value={Number(product.rating.rate) || 0}
                  precision={0.1}
                  readOnly
                />
                <Typography variant="body2" color="text.secondary">
                  {product.rating.rate} ({product.rating.count} valoraciones)
                </Typography>
              </Box>
            )}

            <Typography
              variant="h4"
              color="primary.main"
              sx={{ fontWeight: 700, my: 2 }}
            >
              ${Number(product.price).toFixed(2)}
            </Typography>

            <Divider sx={{ my: 2.5 }} />

            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Descripción
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.7, mb: 3 }}
            >
              {product.description}
            </Typography>

            {addedSuccess && (
              <Alert
                severity="success"
                sx={{ mb: 2.5 }}
                action={
                  <Button
                    component={RouterLink}
                    to="/carrito"
                    color="inherit"
                    size="small"
                  >
                    Ir al carrito
                  </Button>
                }
              >
                Producto agregado al carrito correctamente.
              </Alert>
            )}

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<AddShoppingCartIcon />}
                onClick={handleAddToCart}
              >
                Agregar al carrito
              </Button>

              <Button
                component={RouterLink}
                to="/carrito"
                variant="outlined"
                color="primary"
                size="large"
                startIcon={<ShoppingCartCheckoutIcon />}
              >
                Ver carrito
              </Button>
            </Stack>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProductDetail;