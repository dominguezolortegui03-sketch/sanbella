import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importante para el [(ngModel)]

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // Modelo para capturar lo que el usuario escribe
  emailIngresado: string = '';
  passwordIngresado: string = '';

  // Datos de prueba (Simulando una DB)
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
      
      // Guardamos en el almacenamiento del navegador que ya entró
      localStorage.setItem('userLogueado', JSON.stringify(this.userTest));
      
      // Redirigimos de vuelta a citas
      this.router.navigate(['/citas']);
    } else {
      alert('Datos incorrectos. Intenta con test@sanbella.com / admin123');
    }
  }
}