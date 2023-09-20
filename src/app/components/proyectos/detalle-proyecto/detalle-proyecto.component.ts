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
  proyecto: Proyecto | null = null;
  usuarioId: number | null = null;
  totalInversiones: number = 0;

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
      const idProyectoParam = params.get('idProyecto');

      if (idProyectoParam !== null) {
        const idProyecto = +idProyectoParam;
        if (!isNaN(idProyecto)) {
          this.obtenerProyectoPorId(idProyecto);
          //this.obtenerProyectoYTotalInversiones(idProyecto);
        }
      }
    });
  }

  /* obtenerProyectoYTotalInversiones(idProyecto: number): void {
    this.proyectosService.obtenerProyectoPorId(idProyecto).subscribe((proyecto) => {
      this.proyecto = proyecto;
      console.log(proyecto);

      // Calcula el total de inversiones para el proyecto actual
      this.inversionService.obtenerTotalInversionesPorProyecto(idProyecto).subscribe((total) => {
        this.totalInversiones = total;
        console.log("Total de Inversiones:", total);
      });
    });
  } */

  obtenerProyectoPorId(idProyecto: number): void {
    this.proyectosService.obtenerProyectoPorId(idProyecto).subscribe((proyecto) => {
      this.proyecto = proyecto;
      console.log(proyecto);

      // Llama al servicio para obtener el total de inversiones
      const inversion = new Inversion();
      inversion.idProyecto = proyecto.idProyecto; // Usar el id del proyecto obtenido
      this.inversionService.obtenerTotalInversionesPorProyecto(inversion).subscribe((total) => {
        console.log("Total de Inversiones:", total);
        this.totalInversiones = total;
      });
    });
  }
}
