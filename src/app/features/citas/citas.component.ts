import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Servicio {
  nombre: string;
  categoria: string;
  precio: number;
}

interface Especialista {
  nombre: string;
  categoria: string;
  especialidad: string;
}

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css'
})
export class CitasComponent {
  pasoActual: number = 1;
  isLogged: boolean = false; 
  continuarComoInvitado: boolean = false;

  categorias: string[] = ['Facial', 'Capilar', 'Manicure', 'Estética'];
  
  serviciosBase: Servicio[] = [
    { nombre: 'Limpieza Profunda', categoria: 'Facial', precio: 120 },
    { nombre: 'Peeling Químico', categoria: 'Facial', precio: 150 },
    { nombre: 'Corte de Dama', categoria: 'Capilar', precio: 80 },
    { nombre: 'Esmaltado Gel', categoria: 'Manicure', precio: 60 }
  ];
  
  especialistasBase: Especialista[] = [
    { nombre: 'Dra. Claudia Pérez', categoria: 'Facial', especialidad: 'Dermatóloga' },
    { nombre: 'Sandra Ramos', categoria: 'Facial', especialidad: 'Cosmiatra' },
    { nombre: 'Milagros Luna', categoria: 'Manicure', especialidad: 'Nail Artist' },
    { nombre: 'Valeria Soler', categoria: 'Capilar', especialidad: 'Colorista' }
  ];

  serviciosFiltrados: Servicio[] = [];
  horasDisponibles: string[] = ['09:00 AM', '10:00 AM', '11:00 AM', '03:00 PM', '04:00 PM'];

  // Objeto de reserva inicializado completamente
  reserva = {
    categoria: '',
    servicio: '',
    precio: 0,
    fecha: '',
    hora: '',
    especialista: ''
  };

  // Objeto de invitado inicializado para evitar errores en ngModel
  invitado = {
    nombre: '',
    celular: ''
  };

  usuarioLogueado = { nombre: 'Jesus', apellido: 'Dominguez', telefono: '987654321' };

  filtrarServicios(): void {
    this.serviciosFiltrados = this.serviciosBase.filter(s => s.categoria === this.reserva.categoria);
    this.reserva.servicio = '';
    this.reserva.precio = 0;
  }

  seleccionarServicio(s: Servicio): void {
    this.reserva.servicio = s.nombre;
    this.reserva.precio = s.precio;
    this.pasoActual = 2;
  }

  seleccionarHora(h: string): void {
    this.reserva.hora = h;
    this.pasoActual = 3;
  }

  get especialistasDisponibles(): Especialista[] {
    return this.especialistasBase.filter(e => e.categoria === this.reserva.categoria);
  }

  seleccionarEspecialista(esp: Especialista): void {
    this.reserva.especialista = esp.nombre;
    this.pasoActual = 4;
  }

  validarInvitado(): void {
    if (this.invitado.nombre.trim() && this.invitado.celular.trim()) {
      this.pasoActual = 5;
    } else {
      alert("Por favor, completa tus datos para continuar.");
    }
  }

  get nombreCliente(): string {
    if (this.isLogged) return `${this.usuarioLogueado.nombre} ${this.usuarioLogueado.apellido}`;
    return this.invitado.nombre || 'Invitado';
  }

  confirmarCita(): void {
    console.log("Reserva Finalizada:", { ...this.reserva, cliente: this.nombreCliente });
    alert("¡Cita confirmada exitosamente en Sanbella! ✨");
  }

  pasoAnterior(): void { if (this.pasoActual > 1) this.pasoActual--; }
  
  irALogin(): void { console.log("Redirigiendo a Login..."); }
  irARegistro(): void { console.log("Redirigiendo a Registro..."); }
  fechaCalendario: Date = new Date();
  diasSemana: string[] = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];
  diasDelMes: number[] = [];
  diasPrevios: number[] = [];
  meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  get nombreMesActual() { return this.meses[this.fechaCalendario.getMonth()]; }
  get anioActual() { return this.fechaCalendario.getFullYear(); }

  ngOnInit() {
    this.generarCalendario();
  }

  generarCalendario() {
    const mes = this.fechaCalendario.getMonth();
    const anio = this.fechaCalendario.getFullYear();
    
    const primerDiaMes = new Date(anio, mes, 1).getDay(); // 0 es Domingo
    // Ajuste para que Lunes sea el primer día (index 0)
    const inicioDiferencia = primerDiaMes === 0 ? 6 : primerDiaMes - 1;
    this.diasPrevios = Array(inicioDiferencia).fill(0);

    const ultimoDiaMes = new Date(anio, mes + 1, 0).getDate();
    this.diasDelMes = Array.from({ length: ultimoDiaMes }, (_, i) => i + 1);
  }

  cambiarMes(delta: number) {
    this.fechaCalendario.setMonth(this.fechaCalendario.getMonth() + delta);
    this.fechaCalendario = new Date(this.fechaCalendario); // Forzar detección de cambios
    this.generarCalendario();
  }

  seleccionarFecha(dia: number) {
    const fechaSeleccionada = new Date(this.anioActual, this.fechaCalendario.getMonth(), dia);
    // Guardar en formato YYYY-MM-DD para compatibilidad
    this.reserva.fecha = fechaSeleccionada.toISOString().split('T')[0];
  }

  esHoy(dia: number): boolean {
    const hoy = new Date();
    return hoy.getDate() === dia && 
           hoy.getMonth() === this.fechaCalendario.getMonth() && 
           hoy.getFullYear() === this.anioActual;
  }

  esSeleccionado(dia: number): boolean {
    if (!this.reserva.fecha) return false;
    const sel = new Date(this.reserva.fecha + 'T00:00:00');
    return sel.getDate() === dia && 
           sel.getMonth() === this.fechaCalendario.getMonth() && 
           sel.getFullYear() === this.anioActual;
  }
}