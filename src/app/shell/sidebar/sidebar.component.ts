import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from "@angular/router";

interface SiderbarOption{
  icon:string;
  label:string;
  route:string
}


@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
 menuOptions: SiderbarOption[]=[
  {icon:'assets/sidebarIcon/seguridad.svg',label:'Módulo 1: Seguridad',route:'/panelAdmin/seguridad'},
  {icon:'assets/sidebarIcon/seguimiento.svg',label:'Módulo 2: Seguimiento',route:'/panelAdmin/seguimiento'},
  {icon:'assets/sidebarIcon/servicios.svg',label:'Servicios',route:'/panelAdmin/servicioAdmin'},
  {icon:'assets/sidebarIcon/personal.svg',label:'Personal y Horarios',route:'/panelAdmin/personalAdmin'},
  {icon:'assets/sidebarIcon/reporte.svg',label:'Reportes',route:'/panelAdmin/reporteAdmin'}
]
}
