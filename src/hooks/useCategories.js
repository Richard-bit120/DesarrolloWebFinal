import { useState, useEffect } from 'react';
import { getAllCategories } from '../services/productService';

/**
 * Custom Hook para obtener las categorías disponibles desde FakeStoreAPI.
 * Problema que resuelve: centraliza la descarga y el manejo de errores de categorías
 * para reutilizarlos en la navegación del Home y en los filtros del catálogo.
 */
export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllCategories(controller.signal);
        setCategories(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Ocurrió un error al cargar las categorías.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchCategories();

    return () => {
      controller.abort();
    };
  }, []);

  return { categories, loading, error };
};