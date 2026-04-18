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
  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
 menuOptions: SiderbarOption[]=[
  {icon:'assets/sidebarIcon/seguridad.svg',label:'Módulo 1: Gestion cliente',route:'/panel-admin/gestion-cliente'},
  {icon:'assets/sidebarIcon/seguridad.svg',label:'Módulo 2: Gestion Personal',route:'/panel-admin/gestion-personal'},
  {icon:'assets/sidebarIcon/seguimiento.svg',label:'Módulo 3: Seguimiento',route:'/panel-admin/seguimiento-admin'},
  {icon:'assets/sidebarIcon/servicios.svg',label:'Servicios',route:'/panel-admin/servicio-admin'},
  {icon:'assets/sidebarIcon/personal.svg',label:'Personal y Horarios',route:'/panel-admin/personal-admin'},
  {icon:'assets/sidebarIcon/reporte.svg',label:'Reportes',route:'/panel-admin/reporte-admin'}
]
}
