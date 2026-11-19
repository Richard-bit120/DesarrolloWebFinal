import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { CATEGORY_LABELS } from '../../constants/appConstants';

const ProductFilters = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  onClearFilters,
}) => {
  const hasActiveFilters = searchTerm.trim() !== '' || selectedCategory !== 'all';

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        mb: 3,
        border: '1px solid #e2e8f0',
        borderRadius: 3,
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            size="small"
            label="Buscar producto por nombre"
            placeholder="Ej. mochila, camisa, monitor..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={8} md={4}>
          <FormControl fullWidth size="small">
            <InputLabel id="category-filter-label">Categoría</InputLabel>
            <Select
              labelId="category-filter-label"
              id="category-filter"
              value={selectedCategory}
              label="Categoría"
              onChange={(e) => onCategoryChange(e.target.value)}
            >
              <MenuItem value="all">Todas las categorías</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {CATEGORY_LABELS[category] || category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4} md={2}>
          <Button
            fullWidth
            variant="outlined"
            color="inherit"
            startIcon={<FilterAltOffIcon />}
            onClick={onClearFilters}
            disabled={!hasActiveFilters}
          >
            Limpiar
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductFilters;