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

  obtenerUsuarios(params: HttpParams): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl, { params });
  }

  agregarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }
}
