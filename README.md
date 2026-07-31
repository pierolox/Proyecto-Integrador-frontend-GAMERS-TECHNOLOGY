# Gamers Technology — Proyecto unificado

Un solo proyecto Angular con el login, el panel del administrador y la tienda del
cliente juntos.

## Estructura

```
src/app/
  login/            Login del administrador (sin cambios respecto al proyecto original)
  panel-admin/       Panel del administrador: dashboard, productos, categorías,
                      subcategorías, pedidos, y su propio data/mock-data.ts
  tienda-cliente/    Tienda del cliente: header, footer, home, productos, carrito,
                      ofertas, nosotros, contactanos, busqueda, registro, y su
                      propio data/mock-data.ts. Incluye tienda-cliente.ts/html/css,
                      que es el "shell" (header + <router-outlet> + footer) que
                      envuelve todas las páginas de la tienda.
  app.routes.ts      Rutas combinadas de los tres módulos
  app.config.ts      Providers combinados (router + charts)
  app.ts/html/css    Shell raíz (solo <router-outlet>)
```

## Rutas

| Ruta                     | Componente                          |
|--------------------------|--------------------------------------|
| `/login`                 | Login (admin)                        |
| `/panel-admin`           | Panel del administrador               |
| `/`                      | Home (tienda)                         |
| `/productos`             | Productos (tienda)                    |
| `/productos/nuevos`      | Productos (tienda)                    |
| `/registro`              | Registro (tienda)                     |
| `/carrito`               | Carrito (tienda)                      |
| `/ofertas`               | Ofertas (tienda)                      |
| `/nosotros`              | Nosotros (tienda)                     |
| `/contactanos`           | Contáctanos (tienda)                  |
| `/busqueda`              | Búsqueda (tienda)                     |
| cualquier otra           | redirige a `/`                        |

Nota: en `app.routes.ts` el componente `Productos` de la tienda se importa como
`TiendaProductos` únicamente para no chocar de nombre con el `Productos` del
panel-admin (son dos componentes distintos con el mismo nombre de clase, cada
uno en su propia carpeta).

## Qué se corrigió al unificar

- Se normalizaron todos los saltos de línea a LF (el proyecto de la tienda traía
  CRLF de Windows mezclado con el resto).
- Se eliminaron archivos `.js` sueltos que habían quedado compilados por error
  dentro de `src/` (`login.js`, `panel-admin.js`, `app.js`, `app.config.js`,
  `app.routes.js`, `main.js`).
- Se arregló el espacio en blanco que aparecía debajo de algunas páginas (como
  "Nosotros"): el shell raíz y el shell de la tienda ahora fuerzan
  `min-height: 100vh` y `flex: 1` en cadena para que el contenido siempre llene
  el alto de la ventana, sin importar cuán corta sea la página.

## Cómo correrlo

```
npm install
npm start
```
