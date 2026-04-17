import { Routes } from '@angular/router';

import { InicioComponent } from './features/inicio/inicio.component'; //trae la ruta de inicio
import { ServiciosComponent } from './features/servicios/servicios.component'; // trae la ruta de servicios
import { MisCitasComponent } from './features/mis-citas/mis-citas.component'
import { CitasComponent } from './features/citas/citas.component'; // trae la ruta del flujo de reserva
import { RegisterComponent } from './features/auth/register/register.component'; // trae la ruta del flujo de reserva
import { LoginComponent } from './features/auth/login/login.component'; // trae la ruta del flujo de reserva
import { PanelAdminComponent } from './features/admin/panel-admin/panel-admin.component';
import { InicioAdminComponent } from './features/admin/inicio-admin/inicio-admin.component';
import { SeguridadAdminComponent } from './features/admin/seguridad-admin/seguridad-admin.component';
import { SeguimientoAdminComponent } from './features/admin/seguimiento-admin/seguimiento-admin.component';
import { ServicioAdminComponent } from './features/admin/servicio-admin/servicio-admin.component';
import { PersonalAdminComponent } from './features/admin/personal-admin/personal-admin.component';
import { ReporteAdminComponent } from './features/admin/reporte-admin/reporte-admin.component';

export const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'citas', component: CitasComponent },
  {path:'mis-citas',component:MisCitasComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'panel-admin', component: PanelAdminComponent , 
    children: [
      {path: '', component: InicioAdminComponent},
      {path:'seguridad-admin', component: SeguridadAdminComponent},
      {path:'seguimiento-admin', component: SeguimientoAdminComponent},
      {path:'servicio-admin', component: ServicioAdminComponent},
      {path:'personal-admin', component: PersonalAdminComponent},
      {path:'reporte-admin', component: ReporteAdminComponent}    ]
  },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Redirige al inicio por defecto
  { path: '**', redirectTo: '/inicio' } // Si escriben cualquier cosa, vuelve al inicio
];