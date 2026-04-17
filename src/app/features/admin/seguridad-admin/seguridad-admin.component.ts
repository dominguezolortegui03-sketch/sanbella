import { Component } from '@angular/core';
import { SidebarComponent } from '../../../shell/sidebar/sidebar.component';
import { NavbarComponent } from '../../../shell/navbar/navbar.component';
import { CommonModule, NgClass } from '@angular/common';

export interface Usuario {
  id: string;
  username: string;
  rol: 'Cliente' | 'Admin' | 'Recepcionista';
  email: string;
  telefono: string;
}


@Component({
  selector: 'app-seguridad-admin',
  imports: [SidebarComponent, NavbarComponent,NgClass,CommonModule],
  templateUrl: './seguridad-admin.component.html',
  styleUrl: './seguridad-admin.component.css'
})
export class SeguridadAdminComponent {
usuarios: Usuario[] = [
    {
      id: '17757700',
      username: 'admin',
      rol: 'Cliente',
      email: 'admin@gmail.com',
      telefono: '9999999'
    },
    {
      id: '28848811',
      username: 'claudia_p',
      rol: 'Cliente',
      email: 'claudia@gmail.com',
      telefono: '9888888'
    }
  ];

  editarUsuario(usuario: Usuario) {
    console.log('Editando:', usuario.username);
  }

  eliminarUsuario(id: string) {
    console.log('Eliminando ID:', id);
  }
}