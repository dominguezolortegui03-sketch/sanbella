import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Usuario {
  id: string;
  Nombre: string;
  Apellido: string;
  Rol: 'Estilista' | 'Recepcionista';
  TipoDocumento: string;
  NDocumento: string;
  correo: string;
  celular: string;
  Estado: 'Habilitado' | 'Inhabilitado';
  FechaRegistro: string;
}

@Component({
  selector: 'app-gestion-personal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-personal.component.html',
  styleUrl: './gestion-personal.component.css'
})
export class GestionPersonalComponent {
  // Controles UI
  mostrarFiltros: boolean = false;
  mostrarModal: boolean = false;
  modoModal: 'nuevo' | 'editar' | 'ver' = 'nuevo';

  // Filtros
  filtros = {
    nombre: '',
    doc: '',
    rol: '',
    estado: ''
  };

  usuarios: Usuario[] = [
    { id: '111', Nombre: 'Marco', Apellido: 'Arroyo', Rol: 'Estilista', TipoDocumento: 'DNI', NDocumento: '77554433', correo: 'marco@gmail.com', celular: '9999999', Estado: 'Habilitado', FechaRegistro: '10-02-2026' },
    { id: '222', Nombre: 'Jesus', Apellido: 'Dominguez', Rol: 'Recepcionista', TipoDocumento: 'DNI', NDocumento: '77554411', correo: 'jesus@gmail.com', celular: '9999988', Estado: 'Habilitado', FechaRegistro: '20-03-2026' }
  ];

  nuevoUsuario: Usuario = this.initUsuario();

  // Filtrado Lógico
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

  // Gestión de Modales
  abrirModal(modo: 'nuevo' | 'editar' | 'ver', usuario?: Usuario) {
    this.modoModal = modo;
    this.nuevoUsuario = modo === 'nuevo' ? this.initUsuario() : { ...usuario! };
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  guardarUsuario() {
    if (this.modoModal === 'editar') {
      const index = this.usuarios.findIndex(u => u.id === this.nuevoUsuario.id);
      if (index !== -1) this.usuarios[index] = { ...this.nuevoUsuario };
    } else {
      this.nuevoUsuario.id = Math.random().toString(36).substr(2, 9);
      this.nuevoUsuario.Estado = 'Habilitado';
      this.nuevoUsuario.FechaRegistro = new Date().toLocaleDateString();
      this.usuarios.push({ ...this.nuevoUsuario });
    }
    this.cerrarModal();
  }

  // Acciones de Usuario
  toggleEstado(usuario: Usuario) {
    const nuevoEstado = usuario.Estado === 'Habilitado' ? 'Inhabilitado' : 'Habilitado';
    if (confirm(`¿Desea cambiar el estado de ${usuario.Nombre} a ${nuevoEstado}?`)) {
      usuario.Estado = nuevoEstado;
    }
  }

  restablecerPassword(usuario: Usuario) {
    alert(`Enlace de recuperación enviado al correo: ${usuario.correo}`);
  }

  private initUsuario(): Usuario {
    return { id: '', Nombre: '', Apellido: '', Rol: 'Estilista', TipoDocumento: 'DNI', NDocumento: '', correo: '', celular: '', Estado: 'Habilitado', FechaRegistro: '' };
  }
}