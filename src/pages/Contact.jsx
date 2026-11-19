import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FormField from '../components/forms/FormField';
import { STORE_INFO } from '../constants/appConstants';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_FORM_STATE = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const Contact = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

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
      errors.name = 'El nombre es obligatorio.';
    }

    if (!formData.email.trim()) {
      errors.email = 'El correo electrónico es obligatorio.';
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      errors.email = 'Ingresa un correo electrónico válido.';
    }

    if (!formData.subject.trim()) {
      errors.subject = 'El asunto es obligatorio.';
    }

    if (!formData.message.trim()) {
      errors.message = 'El mensaje es obligatorio.';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'El mensaje debe contener al menos 10 caracteres.';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(false);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    // Simulación de envío exitoso sin servidor externo
    setSubmitted(true);
    setFieldErrors({});
    setFormData(INITIAL_FORM_STATE);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Contacto
        </Typography>
        <Typography variant="body1" color="text.secondary">
          ¿Tienes alguna consulta sobre nuestros productos o pedidos? Escríbenos.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'minmax(0, 5fr) minmax(0, 7fr)',
          },
          gap: 4,
          alignItems: 'stretch',
        }}
      >
        {/* Columna izquierda: Datos de contacto desde constantes */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            height: '100%',
            border: '1px solid #e2e8f0',
            borderRadius: 4,
            bgcolor: '#f1f5f9',
          }}
        >
          <Typography variant="h6" gutterBottom fontWeight={700}>
            Información de {STORE_INFO.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Nuestro equipo de atención al cliente responde consultas de lunes a
            viernes de 9:00 a 18:00 hs.
          </Typography>

          <Stack spacing={2.5}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <EmailIcon color="primary" />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  Correo electrónico
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {STORE_INFO.email}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <PhoneIcon color="primary" />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  Teléfono
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {STORE_INFO.phone}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
              <LocationOnIcon color="primary" sx={{ mt: 0.3 }} />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  Dirección comercial
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {STORE_INFO.address}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Paper>

        {/* Columna derecha: Formulario de contacto */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            height: '100%',
            border: '1px solid #e2e8f0',
            borderRadius: 4,
          }}
        >
          <Typography variant="h6" gutterBottom fontWeight={700}>
            Envíanos un mensaje
          </Typography>

          {submitted && (
            <Alert
              severity="success"
              sx={{ my: 2 }}
              onClose={() => setSubmitted(false)}
            >
              ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo a la brevedad.
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
              placeholder="Tu nombre"
            />

            <FormField
              label="Correo electrónico"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={fieldErrors.email}
              required
              placeholder="tu@email.com"
            />

            <FormField
              label="Asunto"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              error={fieldErrors.subject}
              required
              placeholder="Motivo de tu consulta"
            />

            <FormField
              label="Mensaje"
              name="message"
              value={formData.message}
              onChange={handleChange}
              error={fieldErrors.message}
              required
              multiline
              rows={4}
              placeholder="Escribe aquí tu consulta..."
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              endIcon={<SendIcon />}
              sx={{ mt: 2 }}
            >
              Enviar mensaje
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Contact;