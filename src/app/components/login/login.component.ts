import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  iniciarSesion(): void {
    
    console.log('Iniciando sesión...');
    console.log('Usuario:', this.username);
    console.log('Contraseña:', this.password);
  }
}
