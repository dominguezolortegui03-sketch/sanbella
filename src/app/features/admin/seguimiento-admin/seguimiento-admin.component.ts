import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Cita {
  id: string;
  cliente: string;
  servicio: string;
  fechaRegistro: string;
  fechaCita: string;
  horaCita: string;
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
  
  // Controles de UI
  mostrarFiltros: boolean = false;
  mostrarModal: boolean = false;
  modoModal: 'ver' | 'reprogramar' | 'cancelar' = 'ver';

  // Objeto de filtros unificado
  filtros = {
    cliente: '',
    especialista: '',
    fecha: '',
    servicio: '',
    estado: ''
  };

  citaSeleccionada: any = {};
  motivoAccion: string = '';
  nuevaFecha: string = '';

  citas: Cita[] = [
    { id: 'sc_01', cliente: 'Ana García', servicio: 'Limpieza Facial', fechaRegistro: '15/04/2026', fechaCita: '2026-04-20', horaCita: '10:00', especialista: 'Dra. Claudia', estado: 'Pendiente' },
    { id: 'sc_02', cliente: 'Luis Paez', servicio: 'Peeling Químico', fechaRegistro: '16/04/2026', fechaCita: '2026-04-18', horaCita: '15:30', especialista: 'Dr. Marco', estado: 'Completado' }
  ];

  // Lógica de filtrado reactivo
  get citasFiltradas() {
    return this.citas.filter(c => {
      const matchCliente = c.cliente.toLowerCase().includes(this.filtros.cliente.toLowerCase());
      const matchEspecialista = c.especialista.toLowerCase().includes(this.filtros.especialista.toLowerCase());
      const matchFecha = this.filtros.fecha === '' || c.fechaCita === this.filtros.fecha;
      const matchServicio = this.filtros.servicio === '' || c.servicio === this.filtros.servicio;
      const matchEstado = this.filtros.estado === '' || c.estado === this.filtros.estado;

      return matchCliente && matchEspecialista && matchFecha && matchServicio && matchEstado;
    });
  }

  limpiarFiltros() {
    this.filtros = { cliente: '', especialista: '', fecha: '', servicio: '', estado: '' };
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
        // Lógica adicional: Enviar motivoAccion al servidor
      } else if (this.modoModal === 'reprogramar') {
        if (this.nuevaFecha) {
          const [fecha, hora] = this.nuevaFecha.split('T');
          this.citas[index].fechaCita = fecha;
          this.citas[index].horaCita = hora;
          this.citas[index].estado = 'Pendiente';
        }
      }
    }
    this.cerrarModal();
  }

  toggleEstado(cita: Cita) {
    const nuevoEstado = cita.estado === 'Inhabilitado' ? 'Pendiente' : 'Inhabilitado';
    const msg = `¿Desea cambiar el estado de la cita a ${nuevoEstado}?`;
    if (confirm(msg)) {
      cita.estado = nuevoEstado;
    }
  }
}