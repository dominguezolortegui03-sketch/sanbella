// features/servicios/servicios.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioService } from '../../data/services/servicio.service';
import { Servicio } from '../../data/interfaces/servicio.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent implements OnInit {
  private servicioService = inject(ServicioService);
  private router = inject(Router);

  servicios: Servicio[] = [];
  cargando: boolean = true; // Para mostrar un spinner si quieres

  ngOnInit(): void {
    this.obtenerServicios();
  }

  obtenerServicios(): void {
    this.servicioService.getServicios().subscribe({
      next: (data) => {
        this.servicios = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al traer servicios:', err);
        this.cargando = false;
      }
    });
  }

  reservarServicio(servicio: Servicio) {
    this.router.navigate(['/citas'], { 
      queryParams: { servicio: servicio.title } 
    });
  }
}