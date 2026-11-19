import { Box, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFound = ({
  title = '404 - Página no encontrada',
  message = 'Lo sentimos, la ruta que intentas visitar no existe o fue movida.',
}) => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          minHeight: '60vh',
          gap: 2,
          py: 6,
        }}
      >
        <ErrorOutlineIcon color="primary" sx={{ fontSize: 72 }} />
        <Typography variant="h4" component="h1" color="text.primary">
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
          {message}
        </Typography>
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          color="primary"
          size="large"
        >
          Volver al Inicio
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;