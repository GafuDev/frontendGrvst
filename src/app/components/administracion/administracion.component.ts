import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {
  usuario: any;
  rolUsuario: string = '';

  mostrarAgregarUsuario: boolean = false;
  mostrarAprobarProyectos: boolean = false;
  mostrarAgregarProyectos: boolean = false;
  mostrarInvertir: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuarioAutenticado();
    this.rolUsuario = this.determinarRolUsuario();
    this.establecerVisibilidadBotones();
  }

  determinarRolUsuario(): string {
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
      return 'usuario';
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

