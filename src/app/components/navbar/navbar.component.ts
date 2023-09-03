import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  
  userRole: string | null = 'rol'; //string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userRole = this.authService.obtenerUsuarioAutenticado();
    this.authService.userRole$.subscribe(rol => {
      this.userRole = rol;
    });
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  cerrarSesion() {
    this.authService.logout();
  }
}

