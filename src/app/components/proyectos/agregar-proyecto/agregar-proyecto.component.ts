import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { ProyectosService } from '../../../services/proyectos.service';
import { Proyecto } from '../../../models/proyectoModel'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-agregar-proyecto',
  templateUrl: './agregar-proyecto.component.html',
  styleUrls: ['./agregar-proyecto.component.css']
})
export class AgregarProyectoComponent implements OnInit{
  proyectoForm: FormGroup = new FormGroup({});
  //proyecto: Proyecto = {};
  mensaje: string = '';

  usuarioId: number | null = null;

  //para la url del select
  AddlogoProyecto: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private proyectosService: ProyectosService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) {}

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
      logoProyecto: ['', [Validators.required, this.urlPatternValidator]],
      idCategoria: ['', Validators.required],
    });
  }

  agregarProyecto(): void {
    if (this.proyectoForm.invalid) {
      Swal.fire('Error', 'El Formulario está ínvalidado, verifique si hay algún dato mal ingresado', 'error');
      return;
    }

    const nuevoProyecto: any = this.proyectoForm.value;
    console.log(this.proyectoForm);
    nuevoProyecto.idUsuario = this.usuarioId;

    this.proyectosService.agregarProyecto(nuevoProyecto).subscribe(() => {
        Swal.fire('Proyecto', 'Agregado correctamente', 'success');
        this.proyectoForm.reset();
        this.router.navigate(['/proyecto']);
      },
      error => {
        Swal.fire('Error', 'Error al agregar proyecto', 'error');
        console.error('Error al agregar proyecto:', error);
      }
    );
  }
}
