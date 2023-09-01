import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../../models/proyectoModel';
import { ProyectosService } from '../../../services/proyectos.service';

@Component({
  selector: 'app-listall-proyectos',
  templateUrl: './listall-proyectos.component.html',
  styleUrls: ['./listall-proyectos.component.css']
})
export class ListallProyectosComponent implements OnInit {
  proyectos: Proyecto[] = [];

  constructor(private proyectosService: ProyectosService) {}

  ngOnInit(): void {
    this.obtenerProyectos();
  }

  obtenerProyectos(): void {
    this.proyectosService.obtenerAllProyectos().subscribe(
      (proyectos: Proyecto[]) => {
        this.proyectos = proyectos;
      },
      (error) => {
        console.error('Error al obtener los proyectos:', error);
      }
    );
  }
}

