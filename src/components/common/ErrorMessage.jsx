import { Alert, AlertTitle, Box, Button } from '@mui/material';

const ErrorMessage = ({
  title = 'Ocurrió un problema',
  message = 'No se pudo completar la operación solicitada.',
  onRetry = null,
  retryLabel = 'Reintentar',
}) => {
  return (
    <Box sx={{ my: 3 }}>
      <Alert
        severity="error"
        variant="outlined"
        action={
          onRetry && (
            <Button color="error" size="small" onClick={onRetry}>
              {retryLabel}
            </Button>
          )
        }
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
};

export default ErrorMessage;