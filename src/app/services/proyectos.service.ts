import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyecto } from '../models/proyectoModel';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  private apiUrl = 'http://localhost:3000/proyecto'; // Reemplazar con la URL de tu API

  constructor(private http: HttpClient) {}


  obtenerProyectos(params: HttpParams): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(this.apiUrl, { params });
  }

  agregarProyecto(proyecto: Proyecto): Observable<Proyecto> {
    const formData = new FormData();

    formData.append('nombreProyecto', proyecto.nombreProyecto || '');
    formData.append('descripcionProyecto', proyecto.descripcionProyecto || '');
    formData.append('fechaInicio', proyecto.fechaInicio?.toISOString() || '');
    formData.append('montoFinanciar', proyecto.montoFinanciar?.toString() || '');
    formData.append('montoAdquirido', proyecto.montoAdquirido?.toString() || '');
    formData.append('resumenProyecto', proyecto.resumenProyecto || '');
    formData.append('linkProyecto', proyecto.linkProyecto || '');
    formData.append('idCategoria', proyecto.idCategoria?.toString() || '');
    formData.append('idUsuario', proyecto.idUsuario?.toString() || '');

    if (proyecto.logoProyecto) {
      formData.append('logoProyecto', proyecto.logoProyecto);
    }

    return this.http.post<Proyecto>(this.apiUrl, formData);
  }

}
