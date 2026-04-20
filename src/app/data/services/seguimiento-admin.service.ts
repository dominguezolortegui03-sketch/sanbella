import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeguimientoAdmin } from '../interfaces/seguimiento-admin.interface';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoAdminService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/seguimiento';

  getCitas(): Observable<SeguimientoAdmin[]> {
    return this.http.get<SeguimientoAdmin[]>(this.apiUrl);
  }

  // Para reprogramar o cancelar usamos patch (actualización parcial)
  actualizarCita(id: string, cambios: Partial<SeguimientoAdmin>): Observable<SeguimientoAdmin> {
    return this.http.patch<SeguimientoAdmin>(`${this.apiUrl}/${id}`, cambios);
  }

  // Si necesitas crear una desde este módulo
  crearCita(cita: SeguimientoAdmin): Observable<SeguimientoAdmin> {
    return this.http.post<SeguimientoAdmin>(this.apiUrl, cita);
  }
}