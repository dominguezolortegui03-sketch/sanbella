import { Routes } from '@angular/router';

import { InicioComponent } from './features/inicio/inicio.component'; //trae la ruta de inicio
import { ServiciosComponent } from './features/servicios/servicios.component'; // trae la ruta de servicios
import { ReservaComponent } from './features/reserva/reserva.component';
import { CitaComponent } from './features/cita/cita.component';
import { PanelAdminComponent } from './features/panel-admin/panel-admin.component';
import { SeguridadComponent } from './features/seguridad/seguridad.component';
import { InicioAdminComponent } from './features/inicio-admin/inicio-admin.component';
import { SeguimintoAdminComponent } from './features/seguiminto-admin/seguiminto-admin.component';
import { ServicioAdminComponent } from './features/servicio-admin/servicio-admin.component';
import { PersonalAdminComponent } from './features/personal-admin/personal-admin.component';
import { ReporteAdminComponent } from './features/reporte-admin/reporte-admin.component';


export const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'reserva', component: ReservaComponent },
  { path: 'miscitas', component: CitaComponent },
  {path:'panelAdmin',component:PanelAdminComponent,
    children:[
      {path:'', component:InicioAdminComponent},
      {path:'seguridad', component:SeguridadComponent},
      {path:'seguimiento',component:SeguimintoAdminComponent},
      {path:'servicioAdmin',component:ServicioAdminComponent},
      {path:'personalAdmin',component:PersonalAdminComponent},
      {path:'reporteAdmin',component:ReporteAdminComponent}
    ]
  },
  
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Redirige al inicio por defecto
  { path: '**', redirectTo: '/inicio' } // Si escriben cualquier cosa, vuelve al inicio
];