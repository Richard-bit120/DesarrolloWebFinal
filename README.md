# NovaStore — E-Commerce con React 18

Aplicación web de comercio electrónico (SPA) desarrollada como proyecto académico final utilizando **React 18**, **Vite**, **JavaScript ES6+**, **React Router DOM v6**, **Material UI** y **Context API**, consumiendo datos desde **FakeStoreAPI** mediante **Fetch API nativa**.

---

## Descripción

**NovaStore** permite a los usuarios explorar un catálogo de productos en tiempo real, filtrar artículos por categoría o nombre, consultar especificaciones y valoraciones individuales, administrar un carrito de compras con cálculo automático de subtotales y totales, y simular flujos de registro, inicio de sesión y gestión de perfil de usuario.

La aplicación está diseñada bajo una arquitectura modular de 4 capas (Presentación, Estado Global, Custom Hooks y Servicios HTTP) que separa la lógica de negocio y consumo de red de los componentes visuales.

---

## Tecnologías Utilizadas

- **React 18** (`useState`, `useEffect`, `useContext`, Custom Hooks)
- **Vite** (Entorno de desarrollo y empaquetador)
- **JavaScript ES6+**
- **React Router DOM v6** (`BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`, `useNavigate`, `useParams`)
- **Material UI (MUI v6)** (`@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`)
- **Context API** (Estados globales independientes para Carrito y Usuario)
- **Fetch API nativa** (`async/await` y manejo de errores con `try/catch`)

---

## Requisitos de Instalación

- **Node.js** versión 18 o superior.
- **npm** (incluido con Node.js).
- Conexión a internet para consultar los endpoints de FakeStoreAPI.

---

## Instalación y Comandos de Ejecución

1. Clonar el repositorio e ingresar al directorio del proyecto:
   ```bash
   git clone [https://github.com/tu-usuario/ecommerce-novastore.git](https://github.com/tu-usuario/ecommerce-novastore.git)
   cd ecommerce-novastore

ecommerce-novastore/
├── index.html
├── package.json
├── README.md
└── src/
    ├── components/
    │   ├── cart/
    │   │   ├── CartItem.jsx
    │   │   └── CartSummary.jsx
    │   ├── common/
    │   │   ├── ErrorMessage.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Header.jsx
    │   │   ├── Loading.jsx
    │   │   └── NotFound.jsx
    │   ├── forms/
    │   │   └── FormField.jsx
    │   └── products/
    │       ├── ProductCard.jsx
    │       ├── ProductFilters.jsx
    │       ├── ProductList.jsx
    │       └── ProductPagination.jsx
    ├── constants/
    │   ├── apiConstants.js
    │   └── appConstants.js
    ├── contexts/
    │   ├── CartContext.jsx
    │   └── UserContext.jsx
    ├── hooks/
    │   ├── useCategories.js
    │   └── useProducts.js
    ├── pages/
    │   ├── Cart.jsx
    │   ├── Contact.jsx
    │   ├── Home.jsx
    │   ├── Login.jsx
    │   ├── ProductDetail.jsx
    │   ├── Products.jsx
    │   ├── Profile.jsx
    │   └── Register.jsx
    ├── routes/
    │   └── AppRoutes.jsx
    ├── services/
    │   ├── api.js
    │   ├── productService.js
    │   └── userService.js
    ├── styles/
    │   └── theme.js
    ├── App.jsx
    └── main.jsx