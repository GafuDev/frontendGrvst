import { Component, OnInit, ViewChild } from '@angular/core';
import { MensajesService } from '../../../services/mensajes.service';
import { Mensaje } from '../../../models/mensajeModel';
import { HttpParams } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../../models/usuarioModel';
import { UsuariosService } from '../../../services/usuarios.service';
import { ProyectosService } from '../../../services/proyectos.service';
import { Proyecto } from '../../../models/proyectoModel';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-listar-mensaje',
  templateUrl: './listar-mensaje.component.html',
  styleUrls: ['./listar-mensaje.component.css']
})
export class ListarMensajeComponent implements OnInit {

  //solucion para responder mensajes
  mensajeAResponder: Mensaje | null = null;
  respuesta: string = '';
  respuestaEnviada: boolean = false;
  mensajeRespuesta: string = '';
  emisorOriginalId: number | null = null;


  mensajeForm: FormGroup = new FormGroup({});

  //listar mensajes creados por el usuario logueado
  usuarioId: number | null = null;

  //mostrar nombres usuarios
  usuarios: Usuario[] = [];
  usuariosCargados: boolean = false;

  filtro: Mensaje = {
    idMensaje: undefined,
    contenidoMensaje: undefined,
    fechaEnvio: undefined
  };
  mensajes: Mensaje[] = [];

  @ViewChild('contenidoModal') contenidoModal: any;
  mostrarFiltros = false;

  constructor(private mensajesService: MensajesService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router,
    private usuariosService: UsuariosService,
    private proyectosService: ProyectosService) {
    this.mensajeForm = this.formBuilder.group({
      contenidoMensaje: ['', Validators.required],
      fechaEnvio: [''],
      idUsuarioEnvio: [''],
      idUsuarioRecibe: [''],
    });
  }

  ngOnInit(): void {
    let usuario = localStorage.getItem('usuario');
    let idLs = localStorage.getItem('idUsuario');
    if (usuario && idLs) {
      this.usuarioId = parseInt(idLs);
      this.filtrarMensajes();
      this.obtenerUsuarios();
    } else {
      this.router.navigate(['/login']);
    }
  }

  filtrarMensajes(): void {
    let params = new HttpParams();

    if (this.usuarioId !== null) {
      params = params.set('idUsuarioEnvio', this.usuarioId.toString());
    }

    this.mensajesService.obtenerMensaje(params).subscribe(
      (mensajes: Mensaje[]) => {
        this.mensajes = mensajes;
        this.mostrarFiltros = true;
      },
      error => {
        console.error('Error al obtener mensajes:', error);
      }
    );
  }

  editarMensaje(mensaje: Mensaje, content: any): void {
    const modalRef = this.modalService.open(content);
    modalRef.result.then(
      (result: Mensaje | undefined) => {
        if (result) {
          this.mensajesService.actualizarMensaje(mensaje).subscribe(
            updatedMessage => {
              this.mensajes = this.mensajes.map(m => (m.idMensaje === updatedMessage.idMensaje ? updatedMessage : m));
              this.mensajeForm.reset();
            },
            error => {
              console.error('Error al actualizar mensaje:', error);
            }
          );
        }
      },
      () => { }
    );
  }

  eliminarMensaje(idMensaje: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este mensaje?')) {
      this.mensajesService.eliminarMensaje(idMensaje).subscribe(
        () => {
          this.mensajes = this.mensajes.filter(mensaje => mensaje.idMensaje !== idMensaje);
          Swal.fire('Mensaje', 'Eliminado con exito', 'success');
        },
        error => {
          console.error('Error al eliminar mensaje:', error);
        }
      );
    }
  }

  //respuesta mensaje
  abrirFormularioRespuesta(mensaje: Mensaje) {
    this.mensajeAResponder = mensaje;
    this.respuesta = '';
    const fechaActual = new Date();
    this.mensajeForm.setValue({
      contenidoMensaje: '',
      idUsuarioEnvio: this.usuarioId || 0,
      idUsuarioRecibe: this.mensajeAResponder.idUsuarioEnvio || 0,
      fechaEnvio: fechaActual.toISOString(),
    });
    Swal.fire('Funcionalidad en construcción', "Lo sentimos, aún no se encuentra en funcionamiento", 'warning');
    console.log(this.mensajeForm);
  }

  enviarRespuesta() {
    if (!this.mensajeAResponder) {
      // Mensaje de error si no hay mensaje para responder
      Swal.fire('Error', 'No hay mensaje para responder', 'error');
      return;
    }

    if (this.mensajeForm.invalid) {
      // Mensaje de error si el formulario es inválido
      Swal.fire('Error', 'Por favor, completa todos los campos correctamente', 'error');
      return;
    }

    const formularioValues = this.mensajeForm.value;

  // Establece el campo contenidoMensaje en el valor de this.respuesta
  formularioValues.contenidoMensaje = this.respuesta;

  this.mensajesService.agregarMensaje(formularioValues).subscribe((response) => {
    this.mensajeAResponder = null;
    this.respuestaEnviada = true;
    this.mensajeRespuesta = response.message;
    this.mensajeForm.reset();
    console.log(this.respuesta);
    Swal.fire('Mensaje', this.mensajeRespuesta, 'success');
  }, error => {
    this.mensajeRespuesta = 'Error al enviar el mensaje.';
    console.error(error);
    Swal.fire('Mensaje', this.mensajeRespuesta, 'error');
  });
}

  cancelarRespuesta() {
    this.respuesta = '';
    this.mensajeForm.reset();
    this.mensajeAResponder = null;
    this.emisorOriginalId = null;
  }


  //obtener el nombre de usuario según su id
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

