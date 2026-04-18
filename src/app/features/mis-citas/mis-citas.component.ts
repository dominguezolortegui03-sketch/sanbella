import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

export interface Cita {
  id: number;
  status: 'pending' | 'completed' | 'cancelled';
  statusLabel: string;
  servicio: string;
  categoria: string; // Nuevo
  personal: string;
  fecha: string;
  tolerancia: number; // Nuevo
  tiempo: number; // Solo detalle
  precio: number; // Solo detalle
}

@Component({
  selector: 'app-mis-citas',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './mis-citas.component.html',
  styleUrl: './mis-citas.component.css'
})
export class MisCitasComponent {
  mostrarModal = false;
  citaSeleccionada: Cita | null = null;

  citas: Cita[] = [
    {
      id: 1,
      status: 'pending',
      statusLabel: 'Pendiente',
      categoria: 'Facial',
      servicio: 'Limpieza Facial Profunda',
      personal: 'Claudia Pérez Mendoza',
      fecha: '15 de Mayo, 2026 - 10:30 AM',
      tolerancia: 10,
      tiempo: 60,
      precio: 120.00
    },
    {
      id: 2,
      status: 'completed',
      statusLabel: 'Completado',
      categoria: 'Estética',
      servicio: 'Peeling Químico',
      personal: 'Sandra Ramos Gutiérrez',
      fecha: '20 de Mayo, 2026 - 02:00 PM',
      tolerancia: 10,
      tiempo: 45,
      precio: 150.00
    }
  ];

  verDetalle(cita: Cita) {
    this.citaSeleccionada = cita;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.citaSeleccionada = null;
  }

  cancelarCita(id: number) {
    console.log('Cancelar cita:', id);
  }
}