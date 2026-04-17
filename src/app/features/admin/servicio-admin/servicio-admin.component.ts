import { Component } from '@angular/core';

@Component({
  selector: 'app-servicio-admin',
  imports: [],
  templateUrl: './servicio-admin.component.html',
  styleUrl: './servicio-admin.component.css'
})
export class ServicioAdminComponent {
  servicios = [
    { nombre: 'Manicure Spa', categoria: 'Unas', duracion: '60 min', precio: '$45' },
    { nombre: 'Extensiones de Pestanas', categoria: 'Pestanas', duracion: '90 min', precio: '$70' },
    { nombre: 'Corte de Cabello', categoria: 'Cabello', duracion: '45 min', precio: '$30' },
    { nombre: 'Ondulación de Cabello', categoria: 'Cabello', duracion: '90 min', precio: '$60' },
    { nombre: 'Pedicure Spa', categoria: 'Unas', duracion: '60 min', precio: '$50' },
    { nombre: 'Maquillaje Profesional', categoria: 'Rostro', duracion: '60 min', precio: '$45' },
    { nombre: 'Peinados', categoria: 'Cabello', duracion: '45 min', precio: '$40' }
  ];
}
