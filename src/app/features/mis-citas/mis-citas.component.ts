import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgClass } from '@angular/common';
// cita.model.ts
export interface Cita {
  id: number;
  status: 'pending' | 'completed' | 'cancelled'; // tipos definidos
  statusLabel: string;
  servicio: string;
  personal: string;
  fecha: string;
}


@Component({
  selector: 'app-mis-citas',
  imports: [CommonModule,NgClass],
  templateUrl: './mis-citas.component.html',
  styleUrl: './mis-citas.component.css'
})
export class MisCitasComponent {
citas: Cita[] = [
    {
      id: 1,
      status: 'pending',
      statusLabel: 'Pendiente',
      servicio: 'Limpieza Facial Profunda',
      personal: 'Dra. Claudia Pérez',
      fecha: '15 de Mayo, 2026 - 10:30 AM'
    },
    {
      id: 2,
      status: 'completed',
      statusLabel: 'Completado',
      servicio: 'Peeling Químico',
      personal: 'Dra. Sandra Ramos',
      fecha: '20 de Mayo, 2026 - 02:00 PM'
    }
  ];

  verDetalle(id: number) {
    console.log('Ver detalle de la cita:', id);
  }

  cancelarCita(id: number) {
    console.log('Cancelar cita:', id);
  }
}