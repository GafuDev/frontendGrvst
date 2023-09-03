import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AgregarMensajeComponent } from './components/mensajes/agregar-mensaje/agregar-mensaje.component';
import { ListarMensajeComponent } from './components/mensajes/listar-mensaje/listar-mensaje.component';
import { DetallesMensajeComponent } from './components/mensajes/detalles-mensaje/detalles-mensaje.component';
import { AgregarUsuarioComponent } from './components/usuarios/agregar-usuario/agregar-usuario.component';
import { ListarUsuarioComponent } from './components/usuarios/listar-usuario/listar-usuario.component';
import { AgregarProyectoComponent } from './components/proyectos/agregar-proyecto/agregar-proyecto.component';
import { ListarProyectoComponent } from './components/proyectos/listar-proyecto/listar-proyecto.component';
import { AgregarInversionComponent } from './components/inversiones/agregar-inversion/agregar-inversion.component';
import { ListarInversionComponent } from './components/inversiones/listar-inversion/listar-inversion.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { PortadaComponent } from './components/portada/portada.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ListallProyectosComponent } from './components/proyectos/listall-proyectos/listall-proyectos.component';
import { AdministracionComponent } from './components/administracion/administracion.component';

import { CategoriaService } from './services/categoria.service';
import { ProyectosService } from './services/proyectos.service';

import { FilterPipe } from './pipes/filter.pipes';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    AgregarMensajeComponent,
    ListarMensajeComponent,
    DetallesMensajeComponent,
    AgregarUsuarioComponent,
    ListarUsuarioComponent,
    AgregarProyectoComponent,
    ListarProyectoComponent,
    AgregarInversionComponent,
    ListarInversionComponent,
    RegistroComponent,
    LoginComponent,
    PortadaComponent,
    NavbarComponent,
    ListallProyectosComponent,
    AdministracionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    CategoriaService,
    ProyectosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
