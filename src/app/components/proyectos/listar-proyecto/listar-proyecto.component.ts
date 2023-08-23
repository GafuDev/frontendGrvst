import { Component, OnInit } from '@angular/core';
import { ProyectosService } from '../../../services/proyectos.service';
import { Proyecto } from 'src/app/models/proyectoModel';
import { Categoria } from '../../../models/categoriaModel';
import { CategoriaService } from '../../../services/categoria.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-listar-proyecto',
  templateUrl: './listar-proyecto.component.html',
  styleUrls: ['./listar-proyecto.component.css']
})
export class ListarProyectoComponent implements OnInit {
  proyectos: Proyecto[] = [];

  categorias: Categoria[] = [];

  constructor(private proyectosService: ProyectosService, private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    
  }



}
