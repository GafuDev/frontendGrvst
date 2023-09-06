import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../../models/proyectoModel';
import { ProyectosService } from '../../../services/proyectos.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listall-proyectos',
  templateUrl: './listall-proyectos.component.html',
  styleUrls: ['./listall-proyectos.component.css']
})
export class ListallProyectosComponent implements OnInit {
  proyectos: Proyecto[] = [];

  constructor(private proyectosService: ProyectosService, private router: Router) {}

  ngOnInit(): void {
    let usuario = localStorage.getItem('usuario');
    if (usuario) {
      this.obtenerProyectos();
    } else {
      this.router.navigate(['/login']);
    }
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

