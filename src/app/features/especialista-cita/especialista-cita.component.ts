import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EspecialistaCita } from '../../data/interfaces/especialista-cita.interface';
import { EspecialistaCitaService } from '../../data/services/especialista-cita.service';

@Component({
  selector: 'app-especialista-citas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './especialista-cita.component.html',
  styleUrl: './especialista-cita.component.css'
})
export class EspecialistaCitasComponent implements OnInit {
  private citaService = inject(EspecialistaCitaService);

  citas: EspecialistaCita[] = [];
  citaSeleccionada: EspecialistaCita | null = null;
  imagenesEvidencia: string[] = [];
  
  mostrarFiltros = false;
  mostrarDetalles = false;
  mostrarEvidencia = false;
  filtros = { estado: '', servicio: '', cliente: '', fecha: '' };

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.citaService.getCitas().subscribe({
      next: (data) => this.citas = data,
      error: (e) => console.error('Error Sanbella API:', e)
    });
  }

  /**
   * FLUJO DE AVANCE DE ESTADOS
   * Centraliza 'Iniciar' y 'Finalizar' en una sola lógica de persistencia
   */
  avanzarEstado(cita: EspecialistaCita): void {
    const ahora = new Date().toLocaleString('es-PE', { hour12: true });
    let cambios: Partial<EspecialistaCita> = {};

    if (cita.estado === 'Pendiente') {
      cambios = {
        estado: 'En Proceso',
        statusLabel: 'En Proceso',
        fechaInicio: ahora
      };
    } else if (cita.estado === 'En Proceso') {
      cambios = {
        estado: 'Finalizado',
        statusLabel: 'Finalizado',
        fechaFin: ahora
      };
    }

    if (Object.keys(cambios).length > 0) {
      this.citaService.actualizarCita(cita.id, cambios).subscribe({
        next: () => this.cargarDatos(), // Recarga desde el servidor para actualizar la vista
        error: (err) => console.error('Error al actualizar estado:', err)
      });
    }
  }

  get citasFiltradas() {
    return this.citas.filter(c => {
      return (!this.filtros.estado || c.estado === this.filtros.estado) &&
             (!this.filtros.servicio || c.servicio.toLowerCase().includes(this.filtros.servicio.toLowerCase())) &&
             (!this.filtros.cliente || c.cliente.toLowerCase().includes(this.filtros.cliente.toLowerCase())) &&
             (!this.filtros.fecha || c.fecha === this.filtros.fecha);
    });
  }

  // --- LÓGICA DE EVIDENCIAS ---
  abrirEvidencia(cita: EspecialistaCita) {
    this.citaSeleccionada = cita;
    this.imagenesEvidencia = cita.evidencias || [];
    this.mostrarEvidencia = true;
  }

  guardarEvidencia(): void {
    if (this.citaSeleccionada) {
      this.citaService.actualizarCita(this.citaSeleccionada.id, { 
        evidencias: this.imagenesEvidencia 
      }).subscribe(() => {
        this.mostrarEvidencia = false;
        this.cargarDatos();
      });
    }
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

  // --- UI HELPERS ---
  verDetalles(cita: EspecialistaCita) { this.citaSeleccionada = cita; this.mostrarDetalles = true; }
  limpiarFiltros() { this.filtros = { estado: '', servicio: '', cliente: '', fecha: '' }; }
}