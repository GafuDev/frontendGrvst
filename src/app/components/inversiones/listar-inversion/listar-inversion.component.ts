import { Component, OnInit } from '@angular/core';
import { InversionService } from '../../../services/inversion.service';
import { Inversion } from '../../../models/inversionModel';

@Component({
  selector: 'app-listar-inversion',
  templateUrl: './listar-inversion.component.html',
  styleUrls: ['./listar-inversion.component.css']
})
export class ListarInversionComponent implements OnInit {
  inversiones: Inversion[] = [];

  constructor(private inversionService: InversionService) {}

  ngOnInit(): void {
    this.listarInversiones();
  }

  listarInversiones(): void {
    this.inversionService.listarInversiones().subscribe(
      (inversiones: Inversion[]) => {
        this.inversiones = inversiones;
      },
      error => {
        console.error('Error al obtener inversiones:', error);
      }
    );
  }
}
