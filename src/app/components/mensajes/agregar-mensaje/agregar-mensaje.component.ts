import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensajesService } from 'src/app/services/mensajes.service';
import { Mensaje } from '../../../models/mensajeModel';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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


  constructor(
    private formBuilder: FormBuilder,
    private mensajesService: MensajesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let usuario = localStorage.getItem('usuario');
    let idLs = localStorage.getItem('idUsuario');
    if (usuario && idLs) {
      this.usuarioId = parseInt(idLs);
      this.inicializarFormulario();
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
        console.log(this.usuarioId);
      }
    );
  }
}
