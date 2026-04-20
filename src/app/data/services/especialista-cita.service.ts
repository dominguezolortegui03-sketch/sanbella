import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EspecialistaCita } from '../interfaces/especialista-cita.interface';

@Injectable({
  providedIn: 'root'
})
export class EspecialistaCitaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/especialista-cita';

  // Obtener todas las citas para el especialista
  getCitas(): Observable<EspecialistaCita[]> {
    return this.http.get<EspecialistaCita[]>(this.apiUrl);
  }

  // ACTUALIZACIÓN PARCIAL (Para estados, tiempos y fotos)
  actualizarCita(id: number, cambios: Partial<EspecialistaCita>): Observable<EspecialistaCita> {
    return this.http.patch<EspecialistaCita>(`${this.apiUrl}/${id}`, cambios);
  }
}