import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { ProyectosService } from '../../../services/proyectos.service';
import { Proyecto } from '../../../models/proyectoModel'

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
    private proyectosService: ProyectosService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario(): void{
    this.proyectoForm = this.formBuilder.group({
      nombreProyecto: ['', Validators.required],
      descripcionProyecto: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      montoFinanciar: ['', Validators.required],
      montoAdquirido: ['', Validators.required],
      resumenProyecto: ['', Validators.required],
      linkProyecto: ['', Validators.required],
      logoProyecto: ['', Validators.required],
      idCategoria: ['', Validators.required],
      idUsuario: ['', Validators.required]
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
    /*const nuevoProyecto: Proyecto =  {...this.proyectoForm.value}; //logoProyecto: this.proyecto.logoProyecto
    this.proyectosService.agregarProyecto(nuevoProyecto).subscribe(
      () => {
        this.mensaje = 'Proyecto agregado correctamente';
        this.proyectoForm.reset();
        this.proyecto = {};
      },
      error => {
        this.mensaje = 'Error al agregar proyecto';
        console.error('Error al agregar proyecto:', error);
      }
    );*/
  }
}
