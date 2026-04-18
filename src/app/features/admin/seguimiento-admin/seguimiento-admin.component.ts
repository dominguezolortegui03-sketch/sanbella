import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Cita {
  id: string; // ID interno invisible
  cliente: string;
  servicio: string;
  fechaRegistro: string; // Emisión
  fechaCita: string;    // Fecha de la cita
  horaCita: string;     // Hora de la cita
  especialista: string;
  estado: 'Pendiente' | 'Completado' | 'Cancelado' | 'Inhabilitado';
}

@Component({
  selector: 'app-seguimiento-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seguimiento-admin.component.html',
  styleUrl: './seguimiento-admin.component.css'
})
export class SeguimientoAdminComponent {
  // Filtros
  filtroEstado: string = '';
  filtroServicio: string = '';
  filtroCliente: string = '';
  filtroEspecialista: string = '';
  filtroFecha: string = '';

  // Control de Modal
  mostrarModal: boolean = false;
  modoModal: 'ver' | 'reprogramar' | 'cancelar' = 'ver';
  citaSeleccionada: any = {};
  
  // Datos para acciones
  motivoAccion: string = '';
  nuevaFecha: string = '';

  citas: Cita[] = [
    { id: 'sc_01', cliente: 'Ana García', servicio: 'Limpieza Facial', fechaRegistro: '15/04/2026', fechaCita: '2026-04-20', horaCita: '10:00', especialista: 'Dra. Claudia', estado: 'Pendiente' },
    { id: 'sc_02', cliente: 'Luis Paez', servicio: 'Peeling Químico', fechaRegistro: '16/04/2026', fechaCita: '2026-04-18', horaCita: '15:30', especialista: 'Dr. Marco', estado: 'Completado' }
  ];

  get citasFiltradas() {
    return this.citas.filter(c => {
      return c.cliente.toLowerCase().includes(this.filtroCliente.toLowerCase()) &&
             c.especialista.toLowerCase().includes(this.filtroEspecialista.toLowerCase()) &&
             (this.filtroFecha === '' || c.fechaCita === this.filtroFecha) &&
             (this.filtroServicio === '' || c.servicio === this.filtroServicio) &&
             (this.filtroEstado === '' || c.estado === this.filtroEstado);
    });
  }

  abrirModal(modo: 'ver' | 'reprogramar' | 'cancelar', cita: Cita) {
    this.modoModal = modo;
    this.citaSeleccionada = { ...cita };
    this.motivoAccion = '';
    this.nuevaFecha = '';
    this.mostrarModal = true;
  }

  cerrarModal() { this.mostrarModal = false; }

  procesarAccion() {
    const index = this.citas.findIndex(c => c.id === this.citaSeleccionada.id);
    if (index !== -1) {
      if (this.modoModal === 'cancelar') {
        this.citas[index].estado = 'Cancelado';
      } else if (this.modoModal === 'reprogramar') {
        const [fecha, hora] = this.nuevaFecha.split('T');
        this.citas[index].fechaCita = fecha;
        this.citas[index].horaCita = hora;
        this.citas[index].estado = 'Pendiente';
      }
      // Aquí se enviaría el 'this.motivoAccion' al servidor
    }
    this.cerrarModal();
  }

  toggleEstado(cita: Cita) {
    cita.estado = cita.estado === 'Inhabilitado' ? 'Pendiente' : 'Inhabilitado';
  }
}