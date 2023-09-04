import { Component, OnInit, ViewChild } from '@angular/core';
import { InversionService } from '../../../services/inversion.service';
import { Inversion } from '../../../models/inversionModel';
import { HttpParams } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  @ViewChild('contenidoModal') contenidoModal: any;
  mostrarFiltros = false;

  constructor(private inversionService: InversionService,
              private modalService: NgbModal,
              private formBuilder: FormBuilder) {
    this.inversionForm = this.formBuilder.group({
      montoInversion: ['', Validators.required],
      fechaInversion: ['', Validators.required],
      idUsuario: ['', Validators.required],
      idProyecto: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.filtrarInversiones();
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
    const modalRef = this.modalService.open(content);
    modalRef.result.then(
      (result: Inversion | undefined) => {
        if (result) {
          this.inversionService.actualizarInversion(inversion).subscribe(
            updatedInvest => {
              this.inversiones = this.inversiones.map(u => (u.idInversion === updatedInvest.idInversion ? updatedInvest : u));
              this.inversionForm.reset();
            },
            error => {
              console.error('Error al actualizar inversión:', error);
            }
          );
        }
      },
      () => {}
    );
  }

  eliminarInversion(idInversion: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar el registro de esta inversión?')) {
      this.inversionService.eliminarInversion(idInversion).subscribe(
        () => {
          this.inversiones = this.inversiones.filter(inversion => inversion.idInversion !== idInversion);
        },
        error => {
          console.error('Error al eliminar registro de inversión:', error);
        }
      );
    }
  }
}
