import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { ProyectosService } from '../../../services/proyectos.service';
import { Proyecto } from '../../../models/proyectoModel'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-proyecto',
  templateUrl: './agregar-proyecto.component.html',
  styleUrls: ['./agregar-proyecto.component.css']
})
export class AgregarProyectoComponent implements OnInit{
  proyectoForm: FormGroup = new FormGroup({});
  proyecto: Proyecto = {};
  mensaje: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private proyectosService: ProyectosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let usuario = localStorage.getItem('usuario');
    if (usuario) {
      this.inicializarFormulario();
    } else {
      this.router.navigate(['/login']);
    }

  }

  fechaInicioValidator(control: AbstractControl) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (selectedDate > currentDate) {
      return { futureDate: true };
    }
    return null;
  }

  urlPatternValidator(control: AbstractControl) {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(control.value)) {
      return { invalidUrl: true };
    }
    return null;
  }

  inicializarFormulario(): void{
    this.proyectoForm = this.formBuilder.group({
      nombreProyecto: ['', Validators.required],
      descripcionProyecto: ['', [Validators.required, Validators.minLength(30)]],
      fechaInicio: [new Date(), [Validators.required, this.fechaInicioValidator]],
      montoFinanciar: ['', Validators.required],
      resumenProyecto: ['', [Validators.required, Validators.minLength(30)]],
      linkProyecto: ['', [Validators.required, this.urlPatternValidator]],
      logoProyecto: ['', Validators.required],
      idCategoria: ['', Validators.required],
    });
  }

  onLogoFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      this.proyectoForm?.get('logoProyecto')?.setValue(inputElement.files[0]);
    }
  }

  agregarProyecto(): void {
    if (this.proyectoForm.invalid) {
      return;
    }

    const formData = new FormData();
    console.log(formData);
    for (const key of Object.keys(this.proyectoForm.value)) {
      formData.append(key, this.proyectoForm.value[key]);
    }

    if (this.proyectoForm?.get('logoProyecto')?.value) {
      formData.append('logoProyecto', this.proyectoForm?.get('logoProyecto')?.value);
    }

    this.proyectosService.agregarProyecto(formData).subscribe(
      () => {
        this.mensaje = 'Proyecto agregado correctamente';
        this.proyectoForm.reset();
        this.proyectoForm?.get('logoProyecto')?.setValue(null); // Restablece el campo de archivo
      },
      error => {
        this.mensaje = 'Error al agregar proyecto';
        console.error('Error al agregar proyecto:', error);
      }
    );
  }
}
