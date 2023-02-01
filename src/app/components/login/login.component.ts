import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonaList, PersonaService } from 'src/app/services/persona/persona.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  listaPersonas: any = [];
  personaList: PersonaList = {
    id: '',
    nombre: '',
    apellidoPaterno: '',
      apellidoMaterno: '',
      puesto: '',
      rfc: '',
      direccion:'',
      correoElectronico: '',
      cuentaGithub: '',
      estado: '',
      ciudad: '',
      numero1: '',
      numero2: '',
      genero: '',
      password:'',
      rol:''
  };

  password:String;
  email:string;
  emailValid=false;
  passwordValid=false;
  acceso=false;
 
  
  personaForm:FormGroup;
  personas:any;

  constructor(
    public fb: FormBuilder,
    public personaService:PersonaService,
    private router:Router) { }

  ngOnInit(): void {
    this.personaForm;
    this.personaForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password: ['', Validators.required],
    });;
    this.personaService.getAllPersonas().subscribe(resp => {
      this.personas = resp;
    },
      error => { console.error(error) }
    );
  }
  navegar(){
    this.router.navigate(['/home']);
  }
  login(){
    if(this.email=this.personaList.correoElectronico){
      this.acceso=true;
    }
    if(this.password=this.personaList.password){
      this.acceso=true;
    }
    if(this.emailValid==true && this.passwordValid==true){
      this.acceso=true;
    }
  }

}
