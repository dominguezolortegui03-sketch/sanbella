
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface ReporteData {
  totalReservas: number;
  ingresosTotales: number;
  serviciosTop: { nombre: string; cantidad: number }[];
  horasPico: { hora: string; nivel: string }[];
}

@Component({
  selector: 'app-reporte-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reporte-admin.component.html',
  styleUrl: './reporte-admin.component.css'
})
export class ReporteAdminComponent {
  // Datos dinámicos (pueden venir de un servicio)
  resumen: ReporteData = {
    totalReservas: 21, // Cambia a un número > 0 para ver el cambio
    ingresosTotales: 5000,
    serviciosTop: [], // Ejemplo: { nombre: 'Manicure', cantidad: 10 }
    horasPico: []    // Ejemplo: { hora: '10:00 AM', nivel: 'Alta' }
  };
}