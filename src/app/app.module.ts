import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FiltroPipe } from './services/persona/filtro.pipe';
import { ApellidoPipe } from './services/persona/apellido.pipe';
import { GeneroPipe } from './services/persona/genero.pipe';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { LoginComponent } from './components/login/login.component';
import { FormularioComponent } from './components/formulario/formulario.component';

@NgModule({
  declarations: [
    AppComponent,
    FiltroPipe,
    ApellidoPipe,
    GeneroPipe,
    UsuarioComponent,
    LoginComponent,
    FormularioComponent
  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
