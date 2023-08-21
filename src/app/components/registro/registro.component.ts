import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {

    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(7)]], // Mínimo 7 caracteres
      contrasena: ['', [Validators.required,Validators.minLength(7), // Mínimo 7 caracteres
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{6,}$/)]], // Al menos una mayúscula y un dígito
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      idComuna: ['', [Validators.required, Validators.pattern(/^(?!$)/)]],
      idRegion: ['', [Validators.required, Validators.pattern(/^(?!$)/)]], // No se permite value=""
      idRol: ['', [Validators.required, Validators.pattern(/^(?!$)/)]],
      telefono: ['', [Validators.minLength(9), Validators.maxLength(9)]]
    });
  }

  registrarUsuario() {
    if (this.registroForm.valid) {
      const usuarioData = this.registroForm.value;
      this.authService.registrarUsuario(usuarioData).subscribe(
        response => {
          if (response.success) {
            console.log('Usuario registrado exitosamente:', response.message);
            this.router.navigate(['/listarProyectos']);
          } else {
            this.errorMessage = response.message;
          }
        },
        error => {
          console.error('Error al registrar usuario:', error);
        }
      );
    }
  }

  ngOnInit(): void {
  }
}

