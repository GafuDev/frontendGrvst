import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListarUsuarioComponent } from './components/usuarios/listar-usuario/listar-usuario.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { PortadaComponent } from './components/portada/portada.component';
import { AgregarUsuarioComponent } from './components/usuarios/agregar-usuario/agregar-usuario.component';
import { ListarProyectoComponent } from './components/proyectos/listar-proyecto/listar-proyecto.component';
import { AgregarProyectoComponent } from './components/proyectos/agregar-proyecto/agregar-proyecto.component';
import { AgregarInversionComponent } from './components/inversiones/agregar-inversion/agregar-inversion.component';
import { ListarInversionComponent } from './components/inversiones/listar-inversion/listar-inversion.component';
import { ListarMensajeComponent } from './components/mensajes/listar-mensaje/listar-mensaje.component';
import { AgregarMensajeComponent } from './components/mensajes/agregar-mensaje/agregar-mensaje.component';
import { ListallProyectosComponent } from './components/proyectos/listall-proyectos/listall-proyectos.component';
import { AdministracionComponent } from './components/administracion/administracion.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'portada', component: PortadaComponent }, //ver si usaré esta u el inicio por defecto
  { path: 'usuario', component: ListarUsuarioComponent },
  { path: 'addusuario', component: AgregarUsuarioComponent },
  { path: 'proyecto', component: ListarProyectoComponent },
  { path: 'addproyecto', component: AgregarProyectoComponent },
  { path: 'allproyectos', component: ListallProyectosComponent },
  { path: 'inversion', component: ListarInversionComponent },
  { path: 'addinversion', component: AgregarInversionComponent },
  { path: 'mensaje', component: ListarMensajeComponent },
  { path: 'addmensaje', component: AgregarMensajeComponent },
  { path: 'detailmensaje', component: ListarMensajeComponent },
  { path: 'administracion', component: AdministracionComponent }, //página a la que redirige el login
  { path: '', redirectTo: '/portada', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
