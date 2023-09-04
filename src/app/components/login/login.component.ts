import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  constructor(
    private auth: AuthService, private router: Router
  ) {

  }
  usuarioVacio: boolean = false;
  contrasenaVacia: boolean = false;
  validacionesDeInput() {
    this.usuarioVacio = (this.username == "");
    this.contrasenaVacia = (this.password == "");
  }

  iniciarSesion(): void {
    if (this.username == "" || this.password == "") {
      this.validacionesDeInput()
    } else {

      const usuarioPost = [
        {
          "usuario": this.username,
          "contrasena": this.password
        }
      ]

      this.auth.loginUsuarioAutentication(usuarioPost).subscribe(ele => {
        console.log('Aqui viene: ',ele);
        if (ele) {
          let rolNombre = this.rolIdANombre(ele.datos.rol)
          //aca crear los local storange
          localStorage.setItem('usuario', ele.datos.usuario)
          localStorage.setItem('username', ele.datos.username)
          localStorage.setItem('rol', rolNombre)
          localStorage.setItem('idUsuario', ele.datos.id)

          if (rolNombre){
            switch (rolNombre) {
              case 'administrador':
                this.router.navigate(['/administracion']);
                break;
              case 'moderador':
                this.router.navigate(['/administracion']);
                break;
              case 'emprendedor':
                this.router.navigate(['/administracion']);
                break;
              case 'inversionista':
                this.router.navigate(['/administracion']);
                break;
            }
          } else{
            //this.router.navigate(['/login:false'],{skipLocationChange: true}); //falta hacer false debe ser capturado en ngOnInit
            this.router.navigate(['/login']);
          }

        }else {
          alert(ele.mensaje)
        }
      })
    }
  }

  rolIdANombre(rol: any) {
    let nomRol: any = ''

    if (rol === 1) {
      nomRol = 'administrador';
    } else if (rol === 2) {
      nomRol = 'moderador';
    } else if (rol === 3) {
      nomRol = 'emprendedor';
    } else if (rol === 4) {
      nomRol = 'inversionista';
    } else {
      nomRol = null
    }
    return nomRol
  }
}
