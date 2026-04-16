import { Routes } from '@angular/router';

import { InicioComponent } from './features/inicio/inicio.component'; //trae la ruta de inicio
import { ServiciosComponent } from './features/servicios/servicios.component'; // trae la ruta de servicios
import { ReservaComponent } from './features/reserva/reserva.component';
import { CitaComponent } from './features/cita/cita.component';


export const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'reserva', component: ReservaComponent },
  { path: 'miscitas', component: CitaComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Redirige al inicio por defecto
  { path: '**', redirectTo: '/inicio' } // Si escriben cualquier cosa, vuelve al inicio
];