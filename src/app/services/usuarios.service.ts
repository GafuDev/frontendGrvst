import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuarioModel';
import { Comuna } from '../models/comunaModel';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'https://griinvest.cl/usuario';

  //private apiUrl = 'http://localhost:3000/usuario';

  constructor(private http: HttpClient) {}

  obtenerUsuarios(params: HttpParams): Observable<Usuario[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<Usuario[]>(url, { params });
  }

  obtenerUsuarioPorId(idUsuario: number): Observable<Usuario> {
    const url = `${this.apiUrl}/${idUsuario}`;
    return this.http.get<Usuario>(url);
  }

  agregarUsuario(usuario: Usuario[]): Observable<Usuario> {
    const url = `${this.apiUrl}/agregar`;
    return this.http.post<Usuario>(url, usuario);
  }

  eliminarUsuario(idUsuario: number): Observable<void> {
    const url = `${this.apiUrl}/eliminar/${idUsuario}`;
    return this.http.delete<void>(url);
  }

  actualizarUsuario(usuario: Usuario): Observable<Usuario> {
    const url = `${this.apiUrl}/editar/${usuario.idUsuario}`;
    return this.http.put<Usuario>(url, usuario);
  }

}
