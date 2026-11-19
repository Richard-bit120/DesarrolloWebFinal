import { API_ENDPOINTS } from '../constants/apiConstants';
import { apiRequest } from './api';

/**
 * Obtiene todos los productos disponibles en el catálogo.
 * Endpoint: GET /products
 */
export const getAllProducts = async (signal) => {
  const data = await apiRequest(API_ENDPOINTS.PRODUCTS, { signal });
  return Array.isArray(data) ? data : [];
};

/**
 * Obtiene el detalle de un producto según su ID.
 * Endpoint: GET /products/:id
 */
export const getProductById = async (id, signal) => {
  const data = await apiRequest(API_ENDPOINTS.PRODUCT_BY_ID(id), { signal });

  // FakeStoreAPI devuelve null o vacío si el ID no existe
  if (!data || !data.id) {
    throw new Error('El producto solicitado no existe o no se encuentra disponible.');
  }

  return data;
};

/**
 * Obtiene todas las categorías de productos disponibles.
 * Endpoint: GET /products/categories
 */
export const getAllCategories = async (signal) => {
  const data = await apiRequest(API_ENDPOINTS.CATEGORIES, { signal });
  return Array.isArray(data) ? data : [];
};

/**
 * Obtiene los productos pertenecientes a una categoría específica.
 * Endpoint: GET /products/category/:category
 */
export const getProductsByCategory = async (category, signal) => {
  const data = await apiRequest(API_ENDPOINTS.PRODUCTS_BY_CATEGORY(category), { signal });
  return Array.isArray(data) ? data : [];
};