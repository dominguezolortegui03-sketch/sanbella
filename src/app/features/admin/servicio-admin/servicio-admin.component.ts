import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Servicio {
  id?: number;
  nombre: string;
  categoria: string;
  duracion: string;
  precio: string;
}

@Component({
  selector: 'app-servicio-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './servicio-admin.component.html',
  styleUrl: './servicio-admin.component.css'
})
export class ServicioAdminComponent implements OnInit {
  // Lista de categorías estandarizadas para Sanbella
  categoriasDisponibles: string[] = [
    'Uñas',
    'Pestañas',
    'Cabello',
    'Rostro',
    'Masajes',
    'Corporal'
  ];

  servicios: Servicio[] = [
    { id: 1, nombre: 'Manicure Spa', categoria: 'Uñas', duracion: '60 min', precio: '$45' },
    { id: 2, nombre: 'Extensiones de Pestañas', categoria: 'Pestañas', duracion: '90 min', precio: '$70' },
    { id: 3, nombre: 'Corte de Cabello', categoria: 'Cabello', duracion: '45 min', precio: '$30' },
    { id: 4, nombre: 'Ondulación de Cabello', categoria: 'Cabello', duracion: '90 min', precio: '$60' },
    { id: 5, nombre: 'Pedicure Spa', categoria: 'Uñas', duracion: '60 min', precio: '$50' },
    { id: 6, nombre: 'Maquillaje Profesional', categoria: 'Rostro', duracion: '60 min', precio: '$45' },
    { id: 7, nombre: 'Peinados', categoria: 'Cabello', duracion: '45 min', precio: '$40' }
  ];

  paginaActual: number = 1;
  itemsPorPagina: number = 10;
  mostrarModal: boolean = false;
  esEdicion: boolean = false;
  formServicio: Servicio = this.limpiarForm();

  ngOnInit() {}

  get totalPaginas(): number {
    return Math.ceil(this.servicios.length / this.itemsPorPagina);
  }

  get serviciosPaginados(): Servicio[] {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    return this.servicios.slice(inicio, inicio + this.itemsPorPagina);
  }

  abrirModal(servicio?: Servicio) {
    if (servicio) {
      this.esEdicion = true;
      this.formServicio = { ...servicio };
    } else {
      this.esEdicion = false;
      this.formServicio = this.limpiarForm();
    }
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  guardarServicio() {
    if (this.esEdicion) {
      const index = this.servicios.findIndex(s => s.id === this.formServicio.id);
      if (index !== -1) this.servicios[index] = { ...this.formServicio };
    } else {
      this.formServicio.id = Date.now();
      this.servicios.push({ ...this.formServicio });
    }
    this.cerrarModal();
  }

  eliminarServicio(id?: number) {
    if (confirm('¿Deseas eliminar este servicio de Sanbella?')) {
      this.servicios = this.servicios.filter(s => s.id !== id);
      if (this.serviciosPaginados.length === 0 && this.paginaActual > 1) {
        this.paginaActual--;
      }
    }
  }

  cambiarPagina(p: number) {
    this.paginaActual = p;
  }

  private limpiarForm(): Servicio {
    // Inicializamos categoría vacía para que el "Seleccione..." aparezca por defecto
    return { nombre: '', categoria: '', duracion: '', precio: '$' };
  }
}