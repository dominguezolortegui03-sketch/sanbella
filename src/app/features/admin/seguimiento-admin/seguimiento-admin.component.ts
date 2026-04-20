import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeguimientoAdmin } from '../../../data/interfaces/seguimiento-admin.interface';
import { SeguimientoAdminService } from '../../../data/services/seguimiento-admin.service';

@Component({
  selector: 'app-seguimiento-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seguimiento-admin.component.html',
  styleUrl: './seguimiento-admin.component.css'
})
export class SeguimientoAdminComponent implements OnInit {
  private citaService = inject(SeguimientoAdminService);

  mostrarFiltros = false;
  mostrarModal = false;
  modoModal: 'ver' | 'reprogramar' | 'cancelar' = 'ver';

  filtros = { cliente: '', especialista: '', fecha: '', servicio: '', estado: '' };
  citas: SeguimientoAdmin[] = [];
  
  citaSeleccionada: any = {};
  motivoAccion: string = '';
  nuevaFecha: string = '';

  ngOnInit() {
    this.cargarCitas();
  }

  cargarCitas() {
    this.citaService.getCitas().subscribe({
      next: (data) => this.citas = data,
      error: (err) => console.error('Error al cargar citas', err)
    });
  }

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

  abrirModal(modo: 'ver' | 'reprogramar' | 'cancelar', cita: SeguimientoAdmin) {
    this.modoModal = modo;
    this.citaSeleccionada = { ...cita };
    this.motivoAccion = '';
    this.nuevaFecha = '';
    this.mostrarModal = true;
  }

  cerrarModal() { this.mostrarModal = false; }

  procesarAccion() {
    let cambios: Partial<SeguimientoAdmin> = {};

    if (this.modoModal === 'cancelar') {
      cambios = { estado: 'Cancelado' };
    } else if (this.modoModal === 'reprogramar' && this.nuevaFecha) {
      const [fecha, hora] = this.nuevaFecha.split('T');
      cambios = { 
        fechaCita: fecha, 
        horaCita: hora, 
        estado: 'Pendiente' 
      };
    }

    if (Object.keys(cambios).length > 0) {
      this.citaService.actualizarCita(this.citaSeleccionada.id, cambios).subscribe({
        next: (citaActualizada) => {
          const index = this.citas.findIndex(c => c.id === citaActualizada.id);
          if (index !== -1) this.citas[index] = citaActualizada;
          this.cerrarModal();
        }
      });
    }
  }

  toggleEstado(cita: SeguimientoAdmin) {
    const nuevoEstado = cita.estado === 'Inhabilitado' ? 'Pendiente' : 'Inhabilitado';
    if (confirm(`¿Desea cambiar el estado de la cita a ${nuevoEstado}?`)) {
      this.citaService.actualizarCita(cita.id, { estado: nuevoEstado }).subscribe({
        next: (res) => cita.estado = res.estado
      });
    }
  }
}