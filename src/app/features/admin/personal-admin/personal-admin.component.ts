import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Personal {
  id?: number;
  nombre: string;
  puesto: string;
  horarioSemana: { dias: string; horas: string };
  horarioFinSemana: { dias: string; horas: string };
}

@Component({
  selector: 'app-personal-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './personal-admin.component.html',
  styleUrl: './personal-admin.component.css'
})
export class PersonalAdminComponent implements OnInit {
  
  // Lista de especialidades para el combo
  especialidades: string[] = [
    'Estilista',
    'Masajista',
    'Esteticista',
    'Manicurista',
    'Recepcionista'
  ];

  personal: Personal[] = [
    {
      id: 1,
      nombre: 'Sarah Jones',
      puesto: 'Estilista',
      horarioSemana: { dias: 'Lun - Vie', horas: '9:00 AM - 5:00 PM' },
      horarioFinSemana: { dias: 'Sáb', horas: '10:00 AM - 4:00 PM' }
    },
    {
      id: 2,
      nombre: 'Mike Smith',
      puesto: 'Masajista',
      horarioSemana: { dias: 'Lun - Vie', horas: '9:00 AM - 5:00 PM' },
      horarioFinSemana: { dias: 'Sáb', horas: '10:00 AM - 4:00 PM' }
    },
    {
      id: 3,
      nombre: 'Emily Davis',
      puesto: 'Esteticista',
      horarioSemana: { dias: 'Lun - Vie', horas: '9:00 AM - 5:00 PM' },
      horarioFinSemana: { dias: 'Sáb', horas: '10:00 AM - 4:00 PM' }
    }
  ];

  mostrarModal = false;
  esEdicion = false;
  formPersonal: Personal = this.resetForm();

  ngOnInit() {}

  abrirModal(empleado?: Personal) {
    if (empleado) {
      this.esEdicion = true;
      this.formPersonal = JSON.parse(JSON.stringify(empleado));
    } else {
      this.esEdicion = false;
      this.formPersonal = this.resetForm();
    }
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  guardarPersonal() {
    if (this.esEdicion) {
      const index = this.personal.findIndex(p => p.id === this.formPersonal.id);
      if (index !== -1) {
        this.personal[index] = { ...this.formPersonal };
      }
    } else {
      this.formPersonal.id = Date.now();
      this.personal.push({ ...this.formPersonal });
    }
    this.cerrarModal();
  }

  private resetForm(): Personal {
    return {
      nombre: '',
      puesto: '', // Se inicializa vacío para el "Seleccione..."
      horarioSemana: { dias: 'Lun - Vie', horas: '' },
      horarioFinSemana: { dias: 'Sáb', horas: '' }
    };
  }
}