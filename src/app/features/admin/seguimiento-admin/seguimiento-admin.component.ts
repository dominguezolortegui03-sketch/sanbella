import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Cita {
  cliente: string;
  servicio: string;
  fecha: string;
  especialista: string;
  estado: 'Pendiente' | 'Completado' | 'Cancelado';
}

@Component({
  selector: 'app-seguimiento-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seguimiento-admin.component.html',
  styleUrl: './seguimiento-admin.component.css'
})
export class SeguimientoAdminComponent implements OnInit {
  
  // Datos originales (Backend)
  citasOriginales: Cita[] = [
    { cliente: 'Ana García', servicio: 'Limpieza Facial', fecha: '17/04/2026 10:00', especialista: 'Dra. Claudia', estado: 'Pendiente' },
    { cliente: 'Luis Paez', servicio: 'Peeling Químico', fecha: '18/04/2026 15:30', especialista: 'Dr. Marco', estado: 'Completado' },
    { cliente: 'Carla Ruiz', servicio: 'Masaje Hidratante', fecha: '20/04/2026 11:00', especialista: 'Dra. Claudia', estado: 'Cancelado' }
  ];

  citasFiltradas: Cita[] = [];
  filtroEstado: string = 'Todos';

  ngOnInit() {
    this.citasFiltradas = [...this.citasOriginales];
  }

  aplicarFiltro() {
    if (this.filtroEstado === 'Todos') {
      this.citasFiltradas = [...this.citasOriginales];
    } else {
      this.citasFiltradas = this.citasOriginales.filter(cita => cita.estado === this.filtroEstado);
    }
  }
}