import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mensaje } from '../models/mensajeModel';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  private apiUrl = 'https://griinvest.cl/mensaje';
  
  //private apiUrl = 'http://localhost:3000/mensaje';


  constructor(private http: HttpClient) {}

  obtenerMensaje(params: HttpParams): Observable<Mensaje[]> {
    return this.http.get<Mensaje[]>(this.apiUrl, { params });
  }

  obtenerMensajePorId(idMensaje: number): Observable<Mensaje> {
    const url = `${this.apiUrl}/${idMensaje}`;
    return this.http.get<Mensaje>(url);
  }

  agregarMensaje(mensaje: Mensaje): Observable<any> {
    const url = `${this.apiUrl}/agregar`;
    return this.http.post<any>(url, mensaje);
  }

  eliminarMensaje(idMensaje: number): Observable<void> {
    const url = `${this.apiUrl}/eliminar/${idMensaje}`;
    return this.http.delete<void>(url);
  }

  actualizarMensaje(mensaje: Mensaje): Observable<Mensaje> {
    const url = `${this.apiUrl}/editar/${mensaje.idMensaje}`;
    return this.http.put<Mensaje>(url, mensaje);
  }
}
