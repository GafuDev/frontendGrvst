import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/models/usuarioModel';
import { FilterPipe } from '../../pipes/filter.pipes';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuarioForm: FormGroup = new FormGroup({});
  errorMessage: string = '';
  mensaje: string = '';
  comunaFiltro: string = '';

  //mensajes error validacion
  nombreErrorMessage: string = '';
  apellidoErrorMessage: string = '';
  usernameErrorMessage: string = '';
  contrasenaErrorMessage: string = '';
  correoErrorMessage: string = '';
  direccionErrorMessage: string = '';
  idComunaErrorMessage: string = '';
  idRegionErrorMessage: string = '';
  idRolErrorMessage: string = '';
  telefonoErrorMessage: string = '';

  comunas: { idComuna: number, nombreComuna: string }[] = [
    // Región de Arica y Parinacota (ID: 1)
    { idComuna: 1, nombreComuna: 'Arica' },
    { idComuna: 2, nombreComuna: 'Putre' },
    { idComuna: 3, nombreComuna: 'Camarones' },
    { idComuna: 4, nombreComuna: 'General Lagos' },

    // Región de Tarapacá (ID: 2)
    { idComuna: 5, nombreComuna: 'Iquique' },
    { idComuna: 6, nombreComuna: 'Alto Hospicio' },
    { idComuna: 7, nombreComuna: 'Pica' },
    { idComuna: 8, nombreComuna: 'Huara' },
    { idComuna: 9, nombreComuna: 'Camiña' },

    // Región de Antofagasta (ID: 3)
    { idComuna: 10, nombreComuna: 'Antofagasta' },
    { idComuna: 11, nombreComuna: 'Calama' },
    { idComuna: 12, nombreComuna: 'Tocopilla' },
    { idComuna: 13, nombreComuna: 'Mejillones' },
    { idComuna: 14, nombreComuna: 'Sierra Gorda' },

    // Región de Atacama (ID: 4)
    { idComuna: 15, nombreComuna: 'Copiapó' },
    { idComuna: 16, nombreComuna: 'Vallenar' },
    { idComuna: 17, nombreComuna: 'Huasco' },
    { idComuna: 18, nombreComuna: 'Caldera' },
    { idComuna: 19, nombreComuna: 'Tierra Amarilla' },

    // Región de Coquimbo (ID: 5)
    { idComuna: 20, nombreComuna: 'La Serena' },
    { idComuna: 21, nombreComuna: 'Coquimbo' },
    { idComuna: 22, nombreComuna: 'Ovalle' },
    { idComuna: 23, nombreComuna: 'Illapel' },
    { idComuna: 24, nombreComuna: 'Salamanca' },

    // Región de Valparaíso (ID: 6)
    { idComuna: 25, nombreComuna: 'Valparaíso' },
    { idComuna: 26, nombreComuna: 'Viña del Mar' },
    { idComuna: 27, nombreComuna: 'Quilpué' },
    { idComuna: 28, nombreComuna: 'Villa Alemana' },
    { idComuna: 29, nombreComuna: 'Los Andes' },

    // Región Metropolitana de Santiago (ID: 7)
    { idComuna: 30, nombreComuna: 'Santiago' },
    { idComuna: 31, nombreComuna: 'Maipú' },
    { idComuna: 32, nombreComuna: 'Puente Alto' },
    { idComuna: 33, nombreComuna: 'La Florida' },
    { idComuna: 34, nombreComuna: 'Las Condes' },

    // Región del Libertador General Bernardo O'Higgins (ID: 8)
    { idComuna: 35, nombreComuna: 'Rancagua' },
    { idComuna: 36, nombreComuna: 'San Fernando' },
    { idComuna: 37, nombreComuna: 'Rengo' },
    { idComuna: 38, nombreComuna: 'Machalí' },
    { idComuna: 39, nombreComuna: 'Santa Cruz' },

    // Región del Maule (ID: 9)
    { idComuna: 40, nombreComuna: 'Talca' },
    { idComuna: 41, nombreComuna: 'Curicó' },
    { idComuna: 42, nombreComuna: 'Linares' },
    { idComuna: 43, nombreComuna: 'San Clemente' },
    { idComuna: 44, nombreComuna: 'Constitución' },

    // Región de Ñuble (ID: 10)
    { idComuna: 45, nombreComuna: 'Chillán' },
    { idComuna: 46, nombreComuna: 'Chillán Viejo' },
    { idComuna: 47, nombreComuna: 'Bulnes' },
    { idComuna: 48, nombreComuna: 'Quirihue' },
    { idComuna: 49, nombreComuna: 'Coelemu' },

    // Región del Biobío (ID: 11)
    { idComuna: 50, nombreComuna: 'Concepción' },
    { idComuna: 51, nombreComuna: 'Talcahuano' },
    { idComuna: 52, nombreComuna: 'Coronel' },
    { idComuna: 53, nombreComuna: 'Los Ángeles' },
    { idComuna: 54, nombreComuna: 'San Pedro de la Paz' },

    // Región de La Araucanía (ID: 12)
    { idComuna: 55, nombreComuna: 'Temuco' },
    { idComuna: 56, nombreComuna: 'Padre Las Casas' },
    { idComuna: 57, nombreComuna: 'Villarrica' },
    { idComuna: 58, nombreComuna: 'Angol' },
    { idComuna: 59, nombreComuna: 'Victoria' },

    // Región de Los Ríos (ID: 13)
    { idComuna: 60, nombreComuna: 'Valdivia' },
    { idComuna: 61, nombreComuna: 'La Unión' },
    { idComuna: 62, nombreComuna: 'Los Lagos' },
    { idComuna: 63, nombreComuna: 'Paillaco' },
    { idComuna: 64, nombreComuna: 'Río Bueno' },

    // Región de Los Lagos (ID: 14)
    { idComuna: 65, nombreComuna: 'Puerto Montt' },
    { idComuna: 66, nombreComuna: 'Osorno' },
    { idComuna: 67, nombreComuna: 'Castro' },
    { idComuna: 68, nombreComuna: 'Ancud' },
    { idComuna: 69, nombreComuna: 'Quellón' },

    // Región de Aysén del General Carlos Ibáñez del Campo (ID: 15)
    { idComuna: 70, nombreComuna: 'Coyhaique' },
    { idComuna: 71, nombreComuna: 'Aysén' },
    { idComuna: 72, nombreComuna: 'Chile Chico' },
    { idComuna: 73, nombreComuna: 'Cochrane' },
    { idComuna: 74, nombreComuna: 'Puerto Aysén' },

    // Región de Magallanes y de la Antártica Chilena (ID: 16)
    { idComuna: 75, nombreComuna: 'Punta Arenas' },
    { idComuna: 76, nombreComuna: 'Puerto Natales' },
    { idComuna: 77, nombreComuna: 'Porvenir' },
    { idComuna: 78, nombreComuna: 'Puerto Williams' }
  ];

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private usuariosService: UsuariosService, private router: Router) {

    this.usuarioForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      username: new FormControl('', [Validators.required, Validators.minLength(7)]), // Mínimo 7 caracteres
      contrasena: new FormControl('', [Validators.required, Validators.minLength(7),
      Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{6,}$/)]), // Al menos una mayúscula y un dígito (0-9)
      correo: new FormControl('', [Validators.required, Validators.email]),
      direccion: new FormControl('', Validators.required),
      idComuna: new FormControl('', [Validators.required, Validators.pattern(/^(?!$)/)]),
      idRegion: new FormControl('', [Validators.required, Validators.pattern(/^(?!$)/)]), // No se permite value=""
      idRol: new FormControl('', [Validators.required, Validators.pattern(/^(?!$)/)]),
      telefono: new FormControl('', [Validators.minLength(9), Validators.maxLength(9)])
    });
  }

  ngOnInit(): void {
  }

  agregarUsuario(): void {

    this.nombreErrorMessage = '';
    this.apellidoErrorMessage = '';
    this.usernameErrorMessage = '';
    this.contrasenaErrorMessage = '';
    this.correoErrorMessage = '';
    this.direccionErrorMessage = '';
    this.idComunaErrorMessage = '';
    this.idRegionErrorMessage = '';
    this.idRolErrorMessage = '';
    this.telefonoErrorMessage = '';

    if (!this.usuarioForm) {
      console.error('El formulario es nulo.');
      alert('Por favor, completa los campos correctamente.');
      return;
    }

    if (this.usuarioForm.invalid) {
      console.error('El formulario no es válido.');
      alert('El formulario no es válido.');
      return;
    }

    if (!this.isValid('nombre')) {
      this.nombreErrorMessage = 'El nombre debe ser válido.';
    }
    if (!this.isValid('apellido')) {
      this.apellidoErrorMessage = 'El apellido debe ser válido.';
    }
    if (!this.isValid('username')) {
      this.usernameErrorMessage = 'El username debe tener al menos 7 caracteres.';
    }
    if (!this.isValid('contrasena')) {
      this.contrasenaErrorMessage = 'La contraseña debe tener al menos 7 caracteres y contener una mayúscula y un dígito.';
    }
    if (!this.isValid('correo')) {
      this.correoErrorMessage = 'El correo debe ser válido.';
    }
    if (!this.isValid('direccion')) {
      this.direccionErrorMessage = 'La dirección debe ser válida.';
    }
    if (!this.isValid('idComuna')) {
      this.idComunaErrorMessage = 'Selecciona una comuna válida.';
    }
    if (!this.isValid('idRegion')) {
      this.idRegionErrorMessage = 'Selecciona una región válida.';
    }
    if (!this.isValid('idRol')) {
      this.idRolErrorMessage = 'Selecciona un rol válido.';
    }
    if (!this.isValid('telefono')) {
      this.telefonoErrorMessage = 'El teléfono debe tener 9 caracteres.';
    }

    if (
      this.nombreErrorMessage ||
      this.apellidoErrorMessage ||
      this.usernameErrorMessage ||
      this.contrasenaErrorMessage ||
      this.correoErrorMessage ||
      this.direccionErrorMessage ||
      this.idComunaErrorMessage ||
      this.idRegionErrorMessage ||
      this.idRolErrorMessage ||
      this.telefonoErrorMessage
    ) {
      console.error('Alguno de los campos no es válido.');
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    const nuevoUsuario: Usuario[] = [this.usuarioForm.value];
    this.usuariosService.agregarUsuario(nuevoUsuario).subscribe(
      () => {
        this.mensaje = 'Usuario agregado correctamente.';
        this.usuarioForm.reset();
        this.router.navigate(['/login']);
      },
      error => {
        if (error.status === 500) {
          // El nombre de usuario o correo ya existe en la base de datos.
          alert('El nombre de usuario o correo electrónico ya están registrados. Por favor, elige otro.');
        } else {
          this.errorMessage = 'Error al agregar el usuario.';
          console.error('Error al agregar el usuario:', console.log(error));
        }
      }
    );
  }

  isValid(controlName: string): boolean {
    const control = this.usuarioForm?.get(controlName);
    return control ? control.valid : false;

  }
}
