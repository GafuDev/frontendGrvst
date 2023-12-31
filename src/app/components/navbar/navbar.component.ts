import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  userRole: string | null = 'rol';

  constructor(private authService: AuthService, private router: Router) {}

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

  async cerrarSesion() {
    await this.authService.logout();
    this.router.navigate(['/'])
  }
}

