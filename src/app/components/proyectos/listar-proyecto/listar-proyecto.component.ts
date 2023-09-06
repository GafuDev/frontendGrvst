import { Component, OnInit, ViewChild } from '@angular/core';
import { ProyectosService } from '../../../services/proyectos.service';
import { Proyecto } from '../../../models/proyectoModel';
import { HttpParams } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  @ViewChild('contenidoModal') contenidoModal: any;
  mostrarFiltros = false;

  constructor(private proyectosService: ProyectosService,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private router: Router) {
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
    if (usuario) {
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
      },
      error => {
        console.error('Error al obtener proyectos:', error);
      }
    );
  }

  editarProyecto(proyecto: Proyecto, content: any): void {
    const modalRef = this.modalService.open(content);
    modalRef.result.then(
      (result: Proyecto | undefined) => {
        if (result) {
          this.proyectosService.actualizarProyecto(proyecto).subscribe(
            updatedProject => {
              this.proyectos = this.proyectos.map(p => (p.idProyecto === updatedProject.idProyecto ? updatedProject : p));
              this.proyectoForm.reset();
            },
            error => {
              console.error('Error al actualizar proyecto:', error);
            }
          );
        }
      },
      () => {}
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
}
