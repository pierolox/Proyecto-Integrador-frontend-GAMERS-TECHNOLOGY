import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventarioService } from '../services/inventario.service';
import { Categoria, Subcategoria, Producto } from '../../shared/models/inventario.models';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})

export class Productos implements OnInit {

  // ============================
  // DATOS
  // ============================

  categorias: Categoria[] = [];
  subcategorias: Subcategoria[] = [];
  todosLosProductos: Producto[] = [];

  // ============================
  // ESTADO
  // ============================

  categoriaActiva = signal<number | null>(null);
  subcategoriaActiva = signal<number | null>(null);

  soloNuevos = signal(false);

  orden = signal<'relevancia' | 'precio-asc' | 'precio-desc'>(
    'relevancia'
  );

  tituloPagina = signal('Todos los productos');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private inventario: InventarioService
  ) { }

  ngOnInit() {
    this.categorias = this.inventario.obtenerCategorias();
    this.subcategorias = this.inventario.obtenerSubcategorias();
    this.todosLosProductos = this.inventario.obtenerProductos();

    this.soloNuevos.set(
      this.router.url.includes('/productos/nuevos')
    );

    this.actualizarTitulo();
  }

  // =====================================================
  // CATEGORÍAS
  // =====================================================

  filtrarCategoria(id: number | null) {

    if (id === null) {

      this.categoriaActiva.set(null);
      this.subcategoriaActiva.set(null);
    }
    else if (this.categoriaActiva() === id) {

      this.categoriaActiva.set(null);
      this.subcategoriaActiva.set(null);
    }
    else {

      this.categoriaActiva.set(id);
      this.subcategoriaActiva.set(null);
    }

    this.actualizarTitulo();

  }

  // =====================================================
  // SUBCATEGORÍAS
  // =====================================================

  obtenerSubcategorias(
    categoriaId: number
  ): Subcategoria[] {
    return this.inventario.obtenerSubcategoriasPorCategoria(categoriaId);
  }

  filtrarSubcategoria(id: number) {

    this.subcategoriaActiva.set(id);
    this.actualizarTitulo();
  }

  obtenerNombreSubcategoria(
    subcategoriaId: number
  ): string {

    return this.inventario
      .obtenerNombreSubcategoria(subcategoriaId);
  }

  // =====================================================
  // TÍTULO
  // =====================================================

  actualizarTitulo() {
    // NUEVOS
    if (this.soloNuevos()) {

      this.tituloPagina.set(
        'Nuestros nuevos productos'
      );

      return;
    }

    // SUBCATEGORÍA

    if (this.subcategoriaActiva() != null) {

      const sub = this.subcategorias.find(
        s => s.id === this.subcategoriaActiva()
      );

      this.tituloPagina.set(
        sub ? sub.nombre : 'Productos'
      );

      return;
    }

    // CATEGORÍA

    if (this.categoriaActiva() != null) {

      const cat = this.categorias.find(
        c => c.id === this.categoriaActiva()
      );

      this.tituloPagina.set(
        cat
          ? `Subcategorías de ${cat.nombre}`
          : 'Productos'
      );

      return;
    }

    this.tituloPagina.set(
      'Todos los productos'
    );
  }

  // =====================================================
  // ORDEN
  // =====================================================

  cambiarOrden(
    valor: 'relevancia' | 'precio-asc' | 'precio-desc'
  ) {
    this.orden.set(valor);
  }

  // =====================================================
  // PRODUCTOS FILTRADOS
  // =====================================================

  get productosFiltrados(): Producto[] {

    return this.inventario.obtenerProductosFiltrados(
      this.subcategoriaActiva(),
      this.soloNuevos(),
      this.orden()
    );
  }
}