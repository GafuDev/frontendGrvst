import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../../models/usuarioModel';
import { UsuariosService } from '../../../services/usuarios.service';
import { HttpParams } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {
  filtro: Usuario = {
    idRol: undefined,
    idComuna: undefined,
    idRegion: undefined,
    createAt: undefined
  };
  usuarios: Usuario[] = []; // Arreglo para almacenar la lista de usuarios
  @ViewChild('contenidoModal') contenidoModal: any;
  mostrarFiltros = false; // Variable para controlar la visibilidad de los campos de filtros

  constructor(private usuariosService: UsuariosService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.filtrarUsuarios();
  }

  filtrarUsuarios(): void {
    let params = new HttpParams();

  if (this.filtro.nombre) {
    params = params.set('nombre', this.filtro.nombre);
  }
  if (this.filtro.idRol) {
    params = params.set('idRol', this.filtro.idRol.toString());
  }
  if (this.filtro.idComuna) {
    params = params.set('idComuna', this.filtro.idComuna.toString());
  }
  if (this.filtro.idRegion) {
    params = params.set('idRegion', this.filtro.idRegion.toString());
  }
  if (this.filtro.createAt) {
    params = params.set('createAt', this.filtro.createAt.toString());
  }

    this.usuariosService.obtenerUsuarios(params).subscribe(
      (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  editarUsuario(usuario: Usuario, content: any): void {
    // Abre un modal para editar los datos del usuario
    const modalRef = this.modalService.open(content);

    // Cuando se cierre el modal, actualiza el usuario si se realizan cambios
    modalRef.result.then(
      (result: Usuario | undefined) => {
        if (result) {
          this.usuariosService.actualizarUsuario(result).subscribe(
            updatedUser => {
              // Actualiza la lista local con los datos actualizados
              this.usuarios = this.usuarios.map(u => (u.idUsuario === updatedUser.idUsuario ? updatedUser : u));
            },
            error => {
              console.error('Error al actualizar usuario:', error);
            }
          );
        }
      },
      () => {}
    );
  }


  eliminarUsuario(idUsuario: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.usuariosService.eliminarUsuario(idUsuario).subscribe(
        () => {
          this.usuarios = this.usuarios.filter(usuario => usuario.idUsuario !== idUsuario);
        },
        error => {
          console.error('Error al eliminar usuario:', error);
        }
      );
    }
  }

}
