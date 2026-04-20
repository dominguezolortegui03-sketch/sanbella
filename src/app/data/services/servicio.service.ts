// data/services/servicio.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servicio } from '../interfaces/servicio.interface';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private http = inject(HttpClient);
  // URL de tu json-server
  private apiUrl = 'http://localhost:3000/serviciobase'; 

  // Método para traer todos los servicios
  getServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.apiUrl);
  }
}