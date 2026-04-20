import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

// Importamos la interfaz desde donde realmente pertenece
import { MisCitas } from '../../data/interfaces/mis-citas.interface'; 
import { MisCitaService } from '../../data/services/mis-citas.service';

@Component({
  selector: 'app-mis-citas',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './mis-citas.component.html',
  styleUrl: './mis-citas.component.css'
})
export class MisCitasComponent implements OnInit {
  private citaService = inject(MisCitaService);

  mostrarModal = false;
  
  // Usamos el nombre de la interfaz que importamos (MisCitas)
  citaSeleccionada: MisCitas | null = null;
  citas: MisCitas[] = [];
  
  usuarioLogueadoId = 1;

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.citaService.getCitasUsuario(this.usuarioLogueadoId).subscribe({
      next: (data) => {
        this.citas = data;
      },
      error: (err) => console.error('Error al cargar citas:', err)
    });
  }

  verDetalle(cita: MisCitas): void {
    this.citaSeleccionada = cita;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.citaSeleccionada = null;
  }

  cancelarCita(id: number): void {
    if (confirm('¿Estás seguro de que deseas cancelar esta cita?')) {
      this.citaService.cancelarCita(id).subscribe({
        next: () => this.cargarCitas(),
        error: (err) => console.error('Error al cancelar:', err)
      });
    }
  }
}