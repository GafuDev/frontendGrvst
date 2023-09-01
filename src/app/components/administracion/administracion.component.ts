import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit{
  usuario: any;
  rolUsuario: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    
    this.usuario = this.authService.obtenerUsuarioAutenticado();

    // Determinar el rol del usuario
    this.rolUsuario = this.determinarRolUsuario();
  }

  determinarRolUsuario(): string {
    // Lógica para determinar el rol del usuario según sus atributos (puedes ajustar esto según tu estructura)
    if (this.usuario.idRol === 3) {
      return 'Emprendedor';
    } else if (this.usuario.idRol === 4) {
      return 'Inversionista';
    } else {
      return 'Usuario';
    }
  }

  // determinarRolUsuario(): string {
  //
    //  FALTA AGREGAR LA LOGICA

  //   switch (this.usuario.idRol) {
  //     case 1:
  //       return 'Administrador';
  //     case 2:
  //       return 'Moderador';
  //     case 3:
  //       return 'Emprendedor';
  //     case 4:
  //       return 'Inversionista';
  //     default:
  //       return 'Usuario';
  //   }
  // }
}
