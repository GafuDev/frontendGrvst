import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from '../../../models/usuarioModel';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent {
  usuarioForm: FormGroup = new FormGroup({});
  mensaje: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let usuario = localStorage.getItem('idUsuario');
    if(usuario === null){
      this.router.navigate(['/login']);
    }
    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
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

  agregarUsuario(): void {
    if (this.usuarioForm.invalid) {
      return;
    }

    const nuevoUsuario: Usuario[] = [this.usuarioForm.value];
    this.usuariosService.agregarUsuario(nuevoUsuario).subscribe(
      () => {
        Swal.fire('Nuevo Usuario','se ha registrado correctamente' , 'success');
        this.usuarioForm.reset();
        this.router.navigate(['/usuario']);
      },
      error => {
        this.mensaje = 'Error al agregar el usuario.';
        Swal.fire('Error', this.mensaje, 'error');
        console.error('Error al agregar el usuario:', error);
      }
    );
  }
}
