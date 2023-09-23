import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensajesService } from 'src/app/services/mensajes.service';
import { Mensaje } from '../../../models/mensajeModel';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuarioModel';
import { UsuariosService } from '../../../services/usuarios.service';
import { HttpParams } from '@angular/common/http';
import { ProyectosService } from '../../../services/proyectos.service';
import { Proyecto } from 'src/app/models/proyectoModel';

@Component({
  selector: 'app-agregar-mensaje',
  templateUrl: './agregar-mensaje.component.html',
  styleUrls: ['./agregar-mensaje.component.css']
})
export class AgregarMensajeComponent {
  mensajeForm: FormGroup = new FormGroup({});
  mensaje: string = '';

  //traer idUsuario desde localstorage
  usuarioId: number | null = null;

  //agregar nombres de usuario al agregar mensaje
  usuarios: Usuario[] = [];
  proyectos: Proyecto[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private mensajesService: MensajesService,
    private router: Router,
    private usuariosService: UsuariosService,
    private proyectosService: ProyectosService
  ) { }

  ngOnInit(): void {
    let usuario = localStorage.getItem('usuario');
    let idLs = localStorage.getItem('idUsuario');
    if (usuario && idLs) {
      this.usuarioId = parseInt(idLs);
      this.inicializarFormulario();
      this.cargarUsuarios();
    } else {
      this.router.navigate(['/login']);
    }
  }

  inicializarFormulario(): void {
    this.mensajeForm = this.formBuilder.group({
      contenidoMensaje: ['', Validators.required],
      idUsuarioRecibe: ['', Validators.required]
    });
  }

  agregarMensaje(): void {
    if (this.mensajeForm.invalid) {
      return;
    }

    const nuevoMensaje: any = this.mensajeForm.value;

    //agregamos id usuario localstorage
    nuevoMensaje.idUsuarioEnvio = this.usuarioId;

    this.mensajesService.agregarMensaje(nuevoMensaje).subscribe((response) => {
        Swal.fire('Mensaje', this.mensaje = response.message , 'success');
        this.mensajeForm.reset();
        this.router.navigate(['/mensaje']);
      },
      error => {
        //this.mensaje = ;
        Swal.fire('Mensaje', 'Error al enviar el mensaje.', 'error');
      }
    );
  }

  cargarUsuarios(): void{
    this.usuariosService.obtenerUsuarios(new HttpParams()).subscribe(
      (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  cargarProyectos(): void {
    this.proyectosService.obtenerProyectos(new HttpParams()).subscribe(
      (proyectos: Proyecto[]) => {
        this.proyectos = proyectos;
      },
      error => {
        console.error('Error al obtener proyectos:', error);
      }
    );
  }
}
