import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

type Seccion = 'dashboard' | 'productos' | 'categorias' | 'subcategorias' | 'pedidos';

interface StatCard {
  label: string;
  value: string;
  trend: string;
  positive: boolean;
}

@Component({
  selector: 'app-panel-admin',
  standalone: true,
  imports: [],
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
  ];

  stats: StatCard[] = [
    { label: 'Ventas del mes', value: '$48,290', trend: '+12.4%', positive: true },
    { label: 'Pedidos nuevos', value: '186', trend: '+5.1%', positive: true },
    { label: 'Productos activos', value: '324', trend: '-1.2%', positive: false },
    { label: 'Clientes nuevos', value: '57', trend: '+8.9%', positive: true },
  ];

  constructor(private router: Router) {}

  seleccionarSeccion(id: Seccion) {
    this.seccionActiva.set(id);
  }

  cerrarSesion() {
    this.router.navigate(['/']);
  }
}
