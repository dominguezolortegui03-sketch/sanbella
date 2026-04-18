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
// ... imports y interface se mantienen igual

export class GestionPersonalComponent {
  filtroNombre: string = '';
  filtroDoc: string = '';
  filtroRol: string = '';
  filtroEstado: string = '';

  mostrarModal: boolean = false;
  modoModal: 'nuevo' | 'editar' | 'ver' = 'nuevo';
  nuevoUsuario: Usuario = this.initUsuario();

  usuarios: Usuario[] = [
    { id: '111', Nombre: 'Marco', Apellido: 'Arroyo', Rol: 'Estilista', TipoDocumento: 'DNI', NDocumento: '77554433', correo: 'marco@gmail.com', celular: '9999999', Estado: 'Habilitado', FechaRegistro: '10-02-2026' },
    { id: '222', Nombre: 'Jesus', Apellido: 'Dominguez', Rol: 'Recepcionista', TipoDocumento: 'DNI', NDocumento: '77554411', correo: 'jesus@gmail.com', celular: '9999988', Estado: 'Habilitado', FechaRegistro: '20-03-2026' }
  ];

  get usuariosFiltrados() {
    return this.usuarios.filter(u => {
      const full = `${u.Nombre} ${u.Apellido}`.toLowerCase();
      return full.includes(this.filtroNombre.toLowerCase()) &&
             u.NDocumento.includes(this.filtroDoc) &&
             (this.filtroRol === '' || u.Rol === this.filtroRol) &&
             (this.filtroEstado === '' || u.Estado === this.filtroEstado);
    });
  }

  // FUNCIÓN UNIFICADA PARA MODAL
  abrirModal(modo: 'nuevo' | 'editar' | 'ver', usuario?: Usuario) {
    this.modoModal = modo;
    if (modo === 'nuevo') {
      this.nuevoUsuario = this.initUsuario();
    } else if (usuario) {
      this.nuevoUsuario = { ...usuario };
    }
    this.mostrarModal = true;
  }
  guardarUsuario() {
    if (this.modoModal === 'editar') {
      const index = this.usuarios.findIndex(u => u.id === this.nuevoUsuario.id);
      if (index !== -1) this.usuarios[index] = { ...this.nuevoUsuario };
    } else {
      // Generación automática de datos sensibles
      this.nuevoUsuario.id = Math.random().toString(36).substr(2, 9);
      this.nuevoUsuario.Estado = 'Habilitado';
      this.nuevoUsuario.FechaRegistro = new Date().toLocaleDateString();
      this.usuarios.push({ ...this.nuevoUsuario });
    }
    this.cerrarModal();
  }

  toggleEstado(usuario: Usuario) {
    const confirmacion = confirm(`¿Cambiar estado de ${usuario.Nombre} a ${usuario.Estado === 'Habilitado' ? 'Inhabilitado' : 'Habilitado'}?`);
    if (confirmacion) {
      usuario.Estado = usuario.Estado === 'Habilitado' ? 'Inhabilitado' : 'Habilitado';
    }
  }

  restablecerPassword(usuario: Usuario) {
    alert(`Se ha enviado un enlace de recuperación a: ${usuario.correo}`);
  }

  private initUsuario(): Usuario {
    return { id: '', Nombre: '', Apellido: '', Rol: 'Estilista', TipoDocumento: 'DNI', NDocumento: '', correo: '', celular: '', Estado: 'Habilitado', FechaRegistro: '' };
  }
  cerrarModal() {
  this.mostrarModal = false;
}
}
