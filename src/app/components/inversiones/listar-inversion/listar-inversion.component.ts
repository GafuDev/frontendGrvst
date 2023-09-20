import { Component, OnInit, ViewChild } from '@angular/core';
import { InversionService } from '../../../services/inversion.service';
import { Inversion } from '../../../models/inversionModel';
import { HttpParams } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { Proyecto } from 'src/app/models/proyectoModel';

@Component({
  selector: 'app-listar-inversion',
  templateUrl: './listar-inversion.component.html',
  styleUrls: ['./listar-inversion.component.css']
})
export class ListarInversionComponent implements OnInit {
  inversionForm: FormGroup = new FormGroup({});
  filtro: Inversion = {
    idInversion: undefined,
    idProyecto: undefined,
    createAt: undefined
  };
  inversiones: Inversion[] = [];

  //mostrar nombres proyectos
  proyectos: Proyecto[] = [];
  proyectosCargados: boolean = false;

  @ViewChild('contenidoModal') contenidoModal: any;
  mostrarFiltros = false;

  constructor(private inversionService: InversionService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router,
    private proyectoService: ProyectosService,
  ) {
    this.inversionForm = this.formBuilder.group({
      montoInversion: ['', Validators.required],
      fechaInversion: ['', Validators.required],
      idUsuario: ['', Validators.required],
      idProyecto: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    let usuario = localStorage.getItem('usuario');
    if (usuario) {
      this.filtrarInversiones();
      //mostrar nombre proytectos
      this.obtenerProyectos();
    } else {
      this.router.navigate(['/login']);
    }



  }

  filtrarInversiones(): void {
    let params = new HttpParams();

    if (this.filtro.idInversion) {
      params = params.set('idInversion', this.filtro.idInversion);
    }
    if (this.filtro.idProyecto) {
      params = params.set('idProyecto', this.filtro.idProyecto.toString());
    }
    if (this.filtro.createAt) {
      params = params.set('Fecha Creación', this.filtro.createAt.toString());
    }

    this.inversionService.obtenerInversion(params).subscribe(
      (inversiones: Inversion[]) => {
        this.inversiones = inversiones;
      },
      error => {
        console.error('Error al obtener inversiones:', error);
      }
    );
  }

  editarInversion(inversion: Inversion, content: any): void {

    this.inversionForm.patchValue({
      montoInversion: inversion.montoInversion,
    });

    const modalRef = this.modalService.open(content);

    modalRef.result.then(
      (result: Inversion | undefined) => {
        if (result) {

          const valoresActualizados = this.inversionForm.value;

          inversion.montoInversion = valoresActualizados.montoInversion;

          this.inversionService.actualizarInversion(inversion).subscribe(
            updatedInvest => {
              this.inversiones = this.inversiones.map(u => (u.idInversion === updatedInvest.idInversion ? updatedInvest : u));
              this.inversionForm.reset();
              Swal.fire('Actualización', 'Inversión actualizada correctamente', 'success');
            },
            error => {
              Swal.fire('Actualización', error, 'error');
              console.error('Error al actualizar inversión:', error);
            }
          );
        }
      },
      () => { }
    );
  }

  eliminarInversion(idInversion: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar el registro de esta inversión?')) {
      this.inversionService.eliminarInversion(idInversion).subscribe(
        () => {
          this.inversiones = this.inversiones.filter(inversion => inversion.idInversion !== idInversion);
          Swal.fire('Inversión', 'eliminada correctamente', 'success');
        },
        error => {
          console.error('Error al eliminar registro de inversión:', error);
        }
      );
    }
  }

  //funcion para mostrar los nombres de los proyectos en listar inversiones
  //trae todos los proyectos
  obtenerProyectos(): void {
    this.proyectoService.obtenerProyectos(new HttpParams()).subscribe(
      (proyectos: Proyecto[]) => {
        this.proyectos = proyectos;
        this.proyectosCargados = true;
      },
      error => {
        console.error('Error al obtener proyectos:', error);
      }
    );
  }
  //obtiene el nombre, lo compara y si no lo encuentra muesta proyecto griinvest o proyecto no encontrado
  //si se demora en cargar, muestra el mensaje cargando.
  obtenerNombreProyecto(idProyecto: number): string {

    if (this.proyectosCargados) {
      const proyecto = this.proyectos.find(p => p.idProyecto === idProyecto);
      if (proyecto) {
        return proyecto.nombreProyecto || 'Proyecto Griinvest';
      } else {
        return 'Proyecto no encontrado';
      }
    } else {
      return 'Cargando...';
    }
  }
}
