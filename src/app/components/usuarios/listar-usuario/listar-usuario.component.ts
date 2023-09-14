import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../../models/usuarioModel';
import { UsuariosService } from '../../../services/usuarios.service';
import { HttpParams } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {
  usuarioForm: FormGroup = new FormGroup({});
  filtro: Usuario = {
    idRol: undefined,
    idComuna: undefined,
    idRegion: undefined,
    createAt: undefined
  };
  usuarios: Usuario[] = [];
  @ViewChild('contenidoModal') contenidoModal: any;
  mostrarFiltros = false;

  constructor(private usuariosService: UsuariosService,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.usuarioForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(7)]], // Mínimo 7 caracteres
      contrasena: ['', [Validators.required, Validators.minLength(7), // Mínimo 7 caracteres
      Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{6,}$/)]], // Al menos una mayúscula y un dígito (0-9)
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      idComuna: ['', [Validators.required, Validators.pattern(/^(?!$)/)]],
      idRegion: ['', [Validators.required, Validators.pattern(/^(?!$)/)]], // No se permite value=""
      idRol: ['', [Validators.required, Validators.pattern(/^(?!$)/)]],
      telefono: ['', [Validators.minLength(9), Validators.maxLength(9)]]
    });
  }

  ngOnInit(): void {
    let usuario = localStorage.getItem('idUsuario');
    if(usuario === null){
      this.router.navigate(['/login']);
    }
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
    this.usuarioForm.patchValue({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      username: usuario.username,
      contrasena: usuario.contrasena,
      correo: usuario.correo,
      direccion: usuario.direccion,
      idComuna: usuario.idComuna,
      idRegion: usuario.idRegion,
      idRol: usuario.idRol,
      telefono: usuario.telefono
    });

    const modalRef = this.modalService.open(content);

    modalRef.result.then(
      (result: Usuario | undefined) => {
        if (result) {
          const valoresActualizados = this.usuarioForm.value;

          usuario.nombre = valoresActualizados.nombre;
          usuario.apellido = valoresActualizados.apellido;
          usuario.username = valoresActualizados.username;
          usuario.contrasena = valoresActualizados.contrasena;
          usuario.correo = valoresActualizados.correo;
          usuario.direccion = valoresActualizados.direccion;
          usuario.idComuna = valoresActualizados.idComuna;
          usuario.idRegion = valoresActualizados.idRegion;
          usuario.idRol = valoresActualizados.idRol;
          usuario.telefono = valoresActualizados.telefono;

          this.usuariosService.actualizarUsuario(usuario).subscribe(
            updatedUser => {
              this.usuarios = this.usuarios.map(u => (u.idUsuario === updatedUser.idUsuario ? updatedUser : u));
              this.usuarioForm.reset();
              Swal.fire('Actualización', 'Usuario actualizado correctamente', 'success');
            },
            error => {
              Swal.fire('Actualización', error , 'error');
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
          Swal.fire('Eliminado', 'Usuario eliminado correctamente', 'success');
        },
        error => {
          console.error('Error al eliminar usuario:', error);
        }
      );
    }
  }

}
