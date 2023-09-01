import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { AuthService } from '../../services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/models/usuarioModel';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuarioForm: FormGroup = new FormGroup({});
  errorMessage: string = '';
  mensaje: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private usuariosService: UsuariosService, private router: Router) {

    this.usuarioForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(7)]], // Mínimo 7 caracteres
      contrasena: ['', [Validators.required,Validators.minLength(7), // Mínimo 7 caracteres
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
  }

  agregarUsuario(): void {
    if (this.usuarioForm.invalid) {
      return;
    }

    const nuevoUsuario: Usuario[] = [this.usuarioForm.value];
    this.usuariosService.agregarUsuario(nuevoUsuario).subscribe(
      () => {
        this.mensaje = 'Usuario agregado correctamente.';
        this.usuarioForm.reset();
      },
      error => {
        this.errorMessage = 'Error al agregar el usuario.';
        console.error('Error al agregar el usuario:', console.log(error));
      }
    );
  }
}
