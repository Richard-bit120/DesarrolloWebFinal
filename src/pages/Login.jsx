import { useEffect, useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import FormField from '../components/forms/FormField';
import { DEMO_API_USER } from '../constants/appConstants';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const { login, loading, error, clearError } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Limpia errores residuales al entrar a la página
  useEffect(() => {
    clearError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpia el error visual del campo mientras el usuario corrige
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = 'El correo electrónico es obligatorio.';
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      errors.email = 'Ingresa un correo electrónico válido.';
    }

    if (!formData.password.trim()) {
      errors.password = 'La contraseña es obligatoria.';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginSuccess(false);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    const success = await login({
      email: formData.email,
      password: formData.password,
    });

    if (success) {
      setLoginSuccess(true);
      setTimeout(() => {
        navigate('/perfil');
      }, 1200);
    }
  };

  // Completa las credenciales del usuario real precargado en FakeStoreAPI
  const handleFillDemoUser = () => {
    clearError();
    setFieldErrors({});
    setFormData({
      email: DEMO_API_USER.email,
      password: DEMO_API_USER.password,
    });
  };

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={0}
        sx={{
          p: 4,
          border: '1px solid #e2e8f0',
          borderRadius: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Avatar sx={{ bgcolor: 'primary.main', mb: 1.5 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" component="h1" fontWeight={700}>
            Iniciar Sesión
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 0.5 }}>
            Ingresa con tu cuenta para acceder a tu perfil
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loginSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            ¡Ingreso exitoso! Redirigiendo a tu perfil...
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <FormField
            label="Correo electrónico"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={fieldErrors.email}
            required
            disabled={loading || loginSuccess}
            placeholder="ejemplo@correo.com"
          />

          <FormField
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={fieldErrors.password}
            required
            disabled={loading || loginSuccess}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            disabled={loading || loginSuccess}
            sx={{ mt: 2, mb: 2 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Ingresar'
            )}
          </Button>
        </Box>

        <Divider sx={{ my: 2 }}>
          <Typography variant="caption" color="text.secondary">
            PRUEBA CON FAKESTOREAPI
          </Typography>
        </Divider>

        <Button
          fullWidth
          variant="outlined"
          size="small"
          onClick={handleFillDemoUser}
          disabled={loading || loginSuccess}
          sx={{ mb: 2 }}
        >
          Usar credenciales demo ({DEMO_API_USER.email})
        </Button>

        <Typography variant="body2" align="center" color="text.secondary">
          ¿No tienes cuenta?{' '}
          <Link component={RouterLink} to="/registro" fontWeight={600}>
            Regístrate aquí
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;