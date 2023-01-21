import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonaService } from 'src/app/services/persona/persona.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  personaForm:FormGroup;
  personas:any;

  constructor(
    public fb: FormBuilder,
    public personaService:PersonaService,
    private router:Router) { }

  ngOnInit(): void {
    this.personaForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password: ['', Validators.required]
    });;
    this.personaService.getAllPersonas().subscribe(resp => {
      this.personas = resp;
    },
      error => { console.error(error) }
    );
  }
  navegar(){
    this.router.navigate(['/usuario']);
  }

}
