import { useState } from 'react';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink, NavLink, useNavigate } from 'react-router-dom';
import { STORE_INFO } from '../../constants/appConstants';
import { useCart } from '../../contexts/CartContext';
import { useUser } from '../../contexts/UserContext';

const navLinks = [
  { label: 'Inicio', path: '/' },
  { label: 'Productos', path: '/productos' },
  { label: 'Contacto', path: '/contacto' },
];

const Header = () => {
  const { totalItems } = useCart();
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate('/');
  };

  // Estilo aplicado por NavLink cuando la ruta está activa
  const navLinkStyle = ({ isActive }) => ({
    color: '#ffffff',
    textDecoration: 'none',
    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.16)' : 'transparent',
    borderRadius: 8,
  });

  // Contenido del menú lateral para dispositivos móviles
  const drawerContent = (
    <Box sx={{ width: 260 }} role="presentation" onClick={handleDrawerToggle}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          p: 2,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
        }}
      >
        <StorefrontIcon />
        <Typography variant="h6" fontWeight={700}>
          {STORE_INFO.name}
        </Typography>
      </Box>

      <List>
        {navLinks.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton component={RouterLink} to={item.path}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}

        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/carrito">
            <ListItemText primary={`Carrito (${totalItems})`} />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />

      <List>
        {user ? (
          <>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to="/perfil">
                <ListItemText primary={`Perfil (${user.name})`} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemText primary="Cerrar sesión" sx={{ color: 'error.main' }} />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to="/login">
                <ListItemText primary="Ingresar (Login)" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to="/registro">
                <ListItemText primary="Registrarse" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" color="primary" elevation={1}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', gap: 1 }}>
            {/* Botón menú móvil + Logo y nombre de la tienda */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                color="inherit"
                aria-label="Abrir menú de navegación"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>

              <Box
                component={RouterLink}
                to="/"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <StorefrontIcon sx={{ fontSize: 30 }} />
                <Typography
                  variant="h6"
                  component="span"
                  sx={{ fontWeight: 700, letterSpacing: 0.4 }}
                >
                  {STORE_INFO.name}
                </Typography>
              </Box>
            </Box>

            {/* Enlaces principales en escritorio */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
              {navLinks.map((item) => (
                <Button
                  key={item.path}
                  component={NavLink}
                  to={item.path}
                  end={item.path === '/'}
                  style={navLinkStyle}
                  sx={{ px: 2 }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Acciones de usuario y carrito */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                component={RouterLink}
                to="/carrito"
                color="inherit"
                aria-label="Ver carrito de compras"
              >
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {user ? (
                <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
                  <Button
                    component={NavLink}
                    to="/perfil"
                    style={navLinkStyle}
                    startIcon={<PersonIcon />}
                  >
                    {user.name.split(' ')[0]}
                  </Button>
                  <Button
                    color="inherit"
                    variant="outlined"
                    size="small"
                    onClick={handleLogout}
                    startIcon={<LogoutIcon />}
                    sx={{ borderColor: 'rgba(255,255,255,0.5)' }}
                  >
                    Salir
                  </Button>
                </Box>
              ) : (
                <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
                  <Button component={NavLink} to="/login" style={navLinkStyle}>
                    Ingresar
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/registro"
                    variant="contained"
                    color="secondary"
                    size="small"
                  >
                    Registro
                  </Button>
                </Box>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer lateral para pantallas pequeñas */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { md: 'none' } }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Header;