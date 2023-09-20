import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InversionService } from '../../../services/inversion.service';
import { Inversion } from '../../../models/inversionModel';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { Proyecto } from 'src/app/models/proyectoModel';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-agregar-inversion',
  templateUrl: './agregar-inversion.component.html',
  styleUrls: ['./agregar-inversion.component.css']
})
export class AgregarInversionComponent {
  inversionForm: FormGroup = new FormGroup({});
  mensaje: string = '';
  usuarioId: number | null = null;

  //muestra nombres de los protyectos para agregar inversion
  proyectos: Proyecto[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private InversionService: InversionService,
    private router: Router,
    private proyectoService: ProyectosService
  ) { }

  ngOnInit(): void {
    let usuario = localStorage.getItem('usuario');
    let idLs = localStorage.getItem('idUsuario');
    if (usuario && idLs) {
      this.usuarioId = parseInt(idLs);
      this.inicializarFormulario();
      this.cargarProyectos();
    } else {
      this.router.navigate(['/login']);
    }
  }

  inicializarFormulario(): void {
    this.inversionForm = this.formBuilder.group({
      montoInversion: ['', Validators.required],
      idProyecto: ['', Validators.required],
    });
  }

  agregarInversion(): void {
    if (this.inversionForm.invalid) {
      return;
    }

    const nuevaInversion: any = this.inversionForm.value;

    nuevaInversion.idUsuario = this.usuarioId;

    this.InversionService.agregarInversion(nuevaInversion).subscribe(
      () => {
        //this.mensaje = 'Has invertido: ' + nuevaInversion.montoInversion + ' en el proyecto id: '+ nuevaInversion.idProyecto +', con éxito';
        this.inversionForm.reset();
        Swal.fire('Inversión', 'Se han agregado fondos correctamente' , 'success');
        this.router.navigate(['/inversion']);
      },
      error => {
        this.mensaje = 'Error al Invertir.';
        Swal.fire('Mensaje', 'Error al Invertir.' , 'error');
        console.error('Error al crear la inversión:', error);
      }
    );
  }
  //mostrará los nombres de los proyecots cargados en la bd para poder invertir
  cargarProyectos(): void {
    this.proyectoService.obtenerProyectos(new HttpParams()).subscribe(
      (proyectos: Proyecto[]) => {
        this.proyectos = proyectos;
      },
      error => {
        console.error('Error al obtener proyectos:', error);
      }
    );
  }
}

