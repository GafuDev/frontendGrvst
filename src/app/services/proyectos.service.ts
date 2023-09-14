import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyecto } from '../models/proyectoModel';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  private apiUrl = 'https://griinvest.cl/proyecto';

  //private apiUrl = 'http://localhost:3000/proyecto';

  constructor(private http: HttpClient) {}

  obtenerProyectos(params: HttpParams): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(this.apiUrl, { params });
  }

//prueba todos los proyeccots listall-proyecto
  obtenerAllProyectos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(this.apiUrl);
  }

  obtenerProyectoPorId(idProyecto: number): Observable<Proyecto> {
    const url = `${this.apiUrl}/${idProyecto}`;
    return this.http.get<Proyecto>(url);
  }

  agregarProyecto(proyecto: FormData): Observable<Proyecto> {
    const url = `${this.apiUrl}/agregar`;
    return this.http.post<Proyecto>(url, proyecto);
  }

  eliminarProyecto(idProyecto: number): Observable<void> {
    const url = `${this.apiUrl}/eliminar/${idProyecto}`;
    return this.http.delete<void>(url);
  }

  actualizarProyecto(proyecto: Proyecto): Observable<Proyecto> {
    const url = `${this.apiUrl}/editar/${proyecto.idProyecto}`;
    return this.http.put<Proyecto>(url, proyecto);
  }
}
