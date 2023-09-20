import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuarioModel';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { HttpParams } from '@angular/common/http';
import { Proyecto } from 'src/app/models/proyectoModel';
import { ProyectosService } from '../../services/proyectos.service';

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

  //listar usuarios
  filtro: Usuario = {
    idRol: undefined,
    idComuna: undefined,
    idRegion: undefined,
    createAt: undefined
  };
  usuarios: Usuario[] = [];

  //listar Proyectos
  filtroproy: Proyecto = {
    idProyecto: undefined,
    nombreProyecto: undefined,
    fechaInicio: undefined
  };

  proyectos: Proyecto[] = [];
  usuarioId: any;

  constructor(private authService: AuthService, private router: Router, private usuariosService: UsuariosService, private proyectosService:ProyectosService) { }

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuarioAutenticado();
    let usuario = localStorage.getItem('idUsuario');
    this.nombre = localStorage.getItem('usuario');
    let idLs = localStorage.getItem('idUsuario');
    if(usuario === null || idLs === null){
      this.router.navigate(['/login']);
    } else {
      if (!localStorage.getItem('bienvenido')) {
        Swal.fire('Login', `Bienvenido ${this.nombre}`, 'success');
        localStorage.setItem('bienvenido', 'check');
        this.rolUsuario = localStorage.getItem('rol');
        this.establecerVisibilidadBotones();
        this.usuarioId = parseInt(idLs);
        this.filtrarUsuarios();
        this.filtrarProyectos();
      }
    }
    this.filtrarUsuarios();
    this.filtrarProyectos();
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

  //listar usuarios
  filtrarUsuarios(): void {
    let params = new HttpParams();

  if (this.filtro.nombre) {
    params = params.set('nombre', this.filtro.nombre);
  }
  if (this.filtro.idRol) {
    params = params.set('idRol', this.filtro.idRol.toString());
  }
  if (this.filtro.idComuna) {
    params = params.set('idComuna', this.filtro.idComuna.toString());
  }
  if (this.filtro.idRegion) {
    params = params.set('idRegion', this.filtro.idRegion.toString());
  }
  if (this.filtro.createAt) {
    params = params.set('createAt', this.filtro.createAt.toString());
  }

    this.usuariosService.obtenerUsuarios(params).subscribe(
      (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  eliminarUsuario(idUsuario: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.usuariosService.eliminarUsuario(idUsuario).subscribe(
        () => {
          this.usuarios = this.usuarios.filter(usuario => usuario.idUsuario !== idUsuario);
          Swal.fire('Eliminado', 'Usuario eliminado correctamente', 'success');
        },
        error => {
          console.error('Error al eliminar usuario:', error);
        }
      );
    }
  }

  //listar proyectos
  /* filtrarProyectos(): void {
    let params = new HttpParams();

    if (this.filtroproy.idProyecto) {
      params = params.set('idProyecto', this.filtroproy.idProyecto.toString());
    }
    if (this.filtroproy.nombreProyecto) {
      params = params.set('nombreProyecto', this.filtroproy.nombreProyecto);
    }
    if (this.filtroproy.fechaInicio) {
      params = params.set('Fecha Inicio', this.filtroproy.fechaInicio.toString());
    }

    this.proyectosService.obtenerProyectos(params).subscribe(
      (proyectos: Proyecto[]) => {
        this.proyectos = proyectos;
        console.log(proyectos);
      },
      error => {
        console.error('Error al obtener proyectos:', error);
      }
    );
  } */

  //verificar tiempo de carga, porque no alcanzan a cargar los proyectos.
  async filtrarProyectos(): Promise<void> {
    let params = new HttpParams();

    if (this.filtroproy.idProyecto) {
      params = params.set('idProyecto', this.filtroproy.idProyecto.toString());
    }
    if (this.filtroproy.nombreProyecto) {
      params = params.set('nombreProyecto', this.filtroproy.nombreProyecto);
    }
    if (this.filtroproy.fechaInicio) {
      params = params.set('Fecha Inicio', this.filtroproy.fechaInicio.toString());
    }

    try {
      const proyectos: Proyecto[] | undefined = await this.proyectosService.obtenerProyectos(params).toPromise();
      if (proyectos !== undefined) {
        this.proyectos = proyectos;
        console.log(proyectos);
      } else {
        console.log('no hay proyectos'); //manejar el error
      }
    } catch (error) {
      console.error('Error al obtener proyectos:', error);
    }
  }

}
