import { useEffect, useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import FormField from '../components/forms/FormField';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {
  const { register, loading, error, clearError } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [registerSuccess, setRegisterSuccess] = useState(false);

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

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'El nombre completo es obligatorio.';
    } else if (formData.name.trim().length < 3) {
      errors.name = 'El nombre debe tener al menos 3 caracteres.';
    }

    if (!formData.email.trim()) {
      errors.email = 'El correo electrónico es obligatorio.';
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      errors.email = 'Ingresa un correo electrónico válido.';
    }

    if (!formData.password) {
      errors.password = 'La contraseña es obligatoria.';
    } else if (formData.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Debes confirmar tu contraseña.';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterSuccess(false);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    const success = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (success) {
      setRegisterSuccess(true);
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setTimeout(() => {
        navigate('/login');
      }, 1600);
    }
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
          <Avatar sx={{ bgcolor: 'secondary.main', mb: 1.5 }}>
            <PersonAddOutlinedIcon />
          </Avatar>
          <Typography variant="h5" component="h1" fontWeight={700}>
            Crear Cuenta
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 0.5 }}>
            Regístrate en NovaStore para gestionar tu perfil
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {registerSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            ¡Registro exitoso! Ahora puedes iniciar sesión con tu cuenta.
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <FormField
            label="Nombre completo"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={fieldErrors.name}
            required
            disabled={loading || registerSuccess}
            placeholder="Ej. Ana García"
          />

          <FormField
            label="Correo electrónico"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={fieldErrors.email}
            required
            disabled={loading || registerSuccess}
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
            disabled={loading || registerSuccess}
          />

          <FormField
            label="Confirmar contraseña"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={fieldErrors.confirmPassword}
            required
            disabled={loading || registerSuccess}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            disabled={loading || registerSuccess}
            sx={{ mt: 2, mb: 2 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Registrarse'
            )}
          </Button>
        </Box>

        <Typography variant="body2" align="center" color="text.secondary">
          ¿Ya tienes una cuenta?{' '}
          <Link component={RouterLink} to="/login" fontWeight={600}>
            Inicia sesión
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;