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

  async agregarInversion(): Promise<void> {
    if (this.inversionForm.invalid) {
      return;
    }

    const nuevaInversion: any = this.inversionForm.value;

    nuevaInversion.idUsuario = this.usuarioId;

    const proyectoId = Number(nuevaInversion.idProyecto);
    const montoInversión = Number(nuevaInversion.montoInversion);


    if (!isNaN(proyectoId)) {
      try {

        const proyectoAsociado = this.proyectos.find((proyecto) => {

          if (typeof proyecto.idProyecto === 'number') {

            return proyecto.idProyecto === proyectoId;
          }
          return false;
        });

        if (proyectoAsociado) {

          proyectoAsociado.montoAdquirido = (proyectoAsociado.montoAdquirido || 0) + montoInversión;


          await this.proyectoService.actualizarProyecto(proyectoAsociado).toPromise();

          await this.InversionService.agregarInversion(nuevaInversion).toPromise();


          this.inversionForm.reset();


          Swal.fire('Inversión', 'Se han agregado fondos correctamente', 'success');


          this.router.navigate(['/inversion']);
        } else {

          Swal.fire('Mensaje', 'No se encontró el proyecto asociado', 'error');
        }
      } catch (error) {
        this.mensaje = 'Error al Invertir.';
        Swal.fire('Mensaje', 'Error al Invertir.', 'error');
        console.error('Error al crear la inversión:', error);
      }
    } else {
      Swal.fire('Mensaje', 'ID de proyecto no válido', 'error');
    }
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

