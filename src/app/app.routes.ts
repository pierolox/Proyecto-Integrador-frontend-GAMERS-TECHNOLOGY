import { Routes } from '@angular/router';

// Login (acceso del administrador)
import { Login } from './login/login';

// Panel del administrador
import { PanelAdmin } from './panel-admin/panel-admin';
import { adminGuard } from './admin.guard';

// Tienda del cliente (storefront)
import { TiendaCliente } from './tienda-cliente/tienda-cliente';
import { Home } from './tienda-cliente/home/home';
import { Productos as TiendaProductos } from './tienda-cliente/productos/productos';
import { Carrito } from './tienda-cliente/carrito/carrito';
import { Ofertas } from './tienda-cliente/ofertas/ofertas';
import { Nosotros } from './tienda-cliente/nosotros/nosotros';
import { Contactanos } from './tienda-cliente/contactanos/contactanos';
import { Faq } from './tienda-cliente/faq/faq';
import { Envios } from './tienda-cliente/envios/envios';
import { Devoluciones } from './tienda-cliente/devoluciones/devoluciones';
import { Busqueda } from './tienda-cliente/busqueda/busqueda';
import { ProductoDetalle } from './tienda-cliente/producto-detalle/producto-detalle';

export const routes: Routes = [
  // Acceso del administrador
  { path: 'login', component: Login },

  // Panel del administrador (protegido: requiere sesión con rol ADMIN)
  { path: 'panel-admin', component: PanelAdmin, canActivate: [adminGuard] },

  // Tienda del cliente (todo lo que no sea /login ni /panel-admin)
  {
    path: '',
    component: TiendaCliente,
    children: [
      { path: '', component: Home },
      { path: 'productos', component: TiendaProductos },
      { path: 'productos/nuevos', component: TiendaProductos },
      { path: 'productos/:id', component: ProductoDetalle },
      { path: 'carrito', component: Carrito },
      { path: 'ofertas', component: Ofertas },
      { path: 'nosotros', component: Nosotros },
      { path: 'contactanos', component: Contactanos },
      { path: 'faq', component: Faq },
      { path: 'envios', component: Envios },
      { path: 'devoluciones', component: Devoluciones },
      { path: 'busqueda', component: Busqueda },
    ],
  },

  { path: '**', redirectTo: '' },
];