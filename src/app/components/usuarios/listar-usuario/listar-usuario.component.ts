import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuarioModel'; // Asegúrate de la ruta correcta
import { UsuariosService } from '../../../services/usuarios.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {
  filtro: Usuario = {}; // Objeto para almacenar los filtros del formulario
  usuarios: Usuario[] = []; // Arreglo para almacenar la lista de usuarios

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.filtrarUsuarios();
  }

  filtrarUsuarios(): void {
    let params = new HttpParams();

    if (this.filtro.nombre) {
      params = params.set('nombre', this.filtro.nombre);
    }
    // Agrega otros campos del filtro de la misma manera

    this.usuariosService.obtenerUsuarios(params).subscribe(
      (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }
}
