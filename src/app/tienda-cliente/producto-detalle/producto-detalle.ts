import { Component, computed, effect, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Producto } from '../../shared/models/inventario.models';
import { InventarioService } from '../services/inventario.service';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './producto-detalle.html',
  styleUrl: './producto-detalle.css',
})
export class ProductoDetalle {
  private productoId = signal<number | null>(null);

  producto = signal<Producto | null>(null);
  // Mientras el catálogo no haya llegado del backend, no sabemos aún si el
  // producto existe o no; evita mostrar "no encontrado" antes de tiempo.
  cargando = computed(() => this.inventario.productosSignal()().length === 0);
  agregado = signal(false);
  cantidad = signal(1);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public inventario: InventarioService,
    private carrito: CarritoService,
  ) {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.productoId.set(Number.isFinite(id) ? id : null);
      this.cantidad.set(1);
      this.agregado.set(false);
    });

    effect(() => {
      const id = this.productoId();
      const productos = this.inventario.productosSignal()();
      this.producto.set(productos.find((p) => p.id === id) ?? null);
    });
  }

  nombreSubcategoria(id: number): string {
    return this.inventario.subcategoriasSignal()().find((s) => s.id === id)?.nombre ?? '—';
  }

  aumentar() {
    const producto = this.producto();
    if (!producto) return;
    this.cantidad.update((c) => Math.min(c + 1, producto.stock));
  }

  disminuir() {
    this.cantidad.update((c) => Math.max(c - 1, 1));
  }

  agregarAlCarrito() {
    const producto = this.producto();
    if (!producto || producto.stock <= 0) return;

    this.carrito.agregarProductoConCantidad(producto, this.cantidad());
    this.agregado.set(true);
  }

  irAlCarrito() {
    this.router.navigate(['/carrito']);
  }
}
