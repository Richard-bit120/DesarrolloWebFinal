// URL base oficial de la API utilizada en el proyecto
export const API_BASE_URL = 'https://fakestoreapi.com';

// Endpoints disponibles agrupados por recurso
export const API_ENDPOINTS = {
  // Recursos de productos
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id) => `/products/${id}`,
  CATEGORIES: '/products/categories',
  PRODUCTS_BY_CATEGORY: (category) => `/products/category/${encodeURIComponent(category)}`,

  // Recursos de usuarios y autenticación
  LOGIN: '/auth/login',
  USERS: '/users',
};