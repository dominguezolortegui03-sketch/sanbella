import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reserva',
   imports: [CommonModule, FormsModule],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css'
})
export class ReservaComponent {
 pasoActual = 1;
  isLoggedIn = false; // Esto vendría de tu AuthService después

  reserva = {
    servicio: '',
    especialista: '',
    fecha: '',
    hora: '',
    cliente: { nombre: '', apellido: '', telefono: '', correo: '' },
    notas: ''
  };

  servicios = ['Cabello', 'Maquillaje', 'Pestañas', 'Cejas', 'Manicure', 'Pedicure'];
  horasDisponibles = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];

  siguientePaso() { if (this.pasoActual < 4) this.pasoActual++; }
  pasoAnterior() { if (this.pasoActual > 1) this.pasoActual--; }

  seleccionarServicio(s: string) {
    this.reserva.servicio = s;
    this.siguientePaso();
  }

  // Diccionario de especialistas por servicio
especialistasPorServicio: any = {
  'CABELLO': ['Lucía Méndez', 'Roberto Paz'],
  'MAQUILLAJE': ['Ana García', 'Elena Torres'],
  'PESTAÑAS': ['Carla Ruiz', 'Sofía Luna'],
  'CEJAS': ['Carla Ruiz', 'Diana Sol'],
  'MANICURE': ['Marta Flores', 'Rosa Pérez'],
  'PEDICURE': ['Marta Flores', 'Beatriz Sanz']
};

// Función para obtener la lista según el servicio actual
getEstilistasDisponibles() {
  return this.especialistasPorServicio[this.reserva.servicio.toUpperCase()] || [];
}
}
