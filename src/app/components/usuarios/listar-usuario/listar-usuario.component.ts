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

  //muestra nombre regiones y no el id
  regiones: { id: number; nombre: string }[] = [
    { id: 1, nombre: 'Región de Arica y Parinacota' },
    { id: 2, nombre: 'Región de Tarapacá' },
    { id: 3, nombre: 'Región de Antofagasta' },
    { id: 4, nombre: 'Región de Atacama' },
    { id: 5, nombre: 'Región de Coquimbo' },
    { id: 6, nombre: 'Región de Valparaíso' },
    { id: 7, nombre: 'Región Metropolitana de Santiago' },
    { id: 8, nombre: 'Región del Libertador General Bernardo OHiggins' },
    { id: 9, nombre: 'Región del Maule' },
    { id: 10, nombre: 'Región de Ñuble' },
    { id: 11, nombre: 'Región del Biobío' },
    { id: 12, nombre: 'Región de La Araucanía' },
    { id: 13, nombre: 'Región de Los Ríos' },
    { id: 14, nombre: 'Región de Los Lagos' },
    { id: 15, nombre: 'Región de Aysén del General Carlos Ibáñez del Campo' },
    { id: 16, nombre: 'Región de Magallanes y de la Antártica Chilena' }
  ];

  //muestra nombre Comunas y no el id
  comunas: { id: number; nombre: string }[] = [
    { id: 1, nombre: 'Arica' },
    { id: 2, nombre: 'Putre' },
    { id: 3, nombre: 'Camarones' },
    { id: 4, nombre: 'General Lagos' },
    { id: 5, nombre: 'Iquique' },
    { id: 6, nombre: 'Alto Hospicio' },
    { id: 7, nombre: 'Pica' },
    { id: 8, nombre: 'Huara' },
    { id: 9, nombre: 'Camiña' },
    { id: 10, nombre: 'Antofagasta' },
    { id: 11, nombre: 'Calama' },
    { id: 12, nombre: 'Tocopilla' },
    { id: 13, nombre: 'Mejillones' },
    { id: 14, nombre: 'Sierra Gorda' },
    { id: 15, nombre: 'Copiapó' },
    { id: 16, nombre: 'Vallenar' },
    { id: 17, nombre: 'Huasco' },
    { id: 18, nombre: 'Caldera' },
    { id: 19, nombre: 'Tierra Amarilla' },
    { id: 20, nombre: 'La Serena' },
    { id: 21, nombre: 'Coquimbo' },
    { id: 22, nombre: 'Ovalle' },
    { id: 23, nombre: 'Illapel' },
    { id: 24, nombre: 'Salamanca' },
    { id: 25, nombre: 'Valparaíso' },
    { id: 26, nombre: 'Viña del Mar' },
    { id: 27, nombre: 'Quilpué' },
    { id: 28, nombre: 'Villa Alemana' },
    { id: 29, nombre: 'Los Andes' },
    { id: 30, nombre: 'Santiago' },
    { id: 31, nombre: 'Maipú' },
    { id: 32, nombre: 'Puente Alto' },
    { id: 33, nombre: 'La Florida' },
    { id: 34, nombre: 'Las Condes' },
    { id: 35, nombre: 'Rancagua' },
    { id: 36, nombre: 'San Fernando' },
    { id: 37, nombre: 'Rengo' },
    { id: 38, nombre: 'Machalí' },
    { id: 39, nombre: 'Santa Cruz' },
    { id: 40, nombre: 'Talca' },
    { id: 41, nombre: 'Curicó' },
    { id: 42, nombre: 'Linares' },
    { id: 43, nombre: 'San Clemente' },
    { id: 44, nombre: 'Constitución' },
    { id: 45, nombre: 'Chillán' },
    { id: 46, nombre: 'Chillán Viejo' },
    { id: 47, nombre: 'Bulnes' },
    { id: 48, nombre: 'Quirihue' },
    { id: 49, nombre: 'Coelemu' },
    { id: 50, nombre: 'Concepción' },
    { id: 51, nombre: 'Talcahuano' },
    { id: 52, nombre: 'Coronel' },
    { id: 53, nombre: 'Los Ángeles' },
    { id: 54, nombre: 'San Pedro de la Paz' },
    { id: 55, nombre: 'Temuco' },
    { id: 56, nombre: 'Padre Las Casas' },
    { id: 57, nombre: 'Villarrica' },
    { id: 58, nombre: 'Angol' },
    { id: 59, nombre: 'Victoria' },
    { id: 60, nombre: 'Valdivia' },
    { id: 61, nombre: 'La Unión' },
    { id: 62, nombre: 'Los Lagos' },
    { id: 63, nombre: 'Paillaco' },
    { id: 64, nombre: 'Río Bueno' },
    { id: 65, nombre: 'Puerto Montt' },
    { id: 66, nombre: 'Osorno' },
    { id: 67, nombre: 'Castro' },
    { id: 68, nombre: 'Ancud' },
    { id: 69, nombre: 'Quellón' },
    { id: 70, nombre: 'Coyhaique' },
    { id: 71, nombre: 'Aysén' },
    { id: 72, nombre: 'Chile Chico' },
    { id: 73, nombre: 'Cochrane' },
    { id: 74, nombre: 'Puerto Aysén' },
    { id: 75, nombre: 'Punta Arenas' },
    { id: 76, nombre: 'Puerto Natales' },
    { id: 77, nombre: 'Porvenir' },
    { id: 78, nombre: 'Puerto Williams' }
  ];

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
        console.log(this.usuarios)
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
 //mostrar nombrerol y no el ID
  obtenerNombreRol(idRol: number): string {
    switch (idRol) {
      case 1:
        return 'Administrador';
      case 2:
        return 'Moderador';
      case 3:
        return 'Emprendedor';
      case 4:
        return 'Inversionista';
      default:
        return 'Desconocido';
    }
  }

  obtenerNombreRegion(idRegion: number): string {
    const region = this.regiones.find(region => region.id === idRegion);
    return region ? region.nombre : 'Desconocida';
  }
  obtenerNombreComuna(idComuna: number): string {
    const comuna = this.comunas.find(comuna => comuna.id === idComuna);
    return comuna ? comuna.nombre : 'Desconocida';
  }

}
