import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InversionService } from '../../../services/inversion.service';
import { Inversion } from '../../../models/inversionModel';

@Component({
  selector: 'app-agregar-inversion',
  templateUrl: './agregar-inversion.component.html',
  styleUrls: ['./agregar-inversion.component.css']
})
export class AgregarInversionComponent {
  inversionForm: FormGroup = new FormGroup({});
  mensaje: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private InversionService: InversionService
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    this.inversionForm = this.formBuilder.group({
      montoInversion: ['', Validators.required],
      //idUsuario: ['', Validators.required], hay que hacer que sea el usuario registrado
      idProyecto: ['', Validators.required],
    });
  }

  agregarInversion(): void {
    if (this.inversionForm.invalid) {
      return;
    }

    const nuevaInversion: Inversion = this.inversionForm.value;
    this.InversionService.agregarInversion(nuevaInversion).subscribe(
      () => {
        this.mensaje = 'Has invertido: ' + nuevaInversion.montoInversion + ' en el proyecto id: '+ nuevaInversion.idProyecto +', con éxito';
        this.inversionForm.reset();
      },
      error => {
        this.mensaje = 'Error al Invertir.';
        console.error('Error al crear la inversión:', error);
      }
    );
  }
}

