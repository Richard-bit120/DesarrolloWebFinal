import { useState, useEffect } from 'react';
import { getAllProducts } from '../services/productService';

/**
 * Custom Hook para obtener el listado completo de productos.
 * Problema que resuelve: evita duplicar los estados (products, loading, error)
 * y la lógica de useEffect en Home y Products.
 */
export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllProducts(controller.signal);
        setProducts(data);
      } catch (err) {
        // Ignoramos errores provocados por la cancelación limpia al desmontar
        if (err.name !== 'AbortError') {
          setError(err.message || 'Ocurrió un error al cargar los productos.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      controller.abort();
    };
  }, []);

  return { products, loading, error };
};