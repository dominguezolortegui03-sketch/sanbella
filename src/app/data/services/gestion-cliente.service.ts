import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GestionCliente } from '../interfaces/gestion-clientes.interface';

@Injectable({
  providedIn: 'root'
})
export class GestionClienteService {
  private http = inject(HttpClient);
  // URL para JSON Server o Backend real
  private apiUrl = 'http://localhost:3000/clientes'; 

  getClientes(): Observable<GestionCliente[]> {
    return this.http.get<GestionCliente[]>(this.apiUrl);
  }

  crearCliente(cliente: GestionCliente): Observable<GestionCliente> {
    return this.http.post<GestionCliente>(this.apiUrl, cliente);
  }

  actualizarCliente(id: string, cliente: GestionCliente): Observable<GestionCliente> {
    return this.http.put<GestionCliente>(`${this.apiUrl}/${id}`, cliente);
  }

  // Si usas JSON Server para simular el cambio de estado
  cambiarEstado(id: string, nuevoEstado: string): Observable<GestionCliente> {
    return this.http.patch<GestionCliente>(`${this.apiUrl}/${id}`, { Estado: nuevoEstado });
  }
}