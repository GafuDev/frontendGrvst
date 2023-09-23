import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../../models/proyectoModel';
import { ProyectosService } from '../../../services/proyectos.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { InversionService } from '../../../services/inversion.service';
import { HttpParams } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuarioModel';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-listall-proyectos',
  templateUrl: './listall-proyectos.component.html',
  styleUrls: ['./listall-proyectos.component.css']
})
export class ListallProyectosComponent implements OnInit {
  proyectos: Proyecto[] = [];

  totalInversiones: number = 0;
  progreso: number = 0;
  proyecto: Proyecto | null = null;
  idProyecto!: number;
  usuarios: Usuario[] = [];
  usuariosCargados: boolean = false;

  constructor(private proyectosService: ProyectosService,
              private router: Router,
              private inversionService: InversionService,
              private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    let usuario = localStorage.getItem('usuario');
    if (usuario) {
      this.obtenerProyectos();
      this.obtenerTotalInversiones(this.idProyecto);
      this.obtenerUsuarios();
    } else {
      this.router.navigate(['/login']);
    }
  }

  obtenerProyectos(): void {
    this.proyectosService.obtenerAllProyectos().subscribe(
      (proyectos: Proyecto[]) => {
        this.proyectos = proyectos;
      },
      (error) => {
        console.error('Error al obtener los proyectos:', error);
      }
    );
  }

  verProyectoid(idProyecto: number): void{
    this.router.navigate(['/detalleProyecto', {idProyecto}])
  }

  obtenerTotalInversiones(idProyecto: number): void {
    this.inversionService.obtenerTotalInversionesPorProyecto(idProyecto).subscribe(
      (total: number) => {

        this.totalInversiones = total;

        if (this.proyecto !== null && typeof this.proyecto !== 'undefined' && typeof this.proyecto.montoFinanciar !== 'undefined') {
          this.progreso = (this.totalInversiones / this.proyecto.montoFinanciar) * 100;
          console.log(typeof this.progreso);
        } else {
          this.progreso = 0;
        }
      },
      (error) => {
        console.error('Error al obtener el total de inversiones:', error);
      }
    );
  }

  obtenerUsuarios(): void {
    this.usuariosService.obtenerUsuarios(new HttpParams()).subscribe(
      (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.usuariosCargados = true;
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }
  obtenerNombreUsuario(idUsuario: number): string {

    if (this.usuariosCargados) {
      const usuario = this.usuarios.find(p => p.idUsuario === idUsuario);

      if (usuario) {
        return usuario.nombre || 'Usuario Griinvest';
      } else {
        return 'Usuario no encontrado';
      }
    } else {
      return 'Cargando...';
    }
  }

}

