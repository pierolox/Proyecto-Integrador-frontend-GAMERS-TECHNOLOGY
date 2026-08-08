import { Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Dashboard } from './dashboard/dashboard';
import { Productos } from './productos/productos';
import { Categorias } from './categorias/categorias';
import { Subcategorias } from './subcategorias/subcategorias';
import { Pedidos } from './pedidos/pedidos';
import { Usuarios } from './usuarios/usuarios';
import { PedidoService } from '../tienda-cliente/services/pedido.service';
import { UsuarioService } from '../tienda-cliente/services/usuario.service';
import { InventarioService } from '../tienda-cliente/services/inventario.service';

type Seccion = 'dashboard' | 'productos' | 'categorias' | 'subcategorias' | 'pedidos' | 'usuarios';

interface StatCard {
  label: string;
  value: string;
  trend: string;
  positive: boolean;
}

@Component({
  selector: 'app-panel-admin',
  standalone: true,
  imports: [Dashboard, Productos, Categorias, Subcategorias, Pedidos, Usuarios],
  templateUrl: './panel-admin.html',
  styleUrl: './panel-admin.css',
})
export class PanelAdmin {
  seccionActiva = signal<Seccion>('dashboard');

  secciones: { id: Seccion; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'grid' },
    { id: 'productos', label: 'Productos', icon: 'box' },
    { id: 'categorias', label: 'Categorías', icon: 'tag' },
    { id: 'subcategorias', label: 'SubCategorías', icon: 'layers' },
    { id: 'pedidos', label: 'Pedidos', icon: 'cart' },
    { id: 'usuarios', label: 'Usuarios', icon: 'usuarios' },
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private pedidoService: PedidoService,
    private usuarioService: UsuarioService,
    private inventarioService: InventarioService,
  ) {
    // El header del dashboard necesita pedidos/usuarios reales, así que se
    // piden apenas se entra al panel (InventarioService ya carga solo).
    this.pedidoService.cargarTodos();
    this.usuarioService.cargarTodos();
  }

  private esDelMesActual(fechaIso: string): boolean {
    const fecha = new Date(fechaIso);
    const ahora = new Date();
    return fecha.getMonth() === ahora.getMonth() && fecha.getFullYear() === ahora.getFullYear();
  }

  // Tarjetas de resumen del dashboard, calculadas con datos reales del backend
  // (antes eran valores fijos de ejemplo).
  stats = computed<StatCard[]>(() => {
    const pedidos = this.pedidoService.pedidosSignal()();
    const usuarios = this.usuarioService.usuariosSignal()();
    const productos = this.inventarioService.productosSignal()();

    const pedidosDelMes = pedidos.filter((p) => this.esDelMesActual(p.fecha));
    const ventasDelMes = pedidosDelMes.reduce((sum, p) => sum + p.total, 0);
    const productosActivos = productos.filter((p) => p.estado === 'Activo').length;
    const clientesNuevos = usuarios.filter(
      (u) => u.rol === 'USUARIO' && this.esDelMesActual(u.fechaRegistro),
    ).length;

    return [
      { label: 'Ventas del mes', value: `S/. ${ventasDelMes.toLocaleString('es-PE')}`, trend: 'este mes', positive: true },
      { label: 'Pedidos nuevos', value: `${pedidosDelMes.length}`, trend: 'este mes', positive: true },
      { label: 'Productos activos', value: `${productosActivos}`, trend: 'en catálogo', positive: true },
      { label: 'Clientes nuevos', value: `${clientesNuevos}`, trend: 'este mes', positive: true },
    ];
  });

  seleccionarSeccion(id: Seccion) {
    this.seccionActiva.set(id);
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}