import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuarioModel';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:3000/usuario';

  constructor(private http: HttpClient) {}

  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  agregarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  obtenerUsuarios(params: HttpParams): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl, { params });
  }

  eliminarUsuario(idUsuario: number): Observable<void> {
    const url = `${this.apiUrl}/${idUsuario}`;
    return this.http.delete<void>(url);
  }

  actualizarUsuario(usuario: Usuario): Observable<Usuario> {
    const url = `${this.apiUrl}/${usuario.idUsuario}`;
    return this.http.put<Usuario>(url, usuario);
  }

}
