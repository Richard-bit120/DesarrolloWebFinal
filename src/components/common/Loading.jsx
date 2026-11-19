import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = ({ message = 'Cargando...' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '40vh',
        gap: 2,
        py: 4,
      }}
    >
      <CircularProgress color="primary" size={44} />
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

export default Loading;