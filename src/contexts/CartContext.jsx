import { createContext, useState, useContext } from 'react';
import { useUser } from './UserContext';

// Creamos el contexto del carrito
export const CartContext = createContext();

// Hook personalizado auxiliar para consumir el contexto de forma limpia y segura
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe utilizarse dentro de un CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // Diccionario en memoria que guarda el carrito de cada usuario por clave única
  // Ejemplo: { 'morrison@gmail.com': [...], 'guest': [...] }
  const [cartsByUser, setCartsByUser] = useState({});
  const { user } = useUser();

  // Clave activa derivada de la sesión actual (sin estados redundantes ni useEffect)
  const currentCartKey = user?.email ? user.email.toLowerCase() : 'guest';

  // Carrito activo calculado al vuelo según el usuario logueado
  const cart = cartsByUser[currentCartKey] || [];

  /**
   * Agrega un producto al carrito del usuario activo.
   * Si el producto ya existe, incrementa su cantidad en 1 sin duplicar el ítem.
   */
  const addProduct = (product) => {
    setCartsByUser((prevCarts) => {
      const currentCart = prevCarts[currentCartKey] || [];
      const existingProduct = currentCart.find((item) => item.id === product.id);

      const updatedCart = existingProduct
        ? currentCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...currentCart, { ...product, quantity: 1 }];

      return {
        ...prevCarts,
        [currentCartKey]: updatedCart,
      };
    });
  };

  /**
   * Elimina un producto específico del carrito del usuario activo según su ID.
   */
  const removeProduct = (productId) => {
    setCartsByUser((prevCarts) => {
      const currentCart = prevCarts[currentCartKey] || [];
      return {
        ...prevCarts,
        [currentCartKey]: currentCart.filter((item) => item.id !== productId),
      };
    });
  };

  /**
   * Vacía todos los productos del carrito del usuario activo.
   */
  const clearCart = () => {
    setCartsByUser((prevCarts) => ({
      ...prevCarts,
      [currentCartKey]: [],
    }));
  };

  /**
   * Incrementa en 1 la cantidad de un producto existente.
   */
  const increaseQuantity = (productId) => {
    setCartsByUser((prevCarts) => {
      const currentCart = prevCarts[currentCartKey] || [];
      return {
        ...prevCarts,
        [currentCartKey]: currentCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    });
  };

  /**
   * Disminuye en 1 la cantidad de un producto existente.
   * Regla de negocio: nunca permite cantidades menores a 1.
   */
  const decreaseQuantity = (productId) => {
    setCartsByUser((prevCarts) => {
      const currentCart = prevCarts[currentCartKey] || [];
      return {
        ...prevCarts,
        [currentCartKey]: currentCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
            : item
        ),
      };
    });
  };

  // Valores calculados dinámicamente (evita estados redundantes)
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        removeProduct,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        total,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};