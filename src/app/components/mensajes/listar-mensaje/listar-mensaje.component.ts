import { Component, OnInit, ViewChild } from '@angular/core';
import { MensajesService } from '../../../services/mensajes.service';
import { Mensaje } from '../../../models/mensajeModel';
import { HttpParams } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listar-mensaje',
  templateUrl: './listar-mensaje.component.html',
  styleUrls: ['./listar-mensaje.component.css']
})
export class ListarMensajeComponent implements OnInit {
  mensajeForm: FormGroup = new FormGroup({});

  //listar mensajes creados por el usuario logueado
  usuarioId: number | null = null;


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
              private router: Router) {
    this.mensajeForm = this.formBuilder.group({
      contenidoMensaje: ['', Validators.required],
      fechaEnvio: ['', Validators.required],
      idUsuarioEnvio: ['', Validators.required],
      idUsuarioRecibe: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    let usuario = localStorage.getItem('usuario');
    let idLs = localStorage.getItem('idUsuario');
    if (usuario && idLs) {
      this.usuarioId = parseInt(idLs);
      this.filtrarMensajes();
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
      () => {}
    );
  }

  eliminarMensaje(idMensaje: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este mensaje?')) {
      this.mensajesService.eliminarMensaje(idMensaje).subscribe(
        () => {
          this.mensajes = this.mensajes.filter(mensaje => mensaje.idMensaje !== idMensaje);
          Swal.fire('Mensaje', 'Eliminado con exito' , 'success');
        },
        error => {
          console.error('Error al eliminar mensaje:', error);
        }
      );
    }
  }
}

