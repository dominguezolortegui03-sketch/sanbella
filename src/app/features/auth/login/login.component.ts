import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Necesario para [ngClass]

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  emailIngresado: string = '';
  passwordIngresado: string = '';
  verPassword = false; // Variable para controlar la visibilidad

  userTest = {
    nombre: 'Lucía',
    apellido: 'Bella',
    correo: 'test@sanbella.com',
    telefono: '912345678',
    password: 'admin123'
  };

  constructor(private router: Router) {}

  onLogin() {
    if (this.emailIngresado === this.userTest.correo && 
        this.passwordIngresado === this.userTest.password) {
      alert('¡Bienvenida, ' + this.userTest.nombre + '! ✨');
      localStorage.setItem('userLogueado', JSON.stringify(this.userTest));
      this.router.navigate(['/citas']);
    } else {
      alert('Datos incorrectos. Intenta con test@sanbella.com / admin123');
    }
  }
}