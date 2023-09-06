import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {
  usuario: any;
  rolUsuario: any;
  nombre: any = '';
  mostrarAgregarUsuario: boolean = false;
  mostrarAprobarProyectos: boolean = false;
  mostrarAgregarProyectos: boolean = false;
  mostrarInvertir: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuarioAutenticado();
    let usuario = localStorage.getItem('idUsuario');
    this.nombre = localStorage.getItem('usuario');
    if(usuario === null){
      this.router.navigate(['/login']);
    } else {
      if (!localStorage.getItem('bienvenido')) {
        Swal.fire('Login', `Bienvenido ${this.nombre}`, 'success');
        localStorage.setItem('bienvenido', 'check');
        this.rolUsuario = localStorage.getItem('rol');
        this.establecerVisibilidadBotones();
      }
    }
  }

  determinarRolUsuario(): any {
    // Lógica para determinar el rol del usuario según sus atributos
    if (this.usuario.idRol === 1) {
      return 'administrador';
    } else if (this.usuario.idRol === 2) {
      return 'moderador';
    } else if (this.usuario.idRol === 3) {
      return 'emprendedor';
    } else if (this.usuario.idRol === 4) {
      return 'inversionista';
    } else {
      return false;
    }
  }

  establecerVisibilidadBotones(): void {
    switch (this.rolUsuario) {
      case 'administrador':
        this.mostrarAgregarUsuario = true;
        break;
      case 'moderador':
        this.mostrarAprobarProyectos = true;
        break;
      case 'emprendedor':
        this.mostrarAgregarProyectos = true;
        break;
      case 'inversionista':
        this.mostrarInvertir = true;
        break;
      default:
        break;
    }
  }
}
