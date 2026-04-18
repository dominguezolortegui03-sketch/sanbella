import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Cliente {
  id: string;
  Nombre: string;
  Apellido: string;
  TipoDocumento: string;
  NDocumento: string;
  correo: string;
  celular: string;
  Estado: 'Habilitado' | 'Inhabilitado';
}

@Component({
  selector: 'app-gestion-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-clientes.component.html',
  styleUrl: './gestion-clientes.component.css'
})
export class GestionClientesComponent {
  
  // Variables de Control
  mostrarFiltros: boolean = false;
  mostrarModal: boolean = false;
  modoModal: 'nuevo' | 'editar' | 'ver' = 'nuevo';

  // Filtros agrupados
  filtros = { nombre: '', doc: '', estado: '' };
  
  clientes: Cliente[] = [
    { id: 'cli_1', Nombre: 'Juan', Apellido: 'Perez', TipoDocumento: 'DNI', NDocumento: '12345678', correo: 'juan@mail.com', celular: '987654321', Estado: 'Habilitado' }
  ];

  nuevoCliente: Cliente = this.initCliente();

  // Getter para filtrado reactivo
  get clientesFiltrados() {
    return this.clientes.filter(c => {
      const nombreCompleto = `${c.Nombre} ${c.Apellido}`.toLowerCase();
      return nombreCompleto.includes(this.filtros.nombre.toLowerCase()) &&
             c.NDocumento.includes(this.filtros.doc) &&
             (this.filtros.estado === '' || c.Estado === this.filtros.estado);
    });
  }

  limpiarFiltros() {
    this.filtros = { nombre: '', doc: '', estado: '' };
  }

  // Lógica de Modales
  abrirModal(modo: 'nuevo' | 'editar' | 'ver', cliente?: Cliente) {
    this.modoModal = modo;
    this.nuevoCliente = modo === 'nuevo' ? this.initCliente() : { ...cliente! };
    this.mostrarModal = true;
  }

  cerrarModal() { 
    this.mostrarModal = false; 
  }

  guardarCliente() {
    if (this.modoModal === 'editar') {
      const index = this.clientes.findIndex(c => c.id === this.nuevoCliente.id);
      if (index !== -1) this.clientes[index] = { ...this.nuevoCliente };
    } else {
      this.nuevoCliente.id = 'cli_' + Math.random().toString(36).substr(2, 9);
      this.nuevoCliente.Estado = 'Habilitado';
      this.clientes.push({ ...this.nuevoCliente });
    }
    this.cerrarModal();
  }

  // Funciones de Acción
  toggleEstado(cliente: Cliente) {
    const confirmacion = confirm(`¿Desea ${cliente.Estado === 'Habilitado' ? 'Inhabilitar' : 'Habilitar'} a este cliente?`);
    if (confirmacion) {
      cliente.Estado = cliente.Estado === 'Habilitado' ? 'Inhabilitado' : 'Habilitado';
    }
  }

  restablecerPassword(cliente: Cliente) {
    alert(`Enlace de restablecimiento enviado a: ${cliente.correo}`);
  }

  private initCliente(): Cliente {
    return { id: '', Nombre: '', Apellido: '', TipoDocumento: 'DNI', NDocumento: '', correo: '', celular: '', Estado: 'Habilitado' };
  }
}