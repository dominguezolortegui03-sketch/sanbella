import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GestionPersonal } from '../../../data/interfaces/gestion-personal.interface';
import { GestionPersonalService } from '../../../data/services/gestion-personal.service';
@Component({
  selector: 'app-gestion-personal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-personal.component.html',
  styleUrl: './gestion-personal.component.css'
})
export class GestionPersonalComponent implements OnInit {
  private usuarioService = inject(GestionPersonalService);

  mostrarFiltros: boolean = false;
  mostrarModal: boolean = false;
  modoModal: 'nuevo' | 'editar' | 'ver' = 'nuevo';

  filtros = { nombre: '', doc: '', rol: '', estado: '' };
  usuarios: GestionPersonal[] = [];
  nuevoUsuario: GestionPersonal = this.initUsuario();

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => this.usuarios = data,
      error: (err) => console.error('Error al cargar personal', err)
    });
  }

  get usuariosFiltrados() {
    return this.usuarios.filter(u => {
      const full = `${u.Nombre} ${u.Apellido}`.toLowerCase();
      return full.includes(this.filtros.nombre.toLowerCase()) &&
             u.NDocumento.includes(this.filtros.doc) &&
             (this.filtros.rol === '' || u.Rol === this.filtros.rol) &&
             (this.filtros.estado === '' || u.Estado === this.filtros.estado);
    });
  }

  limpiarFiltros() {
    this.filtros = { nombre: '', doc: '', rol: '', estado: '' };
  }

  abrirModal(modo: 'nuevo' | 'editar' | 'ver', usuario?: GestionPersonal) {
    this.modoModal = modo;
    this.nuevoUsuario = modo === 'nuevo' ? this.initUsuario() : { ...usuario! };
    this.mostrarModal = true;
  }

  cerrarModal() { this.mostrarModal = false; }

  guardarUsuario() {
    if (this.modoModal === 'editar') {
      this.usuarioService.actualizarUsuario(this.nuevoUsuario.id, this.nuevoUsuario).subscribe({
        next: (u) => {
          const index = this.usuarios.findIndex(user => user.id === u.id);
          if (index !== -1) this.usuarios[index] = u;
          this.cerrarModal();
        }
      });
    } else {
      // Configuramos datos iniciales antes de enviar al back
      this.nuevoUsuario.Estado = 'Habilitado';
      this.nuevoUsuario.FechaRegistro = new Date().toLocaleDateString('es-PE');
      
      this.usuarioService.crearUsuario(this.nuevoUsuario).subscribe({
        next: (u) => {
          this.usuarios.push(u);
          this.cerrarModal();
        }
      });
    }
  }

  toggleEstado(usuario: GestionPersonal) {
    const nuevoEstado = usuario.Estado === 'Habilitado' ? 'Inhabilitado' : 'Habilitado';
    if (confirm(`¿Desea cambiar el estado de ${usuario.Nombre} a ${nuevoEstado}?`)) {
      this.usuarioService.cambiarEstado(usuario.id, nuevoEstado).subscribe({
        next: (res) => usuario.Estado = res.Estado
      });
    }
  }

  restablecerPassword(usuario: GestionPersonal) {
    alert(`Enlace de recuperación enviado al correo: ${usuario.correo}`);
  }

  private initUsuario(): GestionPersonal {
    return { id: '', Nombre: '', Apellido: '', Rol: 'Estilista', TipoDocumento: 'DNI', NDocumento: '', correo: '', celular: '', Estado: 'Habilitado', FechaRegistro: '' };
  }
}