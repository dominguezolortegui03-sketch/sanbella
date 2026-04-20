import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ServicioAdmin } from '../interfaces/servicio-admin.interface';

@Injectable({
  providedIn: 'root'
})
export class ServicioAdminService {
  private http = inject(HttpClient);
  // Reemplaza con tu URL real del backend
  private apiUrl = 'http://localhost:3000/servicios'; 

  // GET: Obtener todos los servicios
  getServicios(): Observable<ServicioAdmin[]> {
    return this.http.get<ServicioAdmin[]>(this.apiUrl);
  }

  // POST: Crear nuevo servicio
  crearServicio(servicio: ServicioAdmin): Observable<ServicioAdmin> {
    return this.http.post<ServicioAdmin>(this.apiUrl, servicio);
  }

  // PUT: Actualizar servicio existente
  actualizarServicio(id: number, servicio: ServicioAdmin): Observable<ServicioAdmin> {
    return this.http.put<ServicioAdmin>(`${this.apiUrl}/${id}`, servicio);
  }

  // PATCH: Cambiar estado (opcional, dependiendo de tu backend)
 cambiarEstado(id: number, nuevoEstado: string): Observable<ServicioAdmin> {
  return this.http.patch<ServicioAdmin>(`${this.apiUrl}/${id}`, { estado: nuevoEstado });
}
}