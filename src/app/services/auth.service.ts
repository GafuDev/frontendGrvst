import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario } from '../models/usuarioModel';
import { Rol } from '../models/rolModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/usuario/';
  private login = 'http://localhost:3000/usuario/login';

  private rolesMapping: { [key: number]: string } = {
    1: 'administrador',
    2: 'moderador',
    3: 'emprendedor',
    4: 'inversionista',
  };

  // Uso de BehaviorSubject para el rol del usuario
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  userRole$ = this.userRoleSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Registrar usuario
  registrarUsuario(usuario: Usuario[]): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }

  // Obtener el rol del usuario autenticado
  obtenerUsuarioAutenticado() {
    return localStorage.getItem('rol');
  }

  // Iniciar sesión
  loginUsuarioAutentication(login: any): Observable<any> {
    return this.http.post<any>(this.login, login)
    .pipe(
      tap(response => {
        if (response.status) {
          const idRol = response?.datos.rol;
          const userRole = this.rolesMapping[idRol];
          //const userRole = response?.rol;
          if (userRole) {
          localStorage.setItem('rol', userRole);
          this.userRoleSubject.next(userRole);
          } else{
            const errorMessage = `El Rol ingresado no coincide con un valor válido.`;
            console.error(errorMessage);
          }
        }
      })
    );
  }
  // Comprobar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.obtenerUsuarioAutenticado() !== null;
  }

  logout() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('username');
    localStorage.removeItem('rol');
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('bienvenido');
    this.userRoleSubject.next(null);
    window.location.href = '/portada';
  }

}
