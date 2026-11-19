import { Box, Container, Divider, Link, Typography } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link as RouterLink } from 'react-router-dom';
import { STORE_INFO } from '../../constants/appConstants';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#0f172a',
        color: '#e2e8f0',
        pt: 5,
        pb: 3,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              md: 'repeat(3, minmax(0, 1fr))',
            },
            gap: 4,
          }}
        >
          {/* Columna 1: Identidad de la tienda */}
          <Box sx={{ gridColumn: { xs: '1 / -1', md: 'auto' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <StorefrontIcon color="secondary" />
              <Typography variant="h6" fontWeight={700} color="#ffffff">
                {STORE_INFO.name}
              </Typography>
            </Box>
            <Typography variant="body2" color="#94a3b8" sx={{ mb: 2 }}>
              {STORE_INFO.tagline}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {STORE_INFO.socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  color="secondary.light"
                  variant="body2"
                >
                  {social.name}
                </Link>
              ))}
            </Box>
          </Box>

          {/* Columna 2: Navegación rápida */}
          <Box>
            <Typography variant="subtitle1" fontWeight={600} color="#ffffff" gutterBottom>
              Navegación
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={RouterLink} to="/" color="#cbd5e1" underline="hover" variant="body2">
                Inicio
              </Link>
              <Link
                component={RouterLink}
                to="/productos"
                color="#cbd5e1"
                underline="hover"
                variant="body2"
              >
                Catálogo de Productos
              </Link>
              <Link
                component={RouterLink}
                to="/carrito"
                color="#cbd5e1"
                underline="hover"
                variant="body2"
              >
                Mi Carrito
              </Link>
              <Link
                component={RouterLink}
                to="/contacto"
                color="#cbd5e1"
                underline="hover"
                variant="body2"
              >
                Contacto
              </Link>
            </Box>
          </Box>

          {/* Columna 3: Datos de contacto institucionales */}
          <Box>
            <Typography variant="subtitle1" fontWeight={600} color="#ffffff" gutterBottom>
              Información de Contacto
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon fontSize="small" color="secondary" />
                <Typography variant="body2" color="#cbd5e1">
                  {STORE_INFO.email}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon fontSize="small" color="secondary" />
                <Typography variant="body2" color="#cbd5e1">
                  {STORE_INFO.phone}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <LocationOnIcon fontSize="small" color="secondary" sx={{ mt: 0.2 }} />
                <Typography variant="body2" color="#cbd5e1">
                  {STORE_INFO.address}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)', my: 3 }} />

        <Typography variant="body2" color="#94a3b8" align="center">
          {STORE_INFO.copyright}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;