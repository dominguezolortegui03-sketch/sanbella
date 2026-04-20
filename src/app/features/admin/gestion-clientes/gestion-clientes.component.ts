import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GestionCliente } from '../../../data/interfaces/gestion-clientes.interface';
import { GestionClienteService } from '../../../data/services/gestion-cliente.service';

@Component({
  selector: 'app-gestion-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-clientes.component.html',
  styleUrl: './gestion-clientes.component.css'
})
export class GestionClientesComponent implements OnInit {
  private clienteService = inject(GestionClienteService);

  // Variables de Control
  mostrarFiltros: boolean = false;
  mostrarModal: boolean = false;
  modoModal: 'nuevo' | 'editar' | 'ver' = 'nuevo';

  filtros = { nombre: '', doc: '', estado: '' };
  clientes: GestionCliente[] = []; // Inicia vacío
  nuevoCliente: GestionCliente = this.initCliente();

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes() {
    this.clienteService.getClientes().subscribe({
      next: (data) => this.clientes = data,
      error: (err) => console.error('Error al cargar clientes', err)
    });
  }

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

  abrirModal(modo: 'nuevo' | 'editar' | 'ver', cliente?: GestionCliente) {
    this.modoModal = modo;
    this.nuevoCliente = modo === 'nuevo' ? this.initCliente() : { ...cliente! };
    this.mostrarModal = true;
  }

  cerrarModal() { 
    this.mostrarModal = false; 
  }

  guardarCliente() {
    if (this.modoModal === 'editar') {
      this.clienteService.actualizarCliente(this.nuevoCliente.id, this.nuevoCliente).subscribe({
        next: (clienteActualizado) => {
          const index = this.clientes.findIndex(c => c.id === clienteActualizado.id);
          if (index !== -1) this.clientes[index] = { ...clienteActualizado };
          this.cerrarModal();
        }
      });
    } else {
      // JSON Server o el Back suelen asignar el ID, pero mantenemos tu lógica por si acaso
      this.clienteService.crearCliente(this.nuevoCliente).subscribe({
        next: (clienteCreado) => {
          this.clientes.push(clienteCreado);
          this.cerrarModal();
        }
      });
    }
  }

  toggleEstado(cliente: GestionCliente) {
    const nuevoEstado = cliente.Estado === 'Habilitado' ? 'Inhabilitado' : 'Habilitado';
    const confirmacion = confirm(`¿Desea ${nuevoEstado === 'Habilitado' ? 'Habilitar' : 'Inhabilitar'} a este cliente?`);
    
    if (confirmacion) {
      this.clienteService.cambiarEstado(cliente.id, nuevoEstado).subscribe({
        next: (res) => cliente.Estado = res.Estado,
        error: (err) => console.error('Error al cambiar estado', err)
      });
    }
  }

  restablecerPassword(cliente: GestionCliente) {
    alert(`Enlace de restablecimiento enviado a: ${cliente.correo}`);
  }

  private initCliente(): GestionCliente {
    return { id: '', Nombre: '', Apellido: '', TipoDocumento: 'DNI', NDocumento: '', correo: '', celular: '', Estado: 'Habilitado' };
  }
}