// Información institucional de la tienda para Header, Footer y Contacto
export const STORE_INFO = {
  name: 'NovaStore',
  tagline: 'Tecnología, moda y accesorios en un solo lugar',
  email: 'contacto@novastore.com.ar',
  phone: '+54 11 4820-9410',
  address: 'Av. Corrientes 1450, Piso 3, Buenos Aires, Argentina',
  copyright: `© ${new Date().getFullYear()} NovaStore. Todos los derechos reservados.`,
  socialLinks: [
    { name: 'Instagram', url: 'https://instagram.com' },
    { name: 'Facebook', url: 'https://facebook.com' },
    { name: 'X (Twitter)', url: 'https://x.com' },
  ],
};

// Configuración de visualización y paginación del catálogo
export const CATALOG_CONFIG = {
  HOME_RANDOM_COUNT: 8, // Cantidad exacta de productos aleatorios en Home
  PRODUCTS_PER_PAGE: 8, // Cantidad de tarjetas por página en /productos
};

// Etiquetas amigables en español para las categorías devueltas por FakeStoreAPI
export const CATEGORY_LABELS = {
  electronics: 'Electrónica',
  jewelery: 'Joyería',
  "men's clothing": 'Indumentaria Masculina',
  "women's clothing": 'Indumentaria Femenina',
};

// Usuario real precargado en FakeStoreAPI para probar POST /auth/login
// FakeStoreAPI requiere "username" en su endpoint, pero nuestra app autentica por "email"
export const DEMO_API_USER = {
  id: 2,
  name: 'David Morrison',
  email: 'morrison@gmail.com',
  username: 'mor_2314',
  password: '83r5^_',
};