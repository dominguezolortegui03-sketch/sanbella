import { Component } from '@angular/core';
import { SidebarComponent } from '../../../shell/sidebar/sidebar.component';
import { NavbarComponent } from '../../../shell/navbar/navbar.component';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Usuario {
  id: string;
  username: string;
  rol: 'Cliente' | 'Admin' | 'Recepcionista';
  email: string;
  telefono: string;
}

@Component({
  selector: 'app-seguridad-admin',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, NgClass, CommonModule, FormsModule],
  templateUrl: './seguridad-admin.component.html',
  styleUrl: './seguridad-admin.component.css'
})
export class SeguridadAdminComponent {
  mostrarModal: boolean = false;
  esEdicion: boolean = false; // Nueva bandera para controlar el modo

  nuevoUsuario: Usuario = {
    id: '',
    username: '',
    rol: 'Cliente',
    email: '',
    telefono: ''
  };

  usuarios: Usuario[] = [
    { id: '17757700', username: 'admin', rol: 'Cliente', email: 'admin@gmail.com', telefono: '9999999' },
    { id: '28848811', username: 'claudia_p', rol: 'Cliente', email: 'claudia@gmail.com', telefono: '9888888' }
  ];

  abrirModal() {
    this.esEdicion = false;
    this.resetForm();
    this.mostrarModal = true;
  }

  // Se activa al presionar el lápiz
  editarUsuario(usuario: Usuario) {
    this.esEdicion = true;
    // Usamos spread operator {...} para no modificar la tabla en tiempo real hasta guardar
    this.nuevoUsuario = { ...usuario }; 
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.resetForm();
  }

  registrarUsuario() {
    if (this.esEdicion) {
      // MODO EDICIÓN: Buscar por ID y actualizar
      const index = this.usuarios.findIndex(u => u.id === this.nuevoUsuario.id);
      if (index !== -1) {
        this.usuarios[index] = { ...this.nuevoUsuario };
      }
    } else {
      // MODO CREACIÓN: Generar ID y añadir
      this.nuevoUsuario.id = Math.floor(Math.random() * 100000000).toString();
      this.usuarios.push({ ...this.nuevoUsuario });
    }
    
    this.cerrarModal();
  }

  eliminarUsuario(id: string) { 
    this.usuarios = this.usuarios.filter(u => u.id !== id);
  }

  private resetForm() {
    this.nuevoUsuario = { id: '', username: '', rol: 'Cliente', email: '', telefono: '' };
  }
}