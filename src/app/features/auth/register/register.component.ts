import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  mostrarTooltip = false;

  userRegister = {
    nombre: '',
    apellido: '',
    correo: '',
    tipoDoc: 'DNI',
    numDoc: '',
    telefono: '',
    usuario: '',
    password: '',
    confirmPassword: ''
  };

  checks = {
    minChars: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false
  };

  validarPassword() {
    const pass = this.userRegister.password;
    this.checks.minChars = pass.length >= 8;
    this.checks.hasUpper = /[A-Z]/.test(pass);
    this.checks.hasLower = /[a-z]/.test(pass);
    this.checks.hasNumber = /\d/.test(pass);
  }

  todoValido(): boolean {
    const requisitosPassword = this.checks.minChars && this.checks.hasUpper && 
                               this.checks.hasLower && this.checks.hasNumber;
    
    const coincideConfirmacion = this.userRegister.password === this.userRegister.confirmPassword && 
                                 this.userRegister.password !== '';

    return requisitosPassword && coincideConfirmacion && 
           this.userRegister.nombre !== '' && this.userRegister.correo !== '';
  }

  onSubmit() {
    if (this.todoValido()) {
      console.log("Registro exitoso para Sanbella:", this.userRegister);
      // Aquí invocas el servicio de registro
    } else {
      alert("Por favor, verifique que todos los campos y la contraseña sean correctos.");
    }
  }
}