import { Component } from '@angular/core';

interface dashboard {
  id: number;
  serviceName: string;
  serviceImage: string;
  specialistName: string;
  specialistRole: string;
  date: string;
  time: string;
  price: string;
  status: 'Pendiente' | 'Completada' | 'Cancelada';
}

@Component({
  selector: 'app-cita',
  imports: [],
  templateUrl: './cita.component.html',
  styleUrl: './cita.component.css'
})
export class CitaComponent {
// Datos de ejemplo basados en tu flujo anterior
  userAppointments: dashboard[] = [
    {
      id: 1,
      serviceName: 'Masaje Detox Linfático',
      serviceImage: 'https://eciplast.com.co/wp-content/uploads/2024/06/Moldeo-Corporal.jpg',
      specialistName: 'Dra. Elena Valois',
      specialistRole: 'Terapeuta Senior Holística',
      date: '10 de Diciembre, 2024',
      time: '01:00 PM',
      price: '$120.00',
      status: 'Pendiente'
    }
  ];

  cancelarCita(id: number) {
    console.log('Cancelando cita:', id);
    // Aquí iría tu lógica de servicio
  }
}
