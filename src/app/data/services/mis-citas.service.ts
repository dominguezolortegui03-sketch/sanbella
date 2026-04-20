import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { MisCitas } from '../interfaces/mis-citas.interface';

@Injectable({
  providedIn: 'root'
})
export class MisCitaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/mis-citas';

  // Obtenemos solo las citas de un usuario específico (ej: id 1)
  getCitasUsuario(usuarioId: number): Observable<MisCitas[]> {
    return this.http.get<MisCitas[]>(`${this.apiUrl}?usuarioId=${usuarioId}`).pipe(
      map(citas => citas.reverse()) // Las más recientes primero
    );
  }

  // Cambiar el estado a cancelado en el back
  cancelarCita(id: number): Observable<MisCitas> {
    return this.http.patch<MisCitas>(`${this.apiUrl}/${id}`, { 
      status: 'cancelled', 
      statusLabel: 'Cancelado' 
    });
  }
}