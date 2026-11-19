import { createContext, useState, useContext } from 'react';

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
  // Estado principal: arreglo de productos con su propiedad "quantity"
  const [cart, setCart] = useState([]);

  /**
   * Agrega un producto al carrito.
   * Si el producto ya existe, incrementa su cantidad en 1 sin duplicar el ítem.
   */
  const addProduct = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  /**
   * Elimina un producto específico del carrito según su ID.
   */
  const removeProduct = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  /**
   * Vacía todos los productos del carrito.
   */
  const clearCart = () => {
    setCart([]);
  };

  /**
   * Incrementa en 1 la cantidad de un producto existente.
   */
  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  /**
   * Disminuye en 1 la cantidad de un producto existente.
   * Regla de negocio: nunca permite cantidades menores a 1.
   */
  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
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