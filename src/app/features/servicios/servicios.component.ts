import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';



@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css',
  imports: [
    CommonModule, 
    FormsModule, 
    MatDatepickerModule, 
    MatCardModule, 
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ],
})
export class ServiciosComponent {
  servicios = [
    { title: 'CABELLO', desc: 'Cortes, coloración y tratamientos capilares.', price: 120, img: '/assets/servicio/cabello.jpg' },
    { title: 'MAQUILLAJE', desc: 'Social, de novia y caracterización profesional.', price: 150, img: 'assets/servicio/maquillaje.jpg' },
     { title: 'CEJAS', desc: 'Perfilado', price: 60, img: 'assets/servicio/cejas.jpg' },
    { title:'PESTAÑAS', desc:'Extensiones pelo a pelo y lifting de pestañas.', price:90, img:'assets/servicio/pestañas.jpeg'},
    { title: 'MANICURE', desc: 'Uñas gel, acrílicas y cuidado de manos.', price: 50, img:'assets/servicio/manicure.webp'},
    { title: 'PEDICURE', desc: 'tratamientos.', price: 50, img:'assets/servicio/pedicure.jpg'}
 ];
}
