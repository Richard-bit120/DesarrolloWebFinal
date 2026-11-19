import { API_ENDPOINTS } from '../constants/apiConstants';
import { apiRequest } from './api';

/**
 * Envía credenciales de acceso a FakeStoreAPI para simular inicio de sesión.
 * Endpoint: POST /auth/login
 * Nota: FakeStoreAPI espera { username, password } y devuelve { token }.
 */
export const loginUserRequest = async ({ username, password }) => {
  const data = await apiRequest(API_ENDPOINTS.LOGIN, {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
  });

  return data;
};

/**
 * Envía los datos de registro a FakeStoreAPI para simular la creación de un usuario.
 * Endpoint: POST /users
 * Nota: FakeStoreAPI devuelve { id: 11 } pero no persiste el usuario en su base de datos.
 */
export const registerUserRequest = async ({ name, email, password }) => {
  const nameParts = name.trim().split(' ');
  const firstname = nameParts[0] || name;
  const lastname = nameParts.slice(1).join(' ') || 'Usuario';

  const data = await apiRequest(API_ENDPOINTS.USERS, {
    method: 'POST',
    body: JSON.stringify({
      email,
      username: email.split('@')[0],
      password,
      name: {
        firstname,
        lastname,
      },
    }),
  });

  return data;
};