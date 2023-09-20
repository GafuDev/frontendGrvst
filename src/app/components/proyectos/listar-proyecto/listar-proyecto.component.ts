import { Component, OnInit, ViewChild } from '@angular/core';
import { ProyectosService } from '../../../services/proyectos.service';
import { Proyecto } from '../../../models/proyectoModel';
import { HttpParams } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../../services/usuarios.service';
import { forkJoin } from 'rxjs';
import { Usuario } from 'src/app/models/usuarioModel';


@Component({
  selector: 'app-listar-proyecto',
  templateUrl: './listar-proyecto.component.html',
  styleUrls: ['./listar-proyecto.component.css']
})
export class ListarProyectoComponent implements OnInit {
  proyectoForm: FormGroup = new FormGroup({});
  filtro: Proyecto = {
    idProyecto: undefined,
    nombreProyecto: undefined,
    fechaInicio: undefined
  };
  usuario: any;
  proyectos: Proyecto[] = [];

  usuarioId: any;
  //almacena categorias
  categorias: { id: number; nombre: string }[] = [
    { id: 1, nombre: 'Energías Renovables' },
    { id: 2, nombre: 'Reciclaje y Gestión de Residuos' },
    { id: 3, nombre: 'Agricultura Orgánica' },
    { id: 4, nombre: 'Transporte Sostenible' },
    { id: 5, nombre: 'Construcción Sustentable' },
    { id: 6, nombre: 'Tecnología Limpia' },
    { id: 7, nombre: 'Turismo Ecológico' },
    { id: 8, nombre: 'Educación Ambiental' },
    { id: 9, nombre: 'Biotecnología' },
    { id: 10, nombre: 'Moda Sostenible' },
    { id: 11, nombre: 'Alimentación Saludable' },
    { id: 12, nombre: 'Agua y Saneamiento' },
    { id: 13, nombre: 'Emprendimientos Sociales' },
    { id: 14, nombre: 'Economía Circular' },
    { id: 15, nombre: 'Salud y Bienestar Natural' },
    { id: 16, nombre: 'Eco-Turismo' },
    { id: 17, nombre: 'Energía Solar' },
    { id: 18, nombre: 'Movilidad Eléctrica' },
    { id: 19, nombre: 'Producción de Alimentos Orgánicos' },
    { id: 20, nombre: 'Moda Reciclada' },
    { id: 21, nombre: 'Arquitectura Sostenible' },
    { id: 22, nombre: 'Educación Ambiental' },
    { id: 23, nombre: 'Gestión Forestal Sostenible' },
    { id: 24, nombre: 'Tecnología para la Conservación' },
    { id: 25, nombre: 'Emprendimientos Verdes' }
  ];

  @ViewChild('contenidoModal') contenidoModal: any;
  mostrarFiltros = false;

  constructor(private proyectosService: ProyectosService,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private router: Router,
              private usuariosService: UsuariosService) {
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
      idUsuario: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    let usuario = localStorage.getItem('usuario');
    let idLs = localStorage.getItem('idUsuario');
    if (usuario && idLs) {
      this.usuarioId = parseInt(idLs);
      this.filtrarProyectos();
    } else {
      this.router.navigate(['/login']);
    }
  }

  filtrarProyectos(): void {
    let params = new HttpParams();

    if (this.filtro.idProyecto) {
      params = params.set('idProyecto', this.filtro.idProyecto.toString());
    }
    if (this.filtro.nombreProyecto) {
      params = params.set('nombreProyecto', this.filtro.nombreProyecto);
    }
    if (this.filtro.fechaInicio) {
      params = params.set('Fecha Inicio', this.filtro.fechaInicio.toString());
    }

    this.proyectosService.obtenerProyectos(params).subscribe(
      (proyectos: Proyecto[]) => {


        this.proyectos = proyectos;
        console.log(proyectos);
      },
      error => {
        console.error('Error al obtener proyectos:', error);
      }
    );

  }

  editarProyecto(proyecto: Proyecto, content: any): void {
    this.proyectoForm.patchValue({
      nombreProyecto: proyecto.nombreProyecto,
      descripcionProyecto: proyecto.descripcionProyecto,
      fechaInicio: proyecto.fechaInicio,
      montoFinanciar: proyecto.montoFinanciar,
      resumenProyecto: proyecto.resumenProyecto,
      linkProyecto: proyecto.linkProyecto,
      logoProyecto: proyecto.logoProyecto,
      idCategoria: proyecto.idCategoria
    });

    const modalRef = this.modalService.open(content);

    modalRef.result.then(
      (result: Proyecto | undefined) => {
        if (result) {

          const valoresActualizados = this.proyectoForm.value;

          proyecto.nombreProyecto = valoresActualizados.nombreProyecto;
          proyecto.descripcionProyecto = valoresActualizados.descripcionProyecto;
          proyecto.fechaInicio = valoresActualizados.fechaInicio;
          proyecto.montoFinanciar = valoresActualizados.montoFinanciar;
          proyecto.resumenProyecto = valoresActualizados.resumenProyecto;
          proyecto.linkProyecto = valoresActualizados.linkProyecto;
          proyecto.logoProyecto = valoresActualizados.logoProyecto;
          proyecto.idCategoria = valoresActualizados.idCategoria;

          this.proyectosService.actualizarProyecto(proyecto).subscribe(
            updatedProject => {
              this.proyectos = this.proyectos.map(p => (p.idProyecto === updatedProject.idProyecto ? updatedProject : p));
              this.proyectoForm.reset();
              Swal.fire('Actualización', 'Proyecto actualizado correctamente', 'success');
              this.router.navigate(['/proyecto']);
            },
            error => {
              Swal.fire('Actualización', error , 'error');
              console.error('Error al actualizar proyecto:', error);
            }
          );
        }
      },
      () => { }
    );
  }

  eliminarProyecto(idProyecto: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
      this.proyectosService.eliminarProyecto(idProyecto).subscribe(
        () => {
          this.proyectos = this.proyectos.filter(proyecto => proyecto.idProyecto !== idProyecto);
        },
        error => {
          console.error('Error al eliminar proyecto:', error);
        }
      );
    }
  }



  obtenerNombreCategoria(idCategoria: number): string {
    const categoria = this.categorias.find(c => c.id === idCategoria);
    return categoria ? categoria.nombre : 'Desconocida';
  }

}
