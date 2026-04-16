import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css'
})
export class CitasComponent {
  pasoActual = 1;
  isLogged: boolean = false;
  usuarioLogueado: any = null; // Iniciamos en null

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

constructor(private router: Router) {} // 2. Inyectar
  // 2. LA MAGIA: LEER LOS DATOS AL INICIAR
  ngOnInit(): void {
    // Buscamos el "paquete" que dejó el Login en el navegador
    const datosGuardados = localStorage.getItem('userLogueado');

    if (datosGuardados) {
      // Si existe, activamos el switch y convertimos el texto a objeto
      this.isLogged = true;
      this.usuarioLogueado = JSON.parse(datosGuardados);

      // 3. ASIGNAR A LA RESERVA (Para que no se pierdan los datos)
      this.reserva.cliente.nombre = this.usuarioLogueado.nombre;
      this.reserva.cliente.apellido = this.usuarioLogueado.apellido;
      this.reserva.cliente.telefono = this.usuarioLogueado.telefono;
      this.reserva.cliente.correo = this.usuarioLogueado.correo;
    }
  }

  irALogin() {
    // 3. Redirigir al componente de login
    this.router.navigate(['/login']);
  }

  irARegistro() {
    this.router.navigate(['/register']);
  }

  confirmarCita() {
  if (this.reserva.especialista) {
    // Aquí puedes disparar un efecto de confeti o un modal de éxito
    alert(`¡Cita confirmada! Te esperamos con ${this.reserva.especialista} el día ${this.reserva.fecha}.`);
    
    // Opcional: Limpiar la reserva y volver al inicio
    this.pasoActual = 1;
    this.router.navigate(['/inicio']);
  }
}
}