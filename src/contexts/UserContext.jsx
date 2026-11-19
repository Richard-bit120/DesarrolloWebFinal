import { createContext, useState, useContext } from 'react';
import { loginUserRequest, registerUserRequest } from '../services/userService';
import { DEMO_API_USER } from '../constants/appConstants';

// Creamos el contexto de usuario
export const UserContext = createContext();

// Hook personalizado auxiliar para consumir UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe utilizarse dentro de un UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  // Usuario actualmente autenticado (null si no hay sesión activa)
  // Nunca almacena la contraseña
  const [user, setUser] = useState(null);

  // Lista en memoria de usuarios registrados durante la sesión actual
  // Necesaria porque FakeStoreAPI simula POST /users pero no persiste datos reales
  const [sessionUsers, setSessionUsers] = useState([]);

  // Estados de carga y error de las operaciones de autenticación
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Limpia cualquier mensaje de error previo (útil al navegar entre Login y Registro).
   */
  const clearError = () => {
    setError(null);
  };

  /**
   * Registra un nuevo usuario de forma simulada en la sesión actual
   * y envía la petición demostrativa a POST /users de FakeStoreAPI.
   */
  const register = async ({ name, email, password }) => {
    try {
      setLoading(true);
      setError(null);

      const normalizedEmail = email.trim().toLowerCase();

      // Verificamos duplicados contra el usuario demo de la API y los registrados en sesión
      const isDemoEmail = normalizedEmail === DEMO_API_USER.email.toLowerCase();
      const alreadyExists = sessionUsers.some(
        (u) => u.email.toLowerCase() === normalizedEmail
      );

      if (isDemoEmail || alreadyExists) {
        throw new Error('Ya existe una cuenta registrada con ese correo electrónico.');
      }

      // Ejecutamos la petición real hacia FakeStoreAPI (POST /users)
      const apiResponse = await registerUserRequest({
        name: name.trim(),
        email: normalizedEmail,
        password,
      });

      // Guardamos el registro en memoria para permitir su inicio de sesión posterior
      const newRegisteredUser = {
        id: apiResponse?.id || Date.now(),
        name: name.trim(),
        email: normalizedEmail,
        password,
      };

      setSessionUsers((prevUsers) => [...prevUsers, newRegisteredUser]);
      return true;
    } catch (err) {
      setError(err.message || 'No se pudo completar el registro.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Inicia sesión validando credenciales.
   * Soporta el usuario real de FakeStoreAPI (morrison@gmail.com) y los usuarios
   * creados durante la sesión en la pantalla de Registro.
   */
  const login = async ({ email, password }) => {
    try {
      setLoading(true);
      setError(null);

      const normalizedEmail = email.trim().toLowerCase();

      // Caso 1: El usuario ingresa con la cuenta demo vinculada a FakeStoreAPI
      if (normalizedEmail === DEMO_API_USER.email.toLowerCase()) {
        // Enviamos las credenciales a POST /auth/login de FakeStoreAPI
        const response = await loginUserRequest({
          username: DEMO_API_USER.username,
          password,
        });

        if (!response?.token) {
          throw new Error('No se recibió un token válido desde el servidor.');
        }

        // Guardamos el perfil activo SIN contraseña
        setUser({
          id: DEMO_API_USER.id,
          name: DEMO_API_USER.name,
          email: DEMO_API_USER.email,
        });
        return true;
      }

      // Caso 2: El usuario ingresa con una cuenta creada previamente en /registro
      const matchedUser = sessionUsers.find(
        (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
      );

      if (!matchedUser) {
        throw new Error('Credenciales incorrectas. Verifica tu email y contraseña.');
      }

      // Guardamos el perfil activo SIN contraseña
      setUser({
        id: matchedUser.id,
        name: matchedUser.name,
        email: matchedUser.email,
      });
      return true;
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cierra la sesión activa limpiando los datos del usuario actual.
   */
  const logout = () => {
    setUser(null);
    setError(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        loading,
        error,
        clearError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};