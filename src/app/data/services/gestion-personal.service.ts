import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GestionPersonal } from '../interfaces/gestion-personal.interface';

@Injectable({
  providedIn: 'root'
})
export class GestionPersonalService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/personal';

  getUsuarios(): Observable<GestionPersonal[]> {
    return this.http.get<GestionPersonal[]>(this.apiUrl);
  }

  crearUsuario(usuario: GestionPersonal): Observable<GestionPersonal> {
    return this.http.post<GestionPersonal>(this.apiUrl, usuario);
  }

  actualizarUsuario(id: string, usuario: GestionPersonal): Observable<GestionPersonal> {
    return this.http.put<GestionPersonal>(`${this.apiUrl}/${id}`, usuario);
  }

  cambiarEstado(id: string, nuevoEstado: string): Observable<GestionPersonal> {
    return this.http.patch<GestionPersonal>(`${this.apiUrl}/${id}`, { Estado: nuevoEstado });
  }
}