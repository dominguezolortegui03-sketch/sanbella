import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
// Objeto para capturar los datos del formulario
  userRegister = {
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    password: '',
    confirmPassword: ''
  };

  onSubmit() {
    if (this.userRegister.password !== this.userRegister.confirmPassword) {
      alert("¡Las contraseñas no coinciden!");
      return;
    }
    console.log("Datos enviados a Sanbella:", this.userRegister);
    // Aquí iría la llamada al servicio de tu carpeta 'core'
  }
}
