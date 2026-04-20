import { Component, OnInit, inject } from '@angular/core'; // Añadido OnInit e inject
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicioAdmin } from '../../../data/interfaces/servicio-admin.interface';
import { ServicioAdminService } from '../../../data/services/servicio-admin.service';

@Component({
  selector: 'app-servicio-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './servicio-admin.component.html',
  styleUrl: './servicio-admin.component.css'
})
export class ServicioAdminComponent implements OnInit {
  private servicioService = inject(ServicioAdminService); // Inyección del servicio

  // Controles UI (Mantengo igual)
  mostrarFiltros = false;
  mostrarModal = false;
  modoModal: 'nuevo' | 'editar' | 'ver' = 'nuevo';

  filtros = { nombre: '', categoria: '', estado: '' };
  categoriasDisponibles = ['Uñas', 'Pestañas', 'Cabello', 'Rostro', 'Corporal'];
  
  // Ahora iniciamos vacío
  servicios: ServicioAdmin[] = [];
  formServicio = this.limpiarForm();

  ngOnInit() {
    this.cargarServicios();
  }

  cargarServicios() {
    this.servicioService.getServicios().subscribe({
      next: (data) => this.servicios = data,
      error: (err) => console.error('Error al cargar servicios', err)
    });
  }

  get serviciosFiltrados() {
    return this.servicios.filter(s => {
      const matchNombre = s.nombre.toLowerCase().includes(this.filtros.nombre.toLowerCase());
      const matchCat = this.filtros.categoria === '' || s.categoria === this.filtros.categoria;
      const matchEstado = this.filtros.estado === '' || s.estado === this.filtros.estado;
      return matchNombre && matchCat && matchEstado;
    });
  }

  // --- Funcionalidades UI (Se mantienen intactas) ---
  limpiarFiltros() { this.filtros = { nombre: '', categoria: '', estado: '' }; }

  abrirModal(modo: 'nuevo' | 'editar' | 'ver', servicio?: ServicioAdmin) {
    this.modoModal = modo;
    this.formServicio = modo === 'nuevo' ? this.limpiarForm() : { ...servicio! };
    this.mostrarModal = true;
  }

  cerrarModal() { this.mostrarModal = false; }

  // --- Lógica de persistencia conectada al Servicio ---
  guardarServicio() {
    if (this.modoModal === 'editar') {
      this.servicioService.actualizarServicio(this.formServicio.id, this.formServicio).subscribe(() => {
        const index = this.servicios.findIndex(s => s.id === this.formServicio.id);
        if (index !== -1) this.servicios[index] = { ...this.formServicio };
        this.cerrarModal();
      });
    } else {
      this.servicioService.crearServicio(this.formServicio).subscribe((nuevo) => {
        this.servicios.push(nuevo);
        this.cerrarModal();
      });
    }
  }

 toggleEstado(servicio: ServicioAdmin) {
 
  const estadoAEnviar = servicio.estado === 'Habilitado' ? 'Inhabilitado' : 'Habilitado';

  if (confirm(`¿Desea cambiar el estado del servicio a ${estadoAEnviar}?`)) {
    
    this.servicioService.cambiarEstado(servicio.id, estadoAEnviar).subscribe({
      next: (servicioActualizado: ServicioAdmin) => {
       
        servicio.estado = servicioActualizado.estado;
      },
      error: (err) => {
        console.error('Error al cambiar el estado en el servidor:', err);
        alert('No se pudo actualizar el estado. Intente de nuevo.');
      }
    });
  }
}

  abrirModalCategoria() {
    const nueva = prompt('Nombre de la nueva categoría:');
    if (nueva && !this.categoriasDisponibles.includes(nueva)) {
      this.categoriasDisponibles.push(nueva);
    }
  }

  private limpiarForm(): ServicioAdmin {
    return { id: 0, nombre: '', categoria: 'Uñas', tiempo: '', precio: 'S/ ', estado: 'Habilitado' };
  }
}