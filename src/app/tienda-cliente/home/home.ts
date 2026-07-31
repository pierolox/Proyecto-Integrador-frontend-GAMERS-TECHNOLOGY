import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  CATEGORIAS,
  SUBCATEGORIAS,
  PRODUCTOS,
  Categoria,
  Subcategoria,
  Producto
} from '../data/mock-data';

interface Slide {
  titulo: string;
  subtitulo: string;
  boton: string;
  colorInicio: string;
  colorFin: string;
  icono: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  slides: Slide[] = [
    { titulo: 'Sube de nivel tu setup', subtitulo: 'Hasta 30% de descuento en periféricos gamer', boton: 'Ver ofertas', colorInicio: '#312e81', colorFin: '#4338ca', icono: '🎮' },
    { titulo: 'Nuevas tarjetas gráficas RTX', subtitulo: 'La potencia que tu PC necesita ya está aquí', boton: 'Ver tarjetas gráficas', colorInicio: '#0891b2', colorFin: '#164e63', icono: '🖥️' },
    { titulo: 'Consolas de última generación', subtitulo: 'PS5 y Xbox Series X con stock disponible', boton: 'Ver consolas', colorInicio: '#7e22ce', colorFin: '#4c1d95', icono: '🕹️' },
  ];
  slideActual = signal(0);
  private intervalId: any;

  categorias: Categoria[] = CATEGORIAS;
  subcategorias: Subcategoria[] = SUBCATEGORIAS;
  indiceCategorias = signal(0);
  categoriasVisibles = signal(4);

  productosNuevos: Producto[] = PRODUCTOS.filter((p) => p.esNuevo);
  indiceProductos = signal(0);
  productosVisibles = signal(4);

  constructor(private router: Router) { }

  obtenerCantidadProductos(categoriaId: number): number {

    const subIds = this.subcategorias
      .filter(s => s.categoriaId === categoriaId)
      .map(s => s.id);

    return PRODUCTOS.filter(p =>
      subIds.includes(p.subcategoriaId)
    ).length;

  }

  obtenerNombreSubcategoria(id: number): string {

    return this.subcategorias.find(s => s.id === id)?.nombre ?? '';

  }

  ngOnInit() {
    this.actualizarVisibles();
    window.addEventListener('resize', this.actualizarVisibles);
    this.intervalId = setInterval(() => this.siguienteSlide(), 6000);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.actualizarVisibles);
    clearInterval(this.intervalId);
  }

  private actualizarVisibles = () => {
    const w = window.innerWidth;
    const n = w < 640 ? 1 : w < 900 ? 2 : w < 1200 ? 3 : 4;
    this.categoriasVisibles.set(n);
    this.productosVisibles.set(n);
  };

  // ---- Hero carousel ----
  irASlide(i: number) {
    this.slideActual.set(i);
  }

  siguienteSlide() {
    this.slideActual.update((v) => (v + 1) % this.slides.length);
  }

  anteriorSlide() {
    this.slideActual.update((v) => (v - 1 + this.slides.length) % this.slides.length);
  }

  // ---- Carrusel de categorías ----
  siguienteCategoria() {
    const max = Math.max(0, this.categorias.length - this.categoriasVisibles());
    this.indiceCategorias.update((v) => Math.min(v + 1, max));
  }

  anteriorCategoria() {
    this.indiceCategorias.update((v) => Math.max(v - 1, 0));
  }

  verCategoria(cat: Categoria) {

    this.router.navigate(['/productos'], {
      queryParams: {
        categoria: cat.id
      }
    });
  }

  // ---- Carrusel de productos nuevos ----
  siguienteProducto() {
    const max = Math.max(0, this.productosNuevos.length - this.productosVisibles());
    this.indiceProductos.update((v) => Math.min(v + 1, max));
  }

  anteriorProducto() {
    this.indiceProductos.update((v) => Math.max(v - 1, 0));
  }

  irAProductos() {
    this.router.navigate(['/productos']);
  }

  irANuevos() {
    this.router.navigate(['/productos/nuevos']);
  }
}
