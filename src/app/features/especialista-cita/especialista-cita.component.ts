import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Cita {
  id: number;
  cliente: string;
  servicio: string;
  fecha: string;
  hora: string;
  estado: 'Pendiente' | 'En Proceso' | 'Finalizado';
  fechaInicio?: string;
  fechaFin?: string;
}

@Component({
  selector: 'app-especialista-citas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './especialista-cita.component.html',
  styleUrl: './especialista-cita.component.css'
})
export class EspecialistaCitasComponent {
  filtros = { estado: '', servicio: '', cliente: '', fecha: '' };
  
  citas: Cita[] = [
    { id: 1, cliente: 'Maria Delgado', servicio: 'Manicure Spa', fecha: '2026-04-18', hora: '10:00 AM', estado: 'Pendiente' },
    { id: 2, cliente: 'Juan Perez', servicio: 'Corte Varón', fecha: '2026-04-18', hora: '11:30 AM', estado: 'En Proceso', fechaInicio: '18/04/2026 11:35 AM' }
  ];

  citaSeleccionada: Cita | null = null;
  mostrarDetalles = false;
  mostrarEvidencia = false;
  imagenesEvidencia: string[] = [];

  get citasFiltradas() {
    return this.citas.filter(c => {
      return (!this.filtros.estado || c.estado === this.filtros.estado) &&
             (!this.filtros.servicio || c.servicio.toLowerCase().includes(this.filtros.servicio.toLowerCase())) &&
             (!this.filtros.cliente || c.cliente.toLowerCase().includes(this.filtros.cliente.toLowerCase())) &&
             (!this.filtros.fecha || c.fecha === this.filtros.fecha);
    });
  }

  verDetalles(cita: Cita) {
    this.citaSeleccionada = cita;
    this.mostrarDetalles = true;
  }

  iniciarServicio(cita: Cita) {
    cita.estado = 'En Proceso';
    cita.fechaInicio = new Date().toLocaleString();
  }

  finalizarServicio(cita: Cita) {
    cita.estado = 'Finalizado';
    cita.fechaFin = new Date().toLocaleString();
  }

  abrirEvidencia(cita: Cita) {
    this.citaSeleccionada = cita;
    this.imagenesEvidencia = [];
    this.mostrarEvidencia = true;
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
      for (let file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => this.imagenesEvidencia.push(e.target.result);
        reader.readAsDataURL(file);
      }
    }
  }

  guardarEvidencia() {
    alert('Evidencias guardadas para ' + this.citaSeleccionada?.cliente);
    this.mostrarEvidencia = false;
  }
}