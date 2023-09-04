import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensajesService } from 'src/app/services/mensajes.service';
import { Mensaje } from '../../../models/mensajeModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-mensaje',
  templateUrl: './agregar-mensaje.component.html',
  styleUrls: ['./agregar-mensaje.component.css']
})
export class AgregarMensajeComponent {
  mensajeForm: FormGroup = new FormGroup({});
  mensaje: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private mensajesService: MensajesService
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
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

    const nuevoMensaje: Mensaje = this.mensajeForm.value;
    this.mensajesService.agregarMensaje(nuevoMensaje).subscribe(
      () => {
        this.mensaje = 'Mensaje agregado correctamente.';
        this.mensajeForm.reset();
      },
      error => {
        this.mensaje = 'Error al agregar el mensaje.';
        console.error('Error al agregar el mensaje:', error);
      }
    );
  }
}
