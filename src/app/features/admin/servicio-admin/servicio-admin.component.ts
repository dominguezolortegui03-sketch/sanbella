import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Servicio {
  id: number;
  nombre: string;
  categoria: string;
  tiempo: string;
  precio: string;
  estado: 'Habilitado' | 'Inhabilitado';
}

@Component({
  selector: 'app-servicio-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './servicio-admin.component.html',
  styleUrl: './servicio-admin.component.css'
})
export class ServicioAdminComponent {
  filtroNombre = '';
  filtroCategoria = '';
  filtroEstado = '';

  categoriasDisponibles = ['Uñas', 'Pestañas', 'Cabello', 'Rostro', 'Corporal'];
  
  servicios: Servicio[] = [
    { id: 1, nombre: 'Manicure Spa', categoria: 'Uñas', tiempo: '60 min', precio: 'S/ 45.00', estado: 'Habilitado' },
    { id: 2, nombre: 'Corte Varón', categoria: 'Cabello', tiempo: '30 min', precio: 'S/ 30.00', estado: 'Habilitado' }
  ];

  mostrarModal = false;
  modoModal: 'nuevo' | 'editar' | 'ver' = 'nuevo';
  formServicio = this.limpiarForm();

  get serviciosFiltrados() {
    return this.servicios.filter(s => {
      return s.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase()) &&
             (this.filtroCategoria === '' || s.categoria === this.filtroCategoria) &&
             (this.filtroEstado === '' || s.estado === this.filtroEstado);
    });
  }

  abrirModal(modo: 'nuevo' | 'editar' | 'ver', servicio?: Servicio) {
    this.modoModal = modo;
    this.formServicio = modo === 'nuevo' ? this.limpiarForm() : { ...servicio! };
    this.mostrarModal = true;
  }

  cerrarModal() { this.mostrarModal = false; }

  guardarServicio() {
    if (this.modoModal === 'editar') {
      const index = this.servicios.findIndex(s => s.id === this.formServicio.id);
      this.servicios[index] = { ...this.formServicio };
    } else {
      this.formServicio.id = Date.now();
      this.servicios.push({ ...this.formServicio });
    }
    this.cerrarModal();
  }

  toggleEstado(servicio: Servicio) {
    servicio.estado = servicio.estado === 'Habilitado' ? 'Inhabilitado' : 'Habilitado';
  }

  abrirModalCategoria() {
    const nueva = prompt('Nombre de la nueva categoría:');
    if (nueva) this.categoriasDisponibles.push(nueva);
  }

  private limpiarForm(): Servicio {
    return { id: 0, nombre: '', categoria: 'Uñas', tiempo: '', precio: 'S/ ', estado: 'Habilitado' };
  }
}