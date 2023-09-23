import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../../models/proyectoModel';
import { ProyectosService } from '../../../services/proyectos.service';
import { Router, ActivatedRoute, Routes } from '@angular/router';
import Swal from 'sweetalert2';
import { InversionService } from '../../../services/inversion.service';
import { Inversion } from 'src/app/models/inversionModel';


@Component({
  selector: 'app-detalle-proyecto',
  templateUrl: './detalle-proyecto.component.html',
  styleUrls: ['./detalle-proyecto.component.css']
})
export class DetalleProyectoComponent implements OnInit {
  //proyectos: Proyecto[] = [];
  proyecto: Proyecto | null = null;
  usuarioId: number | null = null;

  totalInversiones: number = 0;
  progreso: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private proyectosService: ProyectosService,
    private inversionService: InversionService
  ) { }

  ngOnInit(): void {
    let usuario = localStorage.getItem('usuario');
    let idLs = localStorage.getItem('idUsuario');
    if (usuario && idLs) {
      this.usuarioId = parseInt(idLs);
    } else {
      this.router.navigate(['/login']);
    }

    this.route.paramMap.subscribe(params => {
      const idProyectoParam = parseInt(this.route.snapshot.params.toString());

      if (idProyectoParam !== null) {
        const idProyecto = +idProyectoParam;
        if (!isNaN(idProyecto)) {
          this.obtenerProyectoPorId(idProyecto);
        }
      }
    });
  }

  /* obtenerProyectoPorId(idProyecto: number): void {
    this.proyectosService.obtenerPorID(idProyecto).subscribe(
      (proyecto) => {
        console.log(proyecto);
        this.proyecto = proyecto;

        this.obtenerTotalInversiones(idProyecto);
      },
      (error) => {
        console.error('Error al obtener el proyecto por ID:', error);

      }
    );
  } */

  obtenerProyectoPorId(idProyecto: number): void {
    this.proyectosService.obtenerPorID(idProyecto).subscribe(
      (proyecto) => {
        console.log(proyecto);
        //this.proyectos = proyectos;
      },
      (error) => {
        console.error('Error al obtener los proyectos:', error);
      }
    );
  }
  obtenerTotalInversiones(idProyecto: number): void {
    this.inversionService.obtenerTotalInversionesPorProyecto(idProyecto).subscribe(
      (total: number) => {

        this.totalInversiones = total;

        if (this.proyecto !== null && typeof this.proyecto !== 'undefined' && typeof this.proyecto.montoFinanciar !== 'undefined') {
          this.progreso = (this.totalInversiones / this.proyecto.montoFinanciar) * 100;
        } else {
          this.progreso = 0;
        }
      },
      (error) => {
        console.error('Error al obtener el total de inversiones:', error);
      }
    );
  }

}
