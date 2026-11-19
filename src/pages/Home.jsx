import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { useUser } from '../contexts/UserContext';
import ProductList from '../components/products/ProductList';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import {
  CATALOG_CONFIG,
  CATEGORY_LABELS,
  STORE_INFO,
} from '../constants/appConstants';

const Home = () => {
  const { products, loading: loadingProducts, error: productsError } = useProducts();
  const { categories, loading: loadingCategories } = useCategories();
  const { user } = useUser();
  const navigate = useNavigate();

  const [randomProducts, setRandomProducts] = useState([]);

  // Selecciona 8 productos aleatorios a partir de la única consulta al catálogo
  useEffect(() => {
    if (products.length > 0) {
      const shuffled = [...products].sort(() => Math.random() - 0.5);
      setRandomProducts(shuffled.slice(0, CATALOG_CONFIG.HOME_RANDOM_COUNT));
    }
  }, [products]);

  const handleSelectCategory = (category) => {
    navigate('/productos', { state: { selectedCategory: category } });
  };

  return (
    <Container maxWidth="lg">
      {/* Banner de bienvenida */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          mb: 4,
          borderRadius: 4,
          background: 'linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%)',
          color: '#ffffff',
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="overline" sx={{ letterSpacing: 1.5, opacity: 0.9 }}>
              {user ? `¡Hola de nuevo, ${user.name}!` : `Bienvenido a ${STORE_INFO.name}`}
            </Typography>
            <Typography variant="h4" component="h1" sx={{ mt: 1, mb: 2, fontWeight: 700 }}>
              {STORE_INFO.tagline}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.92, maxWidth: 600 }}>
              Descubre nuestra selección de electrónica, joyería e indumentaria con envío
              rápido y una experiencia de compra simple y segura.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                component={RouterLink}
                to="/productos"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: '#ffffff',
                  color: 'primary.main',
                  '&:hover': { bgcolor: '#f1f5f9' },
                }}
              >
                Explorar catálogo completo
              </Button>
              {!user && (
                <Button
                  component={RouterLink}
                  to="/registro"
                  variant="outlined"
                  size="large"
                  sx={{
                    color: '#ffffff',
                    borderColor: 'rgba(255,255,255,0.7)',
                    '&:hover': {
                      borderColor: '#ffffff',
                      bgcolor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  Crear cuenta gratis
                </Button>
              )}
            </Stack>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}
          >
            <StorefrontIcon sx={{ fontSize: 150, opacity: 0.2 }} />
          </Grid>
        </Grid>
      </Paper>

      {/* Barra de navegación rápida por categorías */}
      {!loadingCategories && categories.length > 0 && (
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 4,
            border: '1px solid #e2e8f0',
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 1.5,
          }}
        >
          <Typography variant="subtitle2" fontWeight={700} color="text.secondary">
            CATEGORÍAS:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip
              label="Todas"
              color="primary"
              variant="outlined"
              clickable
              onClick={() => handleSelectCategory('all')}
            />
            {categories.map((category) => (
              <Chip
                key={category}
                label={CATEGORY_LABELS[category] || category}
                color="primary"
                clickable
                onClick={() => handleSelectCategory(category)}
              />
            ))}
          </Stack>
        </Paper>
      )}

      {/* Sección destacada de beneficios */}
      <Grid container spacing={2.5} sx={{ mb: 5 }}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{ p: 2.5, height: '100%', border: '1px solid #e2e8f0', borderRadius: 3 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
              <LocalShippingIcon color="primary" />
              <Typography variant="subtitle1" fontWeight={600}>
                Envío sin cargo
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Entregas rápidas a todo el país sin costos ocultos en todos tus pedidos.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{ p: 2.5, height: '100%', border: '1px solid #e2e8f0', borderRadius: 3 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
              <VerifiedUserIcon color="primary" />
              <Typography variant="subtitle1" fontWeight={600}>
                Calidad garantizada
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Productos seleccionados con garantía oficial y devolución simplificada.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{ p: 2.5, height: '100%', border: '1px solid #e2e8f0', borderRadius: 3 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
              <SupportAgentIcon color="primary" />
              <Typography variant="subtitle1" fontWeight={600}>
                Atención personalizada
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              ¿Tienes dudas? Escríbenos desde nuestra sección de contacto y te asesoramos.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Sección de 8 productos aleatorios */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        <Box>
          <Typography variant="h5" component="h2">
            Productos Destacados
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Selección aleatoria de nuestro catálogo actualizado
          </Typography>
        </Box>

        <Button
          component={RouterLink}
          to="/productos"
          variant="text"
          endIcon={<ArrowForwardIcon />}
        >
          Ver todos
        </Button>
      </Box>

      {loadingProducts && <Loading message="Cargando productos destacados..." />}

      {productsError && (
        <ErrorMessage
          title="No se pudieron cargar los productos"
          message={productsError}
        />
      )}

      {!loadingProducts && !productsError && randomProducts.length > 0 && (
        <ProductList products={randomProducts} />
      )}
    </Container>
  );
};

export default Home;