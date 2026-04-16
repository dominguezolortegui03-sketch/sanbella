import { Routes } from '@angular/router';

import { InicioComponent } from './features/inicio/inicio.component'; //trae la ruta de inicio
import { ServiciosComponent } from './features/servicios/servicios.component'; // trae la ruta de servicios
import { CitasComponent } from './features/citas/citas.component'; // trae la ruta del flujo de reserva
import { RegisterComponent } from './features/auth/register/register.component'; // trae la ruta del flujo de reserva
import { LoginComponent } from './features/auth/login/login.component'; // trae la ruta del flujo de reserva

export const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'citas', component: CitasComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Redirige al inicio por defecto
  { path: '**', redirectTo: '/inicio' } // Si escriben cualquier cosa, vuelve al inicio
];