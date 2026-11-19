import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useCart } from '../contexts/CartContext';

const Profile = () => {
  const { user, logout } = useUser();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Vista cuando el usuario NO está logueado
  if (!user) {
    return (
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 5,
            textAlign: 'center',
            border: '1px solid #e2e8f0',
            borderRadius: 4,
          }}
        >
          <PersonOutlineIcon color="disabled" sx={{ fontSize: 64, mb: 1.5 }} />
          <Typography variant="h5" component="h1" gutterBottom fontWeight={700}>
            Acceso Restringido
          </Typography>
          <Alert severity="warning" sx={{ my: 2.5, textAlign: 'left' }}>
            Debes iniciar sesión para visualizar la información de tu perfil.
          </Alert>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              component={RouterLink}
              to="/login"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<LoginIcon />}
            >
              Ir a Iniciar Sesión
            </Button>
            <Button
              component={RouterLink}
              to="/registro"
              variant="outlined"
              color="primary"
              size="large"
            >
              Crear cuenta
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  // Vista cuando el usuario SÍ está logueado
  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              mb: 3,
            }}
          >
            <Avatar
              sx={{
                width: 72,
                height: 72,
                bgcolor: 'primary.main',
                fontSize: '2rem',
                fontWeight: 700,
                mb: 1.5,
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="h5" component="h1" fontWeight={700}>
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Miembro de NovaStore
            </Typography>
          </Box>

          <Divider sx={{ my: 2.5 }} />

          <Stack spacing={2.5} sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <EmailIcon color="primary" />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  Correo electrónico
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {user.email}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 1,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <ShoppingCartIcon color="primary" />
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Productos en el carrito
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {totalItems} {totalItems === 1 ? 'producto agregado' : 'productos agregados'}
                  </Typography>
                </Box>
              </Box>

              <Button
                component={RouterLink}
                to="/carrito"
                size="small"
                variant="outlined"
              >
                Ver carrito
              </Button>
            </Box>
          </Stack>

          <Button
            fullWidth
            variant="contained"
            color="error"
            size="large"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Cerrar sesión
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;