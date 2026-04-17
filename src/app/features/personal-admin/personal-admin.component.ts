import { Component } from '@angular/core';

@Component({
  selector: 'app-personal-admin',
  imports: [],
  templateUrl: './personal-admin.component.html',
  styleUrl: './personal-admin.component.css'
})
export class PersonalAdminComponent {
personal = [
    {
      nombre: 'Sarah Jones',
      puesto: 'Estilista',
      horarioSemana: { dias: 'Lun - Vie', horas: '9:00 AM - 5:00 PM' },
      horarioFinSemana: { dias: 'Sáb', horas: '10:00 AM - 4:00 PM' }
    },
    {
      nombre: 'Mike Smith',
      puesto: 'Masajista',
      horarioSemana: { dias: 'Lun - Vie', horas: '9:00 AM - 5:00 PM' },
      horarioFinSemana: { dias: 'Sáb', horas: '10:00 AM - 4:00 PM' }
    },
    {
      nombre: 'Emily Davis',
      puesto: 'Esteticista',
      horarioSemana: { dias: 'Lun - Vie', horas: '9:00 AM - 5:00 PM' },
      horarioFinSemana: { dias: 'Sáb', horas: '10:00 AM - 4:00 PM' }
    }
  ];
}
