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
  categorias: Categoria[] = CATEGORIAS;
  subcategorias: Subcategoria[] = SUBCATEGORIAS;
  todosLosProductos: Producto[] = PRODUCTOS;

  soloNuevos = signal(false);
  categoriaActiva = signal<number | null>(null);
  subcategoriaActiva = signal<number | null>(null);
  orden = signal<'relevancia' | 'precio-asc' | 'precio-desc'>('relevancia');

  tituloPagina = signal('Nuestros nuevos productos');

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.soloNuevos.set(this.router.url.includes('/productos/nuevos'));
    this.route.queryParams.subscribe((params) => {
      this.categoriaActiva.set(params['categoria'] ?? null);
      this.actualizarTitulo();
    });
  }

  private actualizarTitulo() {

    if (this.subcategoriaActiva() !== null) {

      const sub = this.subcategorias.find(
        s => s.id === this.subcategoriaActiva()
      );

      this.tituloPagina.set(sub?.nombre ?? 'Productos');

      return;
    }

    if (this.categoriaActiva() !== null) {

      const categoria = this.categorias.find(
        c => c.id === this.categoriaActiva()
      );

      this.tituloPagina.set(categoria?.nombre ?? 'Productos');

      return;
    }

    if (this.soloNuevos()) {
      this.tituloPagina.set('Nuestros nuevos productos');
      return;
    }

    this.tituloPagina.set('Todos los productos');
  }

  filtrarPorCategoria(id: number | null) {

    this.categoriaActiva.set(id);
    this.subcategoriaActiva.set(null);
    this.actualizarTitulo();
  }

  filtrarPorSubcategoria(id: number) {

    this.subcategoriaActiva.set(id);
    this.actualizarTitulo();
  }

  cambiarOrden(valor: 'relevancia' | 'precio-asc' | 'precio-desc') {
    this.orden.set(valor);
  }

  obtenerSubcategorias(categoriaId: number): Subcategoria[] {

    return this.subcategorias.filter(
      s => s.categoriaId === categoriaId
    );
  }

  get productosFiltrados(): Producto[] {

    let lista = [...this.todosLosProductos];

    if (this.soloNuevos()) {

      lista = lista.filter(p => p.esNuevo);

    }

    if (this.categoriaActiva() !== null) {

      const idsSubcategorias = this.subcategorias
        .filter(s => s.categoriaId === this.categoriaActiva())
        .map(s => s.id);

      lista = lista.filter(
        p => idsSubcategorias.includes(p.subcategoriaId)
      );
    }

    if (this.subcategoriaActiva() !== null) {

      lista = lista.filter(
        p => p.subcategoriaId === this.subcategoriaActiva()
      );
    }

    switch (this.orden()) {
      case 'precio-asc':
        lista.sort((a, b) => a.precio - b.precio);
        break;

      case 'precio-desc':
        lista.sort((a, b) => b.precio - a.precio);
        break;
    }

    return lista;
  }
}
