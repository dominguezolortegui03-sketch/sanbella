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
  // Controles UI
  mostrarFiltros = false;
  mostrarModal = false;
  modoModal: 'nuevo' | 'editar' | 'ver' = 'nuevo';

  // Objeto de filtros unificado
  filtros = {
    nombre: '',
    categoria: '',
    estado: ''
  };

  categoriasDisponibles = ['Uñas', 'Pestañas', 'Cabello', 'Rostro', 'Corporal'];
  
  servicios: Servicio[] = [
    { id: 1, nombre: 'Manicure Spa', categoria: 'Uñas', tiempo: '60 min', precio: 'S/ 45.00', estado: 'Habilitado' },
    { id: 2, nombre: 'Corte Varón', categoria: 'Cabello', tiempo: '30 min', precio: 'S/ 30.00', estado: 'Habilitado' }
  ];

  formServicio = this.limpiarForm();

  get serviciosFiltrados() {
    return this.servicios.filter(s => {
      const matchNombre = s.nombre.toLowerCase().includes(this.filtros.nombre.toLowerCase());
      const matchCat = this.filtros.categoria === '' || s.categoria === this.filtros.categoria;
      const matchEstado = this.filtros.estado === '' || s.estado === this.filtros.estado;
      return matchNombre && matchCat && matchEstado;
    });
  }

  limpiarFiltros() {
    this.filtros = { nombre: '', categoria: '', estado: '' };
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
      if (index !== -1) this.servicios[index] = { ...this.formServicio };
    } else {
      this.formServicio.id = Date.now();
      this.servicios.push({ ...this.formServicio });
    }
    this.cerrarModal();
  }

  toggleEstado(servicio: Servicio) {
    const nuevo = servicio.estado === 'Habilitado' ? 'Inhabilitado' : 'Habilitado';
    if (confirm(`¿Desea cambiar el estado del servicio a ${nuevo}?`)) {
      servicio.estado = nuevo;
    }
  }

  abrirModalCategoria() {
    const nueva = prompt('Nombre de la nueva categoría:');
    if (nueva && !this.categoriasDisponibles.includes(nueva)) {
      this.categoriasDisponibles.push(nueva);
    }
  }

  private limpiarForm(): Servicio {
    return { id: 0, nombre: '', categoria: 'Uñas', tiempo: '', precio: 'S/ ', estado: 'Habilitado' };
  }
}