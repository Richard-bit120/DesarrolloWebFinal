import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1e3a8a',      // Azul índigo profundo para navegación y acciones principales
      light: '#3b82f6',
      dark: '#172554',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0284c7',      // Azul cian para acentos y badges
      light: '#38bdf8',
      dark: '#0369a1',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc',   // Fondo general gris muy claro para descanso visual
      paper: '#ffffff',     // Fondo blanco puro para tarjetas y formularios
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none', // Evita textos en mayúsculas forzadas en botones
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          paddingInline: 18,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.05)',
        },
      },
    },
  },
});

export default theme;