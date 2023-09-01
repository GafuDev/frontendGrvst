import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inversion } from '../models/inversionModel';

@Injectable({
  providedIn: 'root'
})
export class InversionService {
  private apiUrl = 'http://localhost:3000/inversion';

  constructor(private http: HttpClient) {}

  obtenerInversion(params: HttpParams): Observable<Inversion[]> {
    return this.http.get<Inversion[]>(this.apiUrl, { params });
  }

  obtenerInversionPorId(idInversion: number): Observable<Inversion> {
    const url = `${this.apiUrl}/${idInversion}`;
    return this.http.get<Inversion>(url);
  }

  agregarInversion(inversion: Inversion): Observable<Inversion> {
    const url = `${this.apiUrl}/agregar`;
    return this.http.post<Inversion>(url, inversion);
  }

  eliminarInversion(idInversion: number): Observable<void> {
    const url = `${this.apiUrl}/eliminar/${idInversion}`;
    return this.http.delete<void>(url);
  }

  actualizarInversion(inversion: Inversion): Observable<Inversion> {
    const url = `${this.apiUrl}/editar/${inversion.idInversion}`;
    return this.http.put<Inversion>(url, inversion);
  }
}
