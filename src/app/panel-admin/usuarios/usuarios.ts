import { Component, OnInit, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../tienda-cliente/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios implements OnInit {
  constructor(private usuarioService: UsuarioService) {
    this.usuarios = this.usuarioService.usuariosSignal();
    this.cargando = this.usuarioService.cargandoSignal();
    this.error = this.usuarioService.errorSignal();
  }

  usuarios!: ReturnType<UsuarioService['usuariosSignal']>;
  cargando!: ReturnType<UsuarioService['cargandoSignal']>;
  error!: ReturnType<UsuarioService['errorSignal']>;

  busqueda = signal('');

  usuariosFiltrados = computed(() => {
    const texto = this.busqueda().toLowerCase().trim();
    if (!texto) return this.usuarios();

    return this.usuarios().filter(
      (u) =>
        u.usuario.toLowerCase().includes(texto) ||
        u.correo.toLowerCase().includes(texto),
    );
  });

  ngOnInit() {
    this.usuarioService.cargarTodos();
  }

  eliminar(id: number, nombreUsuario: string) {
    if (!confirm(`¿Eliminar al usuario "${nombreUsuario}"? Esta acción no se puede deshacer.`)) {
      return;
    }
    this.usuarioService.eliminar(id);
  }

  formatearFecha(fechaIso: string): string {
    return new Date(fechaIso).toLocaleDateString('es-PE');
  }
}
