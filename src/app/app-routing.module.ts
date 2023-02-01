import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './components/formulario/formulario.component';
import { LoginComponent } from './components/login/login.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { HomeComponent } from './components/home/home.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';

const routes: Routes = [
  {path:'', redirectTo:'/login',pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'usuario', component: UsuarioComponent},
  {path:'formulario', component: FormularioComponent},
  {path:'empleados', component: EmpleadosComponent},
  {path:'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
