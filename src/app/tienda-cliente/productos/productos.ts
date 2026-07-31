import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  CATEGORIAS,
  SUBCATEGORIAS,
  PRODUCTOS,
  Categoria,
  Subcategoria,
  Producto
} from '../data/mock-data';

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

  categorias: Categoria[] = CATEGORIAS;
  subcategorias: Subcategoria[] = SUBCATEGORIAS;
  todosLosProductos: Producto[] = PRODUCTOS;

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
    private router: Router
  ) { }

  ngOnInit() {

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

    return this.subcategorias.filter(
      s => s.categoriaId === categoriaId
    );

  }

  filtrarSubcategoria(id: number) {

    this.subcategoriaActiva.set(id);

    this.actualizarTitulo();

  }

  obtenerNombreSubcategoria(
    subcategoriaId: number
  ): string {

    const sub = this.subcategorias.find(
      s => s.id === subcategoriaId
    );

    return sub ? sub.nombre : '';

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

    let lista = [...this.todosLosProductos];

    // SOLO NUEVOS

    if (this.soloNuevos()) {

      lista = lista.filter(
        p => p.esNuevo
      );

    }

    // SI HAY CATEGORÍA ABIERTA
    // PERO NO HAY SUBCATEGORÍA
    // NO MOSTRAR PRODUCTOS

    if (
      this.categoriaActiva() != null &&
      this.subcategoriaActiva() == null
    ) {

      return [];

    }

    // FILTRAR POR SUBCATEGORÍA

    if (this.subcategoriaActiva() != null) {

      lista = lista.filter(
        p =>
          p.subcategoriaId ===
          this.subcategoriaActiva()
      );

    }

    // ORDENAR

    switch (this.orden()) {

      case 'precio-asc':

        lista.sort(
          (a, b) => a.precio - b.precio
        );

        break;

      case 'precio-desc':

        lista.sort(
          (a, b) => b.precio - a.precio
        );

        break;

    }

    return lista;

  }

}