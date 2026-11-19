import { TextField } from '@mui/material';

const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error = '',
  required = false,
  multiline = false,
  rows = 1,
  disabled = false,
  placeholder = '',
}) => {
  return (
    <TextField
      fullWidth
      margin="normal"
      variant="outlined"
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      multiline={multiline}
      rows={multiline ? rows : undefined}
      disabled={disabled}
      placeholder={placeholder}
      error={Boolean(error)}
      helperText={error}
    />
  );
};

export default FormField;