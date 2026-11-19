import { useState } from 'react';
import { Alert, Box, Button, Container, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import ProductFilters from '../components/products/ProductFilters';
import ProductList from '../components/products/ProductList';
import ProductPagination from '../components/products/ProductPagination';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import { CATALOG_CONFIG } from '../constants/appConstants';

const Products = () => {
  const location = useLocation();
  const initialCategory = location.state?.selectedCategory || 'all';

  const { products, loading: loadingProducts, error: productsError } = useProducts();
  const { categories, error: categoriesError } = useCategories();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);

  // Al cambiar la búsqueda, volvemos automáticamente a la página 1
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  // Al cambiar la categoría, volvemos automáticamente a la página 1
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setCurrentPage(1);
  };

  // Filtrado combinado (búsqueda insensible a mayúsculas + categoría)
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Cálculo de paginación derivado de los productos filtrados
  const totalPages = Math.ceil(
    filteredProducts.length / CATALOG_CONFIG.PRODUCTS_PER_PAGE
  );
  const startIndex = (currentPage - 1) * CATALOG_CONFIG.PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + CATALOG_CONFIG.PRODUCTS_PER_PAGE
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Catálogo de Productos
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Explora todos nuestros artículos, filtra por categoría o busca por nombre.
        </Typography>
      </Box>

      {categoriesError && (
        <ErrorMessage
          title="Aviso sobre categorías"
          message={categoriesError}
        />
      )}

      <ProductFilters
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        categories={categories}
        onClearFilters={handleClearFilters}
      />

      {loadingProducts && <Loading message="Cargando catálogo de productos..." />}

      {productsError && (
        <ErrorMessage
          title="Error al consultar productos"
          message={productsError}
        />
      )}

      {!loadingProducts && !productsError && (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Mostrando {paginatedProducts.length} de {filteredProducts.length}{' '}
            {filteredProducts.length === 1 ? 'producto' : 'productos'}
          </Typography>

          {filteredProducts.length === 0 ? (
            <Alert
              severity="info"
              sx={{ my: 3 }}
              action={
                <Button color="inherit" size="small" onClick={handleClearFilters}>
                  Restablecer filtros
                </Button>
              }
            >
              No se encontraron productos que coincidan con tu búsqueda o categoría seleccionada.
            </Alert>
          ) : (
            <>
              <ProductList products={paginatedProducts} />
              <ProductPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default Products;