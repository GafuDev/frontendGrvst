import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuarioModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/usuario'; //en el back crear el registro

  constructor(private http: HttpClient) {}

  registrarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }

  obtenerUsuarioAutenticado() {
    //agregar lógica
  }
}
