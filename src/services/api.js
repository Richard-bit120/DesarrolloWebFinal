import { API_BASE_URL } from '../constants/apiConstants';

/**
 * Cliente HTTP genérico basado en Fetch API nativa.
 * Centraliza la configuración de cabeceras, el control de errores HTTP
 * y el parseo seguro de las respuestas de FakeStoreAPI.
 *
 * @param {string} endpoint - Ruta relativa del recurso (ej. '/products')
 * @param {object} options - Configuración opcional de fetch (method, body, headers, signal)
 * @returns {Promise<any>} Datos procesados de la respuesta
 */
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    // Leemos primero como texto para evitar errores de parseo si la API
    // devuelve una respuesta vacía (ej. producto inexistente) o texto plano (ej. error 401)
    const rawText = await response.text();
    let data = null;

    if (rawText) {
      try {
        data = JSON.parse(rawText);
      } catch {
        data = rawText;
      }
    }

    // Fetch no lanza error automáticamente en códigos HTTP 4xx o 5xx; lo verificamos manualmente
    if (!response.ok) {
      const errorMessage =
        typeof data === 'string' && data.trim() !== ''
          ? data
          : data?.message || `Error HTTP ${response.status}: No se pudo completar la solicitud.`;

      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    // Si falla la conexión a internet o el servidor no responde, personalizamos el mensaje
    if (error.name === 'TypeError') {
      throw new Error('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
    }
    throw error;
  }
};